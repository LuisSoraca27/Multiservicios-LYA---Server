import User from '../Models/user.model.js';
import HistoryRecharge from '../Models/historyRecharge.model.js';

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

//utils
import catchAsync from '../Utils/catchAsync.util.js'
import AppError from '../Utils/appError.js'


dotenv.config();


export const createuser = catchAsync(async (req, res, next) => {

    const { username, email, password, phone, role } = req.body;

    // Encrypt the password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        phone,
        role
    });

    user.password = undefined;

    res.status(201).json({
        status: 'success',
        data: { user },
        message: 'Usuario creado exitosamente',
    });

});


export const login = catchAsync(async (req, res, next,) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        where: { email, status: "active" },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new AppError("Credenciales incorrectas", 400));
    }

    // Remove password from response
    user.password = undefined;

    // Generate JWT (payload, secretOrPrivateKey, options)
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });

    res.status(200).json({
        status: "success",
        data: { user, token },
    });
})

export const getUser = catchAsync(async (req, res, next) => {
    
    const { user } = req
    res.status(200).json({
        status: "success",
        data: user,
    })
})

export const getUserAdmnin = catchAsync(async (req, res, next) => {

    const users = await User.findAll({
        where: { status: "active", role: "admin", },
        attributes: { exclude: ['password'] },
    });


    res.status(200).json({
        status: "success",
        data: { users },
    })
})


export const getUserSeller = catchAsync(async (req, res, next) => {

    const users = await User.findAll({
        where: { status: "active", role: "seller", },
        attributes: { exclude: ['password'] },
    });


    res.status(200).json({
        status: "success",
        data: { users },
    })
})


export const updateUser = catchAsync(async (req, res) => {
    const { username, email, phone } = req.body;
    console.log('phone', phone)
    const { user } = req

    console.log(req.body)

    const userUpdated = await user.update({
        username,
        email,
        phone
    })

    userUpdated.password = undefined;

    res.status(200).json({
        status: 'success',
        data: { userUpdated },
        message: 'Usuario actualizado correctamente'
    });

});


export const agreeBalance = catchAsync(async (req, res, next) => {
    const { user } = req
    const { balance } = req.body
    const { sessionUser } = req

    // const idUser = sessionUser.id.toString()
    // if(idUser !== process.env.ADMIN_ID){
    //     return next(new AppError('No tienes permisos para realizar esta accion', 401));
    // }

    const newBalance = parseInt(user.balance) + parseInt(balance)

    await user.update({
        balance: newBalance
    })

    user.password = undefined;

    const recharge = registerRecharge(sessionUser, user, balance)

    res.status(200).json({
        status: 'success',
        data: { user, recharge }
    })
})

export const deleteUser = catchAsync(async (req, res) => {
    const { user } = req

    await user.destroy()

    res.status(200).json({
        status: 'success',
    })
})

export const getBalanceUser = catchAsync(async (req, res) => {
    const { user } = req

    res.status(200).json({
        status: 'success',
        data: { balance: user.balance }
    })
}
)

export const registerRecharge = catchAsync(async ( userSession, user, balance, ) => {

  const recharge =  await HistoryRecharge.create({
        userId: userSession.id,
        balance: balance,
        idUserRecharge: user.id
    })

    return recharge
}
)

export const getRechargeUser = catchAsync(async (req, res) => {
    const { sessionUser } = req
    const recharge = await HistoryRecharge.findAll({
        where: {
            idUserRecharge: String(sessionUser.id)
        }
    })

    res.status(200).json({
        status: 'success',
        data: recharge
    })
}
)