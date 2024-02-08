import dotenv from 'dotenv';
import { Op } from 'sequelize'
import moment from 'moment-timezone'
import EXCELJS from 'exceljs';
import fs from 'fs';



//models
import Order from '../Models/order.model.js';
import Profile from '../Models/profile.model.js';
import Account from '../Models/account.model.js';
import Combo from '../Models/combo.model.js';
import Course from '../Models/course.model.js';
import License from '../Models/license.model.js';
import ProfileInCombo from '../Models/profileInCombo.model.js';
import productPurchased from '../Models/productPurchased.model.js';
import CategoriesCP from '../Models/categoriesCP.model.js';


//utils
import catchAsync from '../Utils/catchAsync.util.js';
import appError from '../Utils/appError.js';
import { encrypt, decrypt } from '../Utils/function/function.util.js';


//nodemailer
import {
    messageCombo,
    messageProfile,
    messageAccount,
    messageLicense,
    messageCourse,
    messageIptv,
    messageComboAdmin
} from '../Utils/nodemailer/message.js'
import {sendEmail, sendEmailAdmin} from '../Utils/nodemailer/nodemailer.js';
import User from '../Models/user.model.js';


dotenv.config();


export const orderProfile = catchAsync(async (req, res, next) => {
    const { sessionUser, profile } = req;
    const { email, subject } = req.body;

    if (sessionUser.balance < profile.price) {
        return next(new appError('El usuario no tiene suficiente saldo', 401));
    }
    
    const fechaActual = moment().tz('America/Bogota');
    const orderDate = fechaActual.format('YYYY-MM-DD HH:mm:ss.SSSZ');  

    profile.emailAccount = decrypt(profile.emailAccount)
    profile.passwordAccount = decrypt(profile.passwordAccount);

    const order = await Order.create({
        nameProduct: profile.name,
        priceProduct: profile.price,
        username: sessionUser.username,
        userId: sessionUser.id,
        productId: profile.id,
        orderDate
    });

    await productPurchased.create({
        data1: profile.emailAccount,
        data2: profile.passwordAccount,
        data3: profile.profileAccount,
        orderId: order.id,
        // whyProduct: 'pro'
    });

    await sessionUser.update({ balance: sessionUser.balance - profile.price });

    let message;

    if (profile.categoryId === 11) {
        message = messageIptv(profile);
    } else {
        message = messageProfile(profile);
    }

    await sendEmail({
        email: sessionUser.email,
        subject: subject ? subject : 'Nuevo pedido',
    }, message);

    if (email) {
        await sendEmail({
            email,
            subject: subject ? subject : 'Nuevo pedido',
        }, message);
    }
    
    await sendEmailAdmin({
        email: process.env.USER_ADMIN2,
        subject: subject ? subject : 'Nuevo pedido'
    }, {
        sessionUser,
        product: profile
    });

    await profile.update({ status: 'purchased' });

    res.status(201).json({
        status: 'success',
        data: order
    });
});

export const orderCombo = catchAsync(async (req, res, next) => {
    const { sessionUser } = req;
    const { id } = req.params;
    const { email, subject } = req.body;

    const combo = await Combo.findOne({
        where: {
            id: id
        },
        include: [
            {
                model: ProfileInCombo,
                include: [
                    {
                        model: Profile
                    }
                ]
            }
        ]
    })

    if (!combo) {
        return next(new appError('El combo no existe', 404));
    }

    if (sessionUser.balance < combo.price) {
        return next(new appError('El usuario no tiene suficiente saldo', 401));
    }

    const order = await Order.create({
        nameProduct: combo.name,
        priceProduct: combo.price,
        username: sessionUser.username,
        userId: sessionUser.id,
        productId: combo.id
    })

    await productPurchased.create({
        data1: combo.name,
        data2: combo.description,
        orderId: order.id,
        // whyProduct: 'combo'
    })

    await sessionUser.update({ balance: sessionUser.balance - combo.price });

    const message = messageCombo(combo)

    const messageAdmin = messageComboAdmin(sessionUser, combo)

    await sendEmail({
        email: sessionUser.email,
        subject: subject ? subject : 'Nuevo pedido',
    },
        message
    )

    if (email) {
        await sendEmail({
            email: email,
            subject: subject ? subject : 'Nuevo pedido',
        },
            message
        )
    }

    await sendEmail({
        email: process.env.USER_ADMIN2,
        subject: subject ? subject : 'Nuevo pedido',
    },
        messageAdmin
    )


    await ProfileInCombo.destroy({
        where: {
            comboId: combo.id
        },
        include: [
            {
                model: Profile,
                through: {
                    model: ProfileInCombo,
                    where: {
                        comboId: combo.id
                    }
                }
            }
        ]
    });

    await combo.destroy();

    res.status(201).json({
        status: 'success',
        data: order
    })
})

