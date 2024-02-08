import dotenv from 'dotenv';
import ExcelJS from 'exceljs';

// Models
import Profile from '../Models/profile.model.js';
import CategoriesCP from '../Models/categoriesCP.model.js';

// Utils
import catchAsync from '../Utils/catchAsync.util.js';
import AppError from '../Utils/appError.js';
import { Sequelize } from 'sequelize';
import { generateCategoryId, generateUniquedID, decrypt, encrypt } from '../Utils/function/function.util.js';

import moment from 'moment-timezone'

dotenv.config();

export const getLengthCategoryProfile = catchAsync(async (req, res, next) => {
    const profilesSumByCategory = await CategoriesCP.findAll({
        attributes: [
            [
                Sequelize.fn('COALESCE', Sequelize.fn('COUNT', Sequelize.col('profile.id')), 0),
                'total',
            ],
            ['name', 'categoryName'],
        ],
        include: [
            {
                model: Profile,
                attributes: [],
                where: {
                    isCombo: false,
                    status: 'active',
                },
                required: false,
            },
        ],
        group: ['categoriesCP.id', 'categoriesCP.name'], 
    });

    res.status(200).json(profilesSumByCategory);
});

// export const getProfile = catchAsync(async (req, res, next) => {
//     const { id } = req.params;

//     // const profile = await Profile.findOne({
//     //     where: { id },
//     //     attributes: { exclude: ['passwordAccount', 'pincodeAccount'] },
//     //     include: [
//     //         { model: CategoriesCP, attributes: ['name'] },
//     //     ]
//     // })

//     const profiles = await Profile.findAll({
//         where: { status: 'purchased', isCombo: false },
//     })
//     res.status(200).json({
//         status: 'success',
//         data: profiles
//     })
// })



export const createProfile = catchAsync(async (req, res, next) => {

    const { sessionUser } = req;

    const {
        name,
        description,
        price,
        emailAccount,
        passwordAccount,
        profileAccount,
        pincodeAccount,
        isCombo,
        durationOfService,
        categoryId,
    } = req.body;

    const id = generateUniquedID('profile');
    const emailAccountEncrypted = encrypt(emailAccount);
    const passwordAccountEncrypted = encrypt(passwordAccount);

    const newProfile = await Profile.create({
        id,
        name,
        description,
        price,
        emailAccount: emailAccountEncrypted,
        passwordAccount: passwordAccountEncrypted,
        profileAccount,
        pincodeAccount,
        isCombo: isCombo ? isCombo : false,
        durationOfService,
        categoryId,
        userId: sessionUser.id,
    })

    res.status(201).json({
        status: 'success',
        data: newProfile
    })

})

// export const getProfile = catchAsync(async (req, res, next) => {

//     const profiles = await Profile.findAll({
//         where: { status: 'active', isCombo: false },
//         attributes: { exclude: ['passwordAccount', 'pincodeAccount'] },
//         include: [{ model: CategoriesCP, attributes: ['name'] },]
//     })

//     res.status(200).json({
//         status: 'success',
//         data: profiles
//     })
// })

export const createForExcel = catchAsync(async (req, res, next) => {
    const { sessionUser } = req;
    const file = req.file;
  
    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(file.buffer);
      const worksheet = workbook.getWorksheet(1);
  
      const profiles = [];
  
      for (let i = 4; i <= worksheet.rowCount; i++) {
        const name = worksheet.getCell(`C${i}`).value;
        const description = worksheet.getCell(`D${i}`).value;
        const price = worksheet.getCell(`E${i}`).value;
        const durationOfService = worksheet.getCell(`F${i}`).value;
        const emailAccount = worksheet.getCell(`G${i}`).value;
        const passwordAccount = worksheet.getCell(`H${i}`).value;
        const profileAccount = worksheet.getCell(`I${i}`).value;
        const pincodeAccount = worksheet.getCell(`J${i}`).value;
        const isCombo = false;
        const categoryId = generateCategoryId(worksheet.getCell(`B${i}`).value);
  
        const id = generateUniquedID('profile');

        const emailAccountEncrypted = encrypt(emailAccount.text || emailAccount);
        const passwordAccountEncrypted = encrypt(passwordAccount.text || passwordAccount);
  
        profiles.push({
          id,
          name,
          description,
          price,
          offerPrice: 0,
          emailAccount: emailAccountEncrypted,
          passwordAccount: passwordAccountEncrypted,
          profileAccount,
          pincodeAccount,
          isCombo,
          durationOfService,
          categoryId: categoryId,
          userId: sessionUser.id,
        });
      }
  
      await Profile.bulkCreate(profiles);
  
      res.status(200).json({
        status: 'success',
        message: 'Datos cargados con éxito',
        data: profiles,
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



export const filterProfile = catchAsync(async (req, res, next) => {
    const { nameCategory } = req.body

    const category = await CategoriesCP.findOne({
        where: { name: nameCategory, status: 'active' }
    })
    if (!category) {
        return next(new AppError('Category not found', 404))
    }

    const profiles = await Profile.findAll({
        where: { categoryId: category.id, status: 'active', isCombo: false },
        include: [{ model: CategoriesCP, attributes: ['name'] },]
    })

    
    const newProfiles = profiles.map(profile => {
        const fechaCreacion = new Date(profile.createdAt)
        const diaCreacion = fechaCreacion.getDate()
        const timeZone = 'America/Bogota';
        const today = moment().tz(timeZone);
        const diaActual = today.date()

        const emailAccountDecrypted = decrypt(profile.emailAccount);
        const passwordAccountDecrypted = decrypt(profile.passwordAccount);

        const restanteDias = diaCreacion - diaActual

    return {
        id: profile.id,
        name: profile.name,
        description: profile.description,
        price: profile.price,
        offerPrice: profile.offerPrice,
        durationOfService: profile.durationOfService,
        remainingDays: restanteDias + profile.durationOfService,
        emailAccount: emailAccountDecrypted,
        passwordAccount: passwordAccountDecrypted,
        profileAccount: profile.profileAccount,
        pincodeAccount: profile.pincodeAccount,
        categoryId: profile.categoryId,
        userId: profile.userId,
        status: profile.status,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
        categoriesCP: profile.categoriesCP
    }
    })


    res.status(200).json({
        status: 'success',
        data: newProfiles
    })
})


export const updateProfile = catchAsync(async (req, res, next) => {
    const { profile } = req

    const { name,
        description,
        price,
        offerPrice,
        emailAccount,
        passwordAccount,
        profileAccount,
        pincodeAccount,
        durationOfService
    } = req.body;

    const emailAccountEncryted = encrypt(emailAccount);
    const passwordAccountEncryted = encrypt(passwordAccount);

    await profile.update({
        name,
        description,
        price,
        offerPrice: offerPrice ? offerPrice : 0,
        emailAccount: emailAccountEncryted,
        passwordAccount: passwordAccountEncryted,
        profileAccount,
        pincodeAccount,
        durationOfService
    })

    res.status(204).json({
        status: 'success',
    })
})


export const deleteProfile = catchAsync(async (req, res, next) => {

    const { profile } = req

    await profile.destroy()

    res.status(204).json({
        status: 'success',
    })
})


 export const deleteProfiles = catchAsync(async (req, res, next) => {

    const profiles = await Profile.findAll({
        where: { categoryId: 9, status: 'active', isCombo: false },
        include: [{ model: CategoriesCP, attributes: ['name'] },]
    })

    profiles.forEach( async profile => await profile.destroy())

    res.status(204).json({
        status: 'success',
    })

})