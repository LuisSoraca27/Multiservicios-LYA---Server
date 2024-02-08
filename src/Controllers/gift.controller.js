import dotenv from 'dotenv'

dotenv.config()

//Models
import Gift from '../Models/gift.model.js'
import User from '../Models/user.model.js'


//Utils
import catchAsync from '../Utils/catchAsync.util.js'
import appError from '../Utils/appError.js'

//nodemailer
import { messageGift } from '../Utils/nodemailer/message.js'
import {sendEmail} from '../Utils/nodemailer/nodemailer.js'


export const createGift = catchAsync(async (req, res, next) => {
    const { name, description } = req.body;
    const { sessionUser } = req

    const gift = await Gift.create({
        name,
        description,
        userId: sessionUser.id
    })

    res.status(201).json({
        status: 'success',
        data: gift
    })
})

export const getGifts = catchAsync(async (req, res, next) => {
    const gifts = await Gift.findAll({ where: { status: 'active' } })
    res.status(200).json({
        status: 'success',
        data: gifts
    })
})


export const updateGift = catchAsync(async (req, res, next) => {
    const { gift } = req
    const { name, description } = req.body

    gift.update({
        name,
        description
    })

    res.status(200).json({
        status: 'success'
    })
})


export const deleteGift = catchAsync(async (req, res, next) => {
    const { gift } = req

    gift.destroy()

    res.status(204).json({
        status: 'success'
    })
})

export const sendGift = catchAsync(async (req, res, next) => {
    const { gift } = req
    const { idUserFinal } = req.body

    const userFinal = await User.findByPk(idUserFinal)

    if (!userFinal) {
        return next(new appError('User not found', 404))
    }

    const message = messageGift(gift)

    await sendEmail({
        email: userFinal.email,
        subject: 'Datos de tu compra'
    }, message)

    await sendEmail({
        email: process.env.USER_ADMIN,
        subject: 'Has entregado un nuevo obsequio'
    }, "<h1>Has entregado un nuevo obsequio</h1><p>Nombre: " + gift.name + "</p> <p>identificador: " + gift.id )

      await gift.destroy()

    res.status(200).json({
        status: 'success'
    })
})