export const orderAccount = catchAsync(async (req, res, next) => {
    const { sessionUser, account } = req;
    const { email, subject } = req.body;


    if (sessionUser.balance < account.price) {
        return next(new appError('El usuario no tiene suficiente saldo', 401));
    }

    account.emailAccount = decrypt(account.emailAccount)
    account.passwordAccount = decrypt(account.passwordAccount);

    const order = await Order.create({
        nameProduct: account.name,
        priceProduct: account.price,
        username: sessionUser.username,
        userId: sessionUser.id,
        productId: account.id
    })

    await productPurchased.create({
        data1: account.emailAccount,
        data2: account.passwordAccount,
        orderId: order.id,
        // whyProduct: 'account'
    })

    await sessionUser.update({ balance: sessionUser.balance - account.price });


    const message = messageAccount(account)

    await sendEmail({
        email: sessionUser.email,
        subject: subject ? subject : 'Nuevo pedido',
    },
        message
    )

    if (email) {
        await sendEmail({
            email: email,
            subject: subject ? subject : 'Nuevo pedido',
        },
            message
        )
    }
    
    await sendEmailAdmin({
        email:  process.env.USER_ADMIN2,
        subject: subject ? subject : 'Nuevo pedido'
    },
    {
        sessionUser: sessionUser,
        product: account
    }
    )

    await account.update({ status: 'purchased' });

    res.status(201).json({
        status: 'success',
        data: order
    })
})

export const orderLicense = catchAsync(async (req, res, next) => {
    const { sessionUser, license } = req;
    const { email, subject } = req.body;

    if (sessionUser.balance < license.price) {
        return next(new appError('El usuario no tiene suficiente saldo', 401));
    }

    const order = await Order.create({
        nameProduct: license.name,
        priceProduct: license.price,
        username: sessionUser.username,
        userId: sessionUser.id,
        productId: license.id
    })

    await productPurchased.create({
        data1: license.name,
        data2: license.description,
        orderId: order.id,
        // whyProduct: 'license'
    })

    await sessionUser.update({ balance: sessionUser.balance - license.price });

    await sendEmail({
        email: sessionUser.email,
        subject: subject ? subject : 'Nuevo pedido',
    },
        messageLicense(license)
    )

    if (email) {
        await sendEmail({
            email: email,
            subject: subject ? subject : 'Nuevo pedido',
        },
            messageLicense(license)
        )
    }


    // await sendEmailAdmin({
    //     email:  process.env.USER_ADMIN,
    //     subject: subject ? subject : 'Nuevo pedido'
    // },
    // {
    //     sessionUser: sessionUser,
    //     product: license
    // }
    // )

    
    await sendEmailAdmin({
        email:  process.env.USER_ADMIN2,
        subject: subject ? subject : 'Nuevo pedido'
    },
    {
        sessionUser: sessionUser,
        product: license
    }
    )

    res.status(201).json({
        status: 'success',
        data: order
    })
})

export const orderCourse = catchAsync(async (req, res, next) => {
    const { sessionUser, course } = req;
    const { email, subject } = req.body;

    if (sessionUser.balance < course.price) {
        return next(new appError('El usuario no tiene suficiente saldo', 401));
    }

    const order = await Order.create({
        nameProduct: course.name,
        priceProduct: course.price,
        username: sessionUser.username,
        userId: sessionUser.id,
        productId: course.id
    })

    await productPurchased.create({
        data1: course.name,
        data2: course.description,
        data3: course.linkCourse,
        orderId: order.id,
        // whyProduct: 'course'
    })

    await sessionUser.update({ balance: sessionUser.balance - course.price });

    await sendEmail({
        email: sessionUser.email,
        subject: subject ? subject : 'Nuevo pedido',
    },
        messageCourse(course)
    )

    if (email) {
        await sendEmail({
            email: email,
            subject: subject ? subject : 'Nuevo pedido',
        },
            messageCourse(course)
        )
    }


    // await sendEmailAdmin({
    //     email:  process.env.USER_ADMIN,
    //     subject: subject ? subject : 'Nuevo pedido'
    // },
    // {
    //     sessionUser: sessionUser,
    //     product: course
    // }
    // )

    
    await sendEmailAdmin({
        email:  process.env.USER_ADMIN2,
        subject: subject ? subject : 'Nuevo pedido'
    },
    {
        sessionUser: sessionUser,
        product: course
    }
    )

    res.status(201).json({
        status: 'success',
        data: order
    })
})

