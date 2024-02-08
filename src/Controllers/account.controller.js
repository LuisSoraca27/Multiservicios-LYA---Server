import ExcelJS from 'exceljs';

// model
import Account from '../Models/account.model.js';
import CategoriesCP from '../Models/categoriesCP.model.js';


// utils
import catchAsync from '../Utils/catchAsync.util.js';
import AppError from '../Utils/appError.js';
import { generateCategoryId, generateUniquedID, decrypt, encrypt } from '../Utils/function/function.util.js';
import { Sequelize } from 'sequelize';

import moment from 'moment-timezone'

export const getLengthCategoryAccount = catchAsync(async (req, res, next) => {
    const accountsSumByCategory = await CategoriesCP.findAll({
        attributes: [
            [
                Sequelize.fn('COALESCE', Sequelize.fn('COUNT', Sequelize.col('account.id')), 0),
                'total',
            ],
            ['name', 'categoryName'],
        ],
        include: [
            {
                model: Account,
                attributes: [],
                where: {
                    status: 'active',
                },
                required: false,
            },
        ],
        group: ['categoriesCP.id', 'categoriesCP.name'],
    });

    res.status(200).json(accountsSumByCategory);

})


export const createAccount = catchAsync(async (req, res, next) => {

    const { sessionUser } = req;

    const { name,
        description,
        price,
        offerPrice,
        durationOfService,
        emailAccount,
        passwordAccount,
        categoryId,
    } = req.body;

    const id = generateUniquedID('account');

    const emailAccountEncrypted = encrypt(emailAccount);
    const passwordAccountEncrypted = encrypt(passwordAccount);

    const newAccount = await Account.create({
        id,
        name,
        description,
        price,
        offerPrice: offerPrice ? offerPrice : 0,
        durationOfService,
        emailAccount: emailAccountEncrypted,
        passwordAccount: passwordAccountEncrypted,
        categoryId,
        userId: sessionUser.id,
    })

    res.status(201).json({
        status: 'success',
        data: newAccount
    })

})

export const createForExcel = catchAsync(async (req, res, next) => {
    const { sessionUser } = req;
    const file = req.file;
  
    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(file.buffer);
      const worksheet = workbook.getWorksheet(2);
  
      const accounts = [];
  
      for (let i = 4; i <= worksheet.rowCount; i++) {
        const name = worksheet.getCell(`C${i}`).value;
        const description = worksheet.getCell(`D${i}`).value;
        const price = worksheet.getCell(`E${i}`).value;
        const durationOfService = worksheet.getCell(`F${i}`).value;
        const emailAccount = worksheet.getCell(`G${i}`).value;
        const passwordAccount = worksheet.getCell(`H${i}`).value;
        const categoryId = generateCategoryId(worksheet.getCell(`B${i}`).value);
  
        const id = generateUniquedID('account');

        const emailAccountEncrypted = encrypt(emailAccount.text || emailAccount);
        const passwordAccountEncrypted = encrypt(passwordAccount.text || passwordAccount);
  
        accounts.push({
          id,
          name,
          description,
          price,
          offerPrice: 0,
          emailAccount: emailAccountEncrypted,
          passwordAccount: passwordAccountEncrypted,
          durationOfService,
          categoryId: categoryId,
          userId: sessionUser.id,
        });
      }
  
      await Account.bulkCreate(accounts);
  
      res.status(200).json({
        status: 'success',
        message: 'Datos cargados con éxito',
        data: accounts,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'error',
        message: 'Error al cargar datos desde el archivo Excel a la base de datos.',
        error: error.message,
      });
    }
  });