export const getOrderbyMonth = catchAsync(async (req, res, next) => {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const totalSold = await Order.sum('priceProduct', {
        where: {
            createdAt: {
                [Op.between]: [startOfMonth, endOfMonth]
            }
        }
    });

    if (!totalSold) {
        return next(new appError('No hay ventas en este mes', 404));
    }

    res.status(200).json({
        status: 'success',
        data: totalSold
    });
});

export const getSalesByDay = catchAsync(async (req, res, next) => {
    // Configura la zona horaria para Colombia
    const timeZone = 'America/Bogota';

    // Obtiene la fecha actual en la zona horaria de Colombia
    const today = moment().tz(timeZone);
    console.log(today.date())
    const startOfDay = today.clone().startOf('day');
    const endOfDay = today.clone().endOf('day');


    // console.log('startOfDay:', startOfDay.toISOString());
    // console.log('endOfDay:', endOfDay.toISOString());

    const sales = await Order.findAll({
        where: {
            createdAt: {
                [Op.between]: [startOfDay.toDate(), endOfDay.toDate()]
            }
        },
        include: [
            {
                model: productPurchased
            },
            {
                model: User,
                exclude: [
                    'password',
                ]
            }
        ]
    });

    res.status(200).json({
        status: 'success',
        data: sales
    });
});

export const getSalesByDayByUser = catchAsync(async (req, res, next) => {

    const { id } = req.params;

    if (!id) {
        return next(new appError('El id es requerido', 400));
    }

    // Configura la zona horaria para Colombia
    const timeZone = 'America/Bogota';

    // Obtiene la fecha actual en la zona horaria de Colombia
    const today = moment().tz(timeZone);
    const startOfDay = today.clone().startOf('day');
    const endOfDay = today.clone().endOf('day');


    console.log('startOfDay:', startOfDay.toISOString());
    console.log('endOfDay:', endOfDay.toISOString());

    const sales = await Order.findAll({
        where: {
            userId: id,
            createdAt: {
                [Op.between]: [startOfDay.toDate(), endOfDay.toDate()]
            }
        },
        include: [
            {
                model: productPurchased
            }
        ]
    });

    const productId = sales.map(sale => sale.productId);

    res.status(200).json({
        status: 'success',
        data: sales
    });
});

export const getDailySales = catchAsync(async (req, res, next) => {
    let products = {
        profiles: [],
        accounts: [],
        courses: [],
        licenses: []
    }

    const { date } = req.body;

    const todayInColombia = moment.tz(date,'America/Bogota');
    todayInColombia.locale('es');
    const startOfDay = todayInColombia.clone().startOf('day');
    const endOfDay = todayInColombia.clone().endOf('day');
    const formattedDate = todayInColombia.format('DD [de] MMMM YYYY')


    const dailySales = await Order.findAll({
        where: {
            orderDate: {
                [Op.between]: [startOfDay, endOfDay],
            },
        }, 
    });

    console.log(dailySales)

    for (const order of dailySales) {
        let product;

        const dateSale =  order.orderDate;
    
        if (order.productId.startsWith('profile')) {
            product = await Profile.findOne({ 
                where: { id: order.productId, status: 'purchased', isCombo: false } ,
                include: [
                    {
                        model: CategoriesCP,
                        attributes: ['id', 'name']
                    }
                ]
            });
            if (product) {
                products.profiles.push({
                    profile: product,
                    dateSale: dateSale
                });
            }
        } else if (order.productId.startsWith('account')) {
            product = await Account.findOne({
                 where: { id: order.productId, status: 'purchased' },
                 include: [
                     {
                         model: CategoriesCP,
                         attributes: ['id', 'name']
                     }
                 ]
                 });
            if (product) {
                products.accounts.push({
                    account: product,
                    dateSale: order.createdAt
                });
            }
        } else if (order.productId.startsWith('course')) {
            product = await Course.findOne({ where: { id: order.productId, status: 'active' } });
            if (product) {
                products.courses.push({
                    course: product,
                    dateSale: order.createdAt
                });
            }
        } else if (order.productId.startsWith('license')) {
            product = await License.findOne({ where: { id: order.productId, status: 'active' } });
            if (product) {
                products.licenses.push({
                    license: product,
                    dateSale: order.createdAt
                });
            }
        }
    }

    const workbook = new EXCELJS.Workbook();
    await workbook.xlsx.readFile('./src/public/ventas.xlsx');

    const profilesSheet = workbook.getWorksheet('Perfiles');
    const accountsSheet = workbook.getWorksheet('Cuentas');
    const coursesSheet = workbook.getWorksheet('Cursos');
    const licensesSheet = workbook.getWorksheet('Mas servicios');


   const writeDataToSheet = (sheet, data) => {
    const sheetName = sheet.name;

    if(sheetName === 'Perfiles') {
       data.forEach((profilei, index) => {
           const { profile, dateSale } = profilei;
           sheet.getCell(`B${index + 3}`).value = profile.categoriesCP.name;
           sheet.getCell(`C${index + 3}`).value = profile.name;
           sheet.getCell(`D${index + 3}`).value = profile.description;
           sheet.getCell(`E${index + 3}`).value = profile.price;
           sheet.getCell(`F${index + 3}`).value = profile.durationOfService;
           sheet.getCell(`G${index + 3}`).value = decrypt(profile.emailAccount);
           sheet.getCell(`H${index + 3}`).value = decrypt(profile.passwordAccount);
           sheet.getCell(`I${index + 3}`).value = profile.profileAccount;
           sheet.getCell(`J${index + 3}`).value = profile.pincodeAccount;
           sheet.getCell(`K${index + 3}`).value = dateSale;
       });
   } else if (sheetName === 'Cuentas') {
       data.forEach((accounti, index) => {
           const { account, dateSale } = accounti;
           sheet.getCell(`B${index + 3}`).value = account.categoriesCP.name;
           sheet.getCell(`C${index + 3}`).value = account.name;
           sheet.getCell(`D${index + 3}`).value = account.description;
           sheet.getCell(`E${index + 3}`).value = account.price;
           sheet.getCell(`F${index + 3}`).value = account.durationOfService;
           sheet.getCell(`G${index + 3}`).value = encrypt(account.emailAccount);
           sheet.getCell(`H${index + 3}`).value = encrypt(account.passwordAccount);
           sheet.getCell(`I${index + 3}`).value = dateSale;
       })
   } else if (sheetName === 'Cursos') {
       data.forEach((coursei, index) => {
           const { course, dateSale } = coursei;
           sheet.getCell(`B${index + 3}`).value = course.name;
           sheet.getCell(`C${index + 3}`).value = course.description;
           sheet.getCell(`D${index + 3}`).value = course.price;
           sheet.getCell(`E${index + 3}`).value = course.linkCourse;
           sheet.getCell(`F${index + 3}`).value = dateSale;
       })
   } else if (sheetName === 'Mas servicios') {
       data.forEach((licensei, index) => {
           const { license, dateSale } = licensei;
           sheet.getCell(`B${index + 3}`).value = license.name;
           sheet.getCell(`C${index + 3}`).value = license.description;
           sheet.getCell(`D${index + 3}`).value = license.price;
           sheet.getCell(`E${index + 3}`).value = dateSale;
       })
   }
}

   writeDataToSheet(profilesSheet, products.profiles);
   writeDataToSheet(accountsSheet, products.accounts);
   writeDataToSheet(coursesSheet, products.courses);
   writeDataToSheet(licensesSheet, products.licenses);


   
   const excelFilePath = `Ventas ${formattedDate}.xlsx`;
   await workbook.xlsx.writeFile(excelFilePath);


   res.download(excelFilePath, `Ventas ${formattedDate}.xlsx`, (err) => {
       fs.unlinkSync(excelFilePath);
   });


});