export const getAccount = catchAsync(async (req, res, next) => {

    let accounts = await Account.findAll({
        where: { status: 'active' },
        attributes: { exclude: ['passwordAccount', 'pincodeAccount'] },
        include: [{ model: CategoriesCP, attributes: ['name'] },]
    })

  const newAccounts =  accounts.map(account => {
    
    const fechaCreacion = new Date(account.createdAt)
    const diaCreacion = fechaCreacion.getDate()

    const timeZone = 'America/Bogota';
    const today = moment().tz(timeZone);
    const diaActual = today.date()
    const restanteDias = diaCreacion - diaActual
    
    const emailAccountDecrypted = decrypt(account.emailAccount);
    const passwordAccountDecrypted = decrypt(account.passwordAccount);

    return {
        id: account.id,
        name: account.name,
        description: account.description,
        price: account.price,
        offerPrice: account.offerPrice,
        durationOfService: account.durationOfService,
        remainingDays: restanteDias + account.durationOfService,
        emailAccount: emailAccountDecrypted,
        passwordAccount: passwordAccountDecrypted,
        categoryId: account.categoryId,
        userId: account.userId,
        status: account.status,
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
        categoriesCP: account.categoriesCP
    }
    })

    res.status(200).json({
        status: 'success',
        data: newAccounts
    })
})

export const filterAccount = catchAsync(async (req, res, next) => {
    const { nameCategory } = req.body

    const category = await CategoriesCP.findOne({
        where: { name: nameCategory, status: 'active' }
    })
    if (!category) {
        return next(new AppError('Category not found', 404))
    }

    const accounts = await Account.findAll({
        where: { categoryId: category.id, status: 'active' },
        include: [{ model: CategoriesCP, attributes: ['name'] },]
    })


    const newAccounts =  accounts.map(account => {
    const fechaCreacion = new Date(account.createdAt)
    const diaCreacion = fechaCreacion.getDate()


    const timeZone = 'America/Bogota';
    const today = moment().tz(timeZone);
    const diaActual = today.date()
    
   moment.tz.setDefault('America/Bogota');

  const fechaColombia = moment();
  fechaColombia.locale('es');

// Obtiene el día en números, mes en letras y año
const dia = fechaColombia.format('D'); // Día en números
const mes = fechaColombia.format('MMMM'); // Mes en letras
const año = fechaColombia.format('YYYY'); // Año
 const restanteDias = diaCreacion - diaActual

    const emailAccountDecrypted = decrypt(account.emailAccount);
    const passwordAccountDecrypted = decrypt(account.passwordAccount);

    return {
        id: account.id,
        name: account.name,
        description: account.description,
        price: account.price,
        offerPrice: account.offerPrice,
        durationOfService: account.durationOfService,
        remainingDays: restanteDias + account.durationOfService,
        emailAccount: emailAccountDecrypted,
        passwordAccount: passwordAccountDecrypted,
        categoryId: account.categoryId,
        userId: account.userId,
        status: account.status,
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
        categoriesCP: account.categoriesCP
    }
    })


    res.status(200).json({
        status: 'success',
        data: newAccounts
    })
})


export const updateAccount = catchAsync(async (req, res, next) => {
    const { account } = req

    const {
        name,
        description,
        price,
        offerPrice,
        durationOfService,
        emailAccount,
        passwordAccount,
    } = req.body;

    const emailAccountEncrypted = encrypt(emailAccount);
    const passwordAccountEncrypted = encrypt(passwordAccount);

    await account.update({
        name,
        description,
        price,
        offerPrice,
        durationOfService,
        emailAccount: emailAccountEncrypted,
        passwordAccount: passwordAccountEncrypted,
    })

    res.status(204).json({
        status: 'success',
    })
})


export const deleteAccount = catchAsync(async (req, res, next) => {

    const { account } = req

    await account.destroy()

    res.status(204).json({
        status: 'success',
    })
})

export const deleteAccounts = catchAsync(async (req, res, next) => {

    const Accounts = await Account.findAll({
        where: { categoryId: 9, status: 'active' },
        include: [{ model: CategoriesCP, attributes: ['name'] },]
    })

    Accounts.forEach( async (account) => await account.destroy())

    res.status(204).json({
        status: 'success',
    })

})