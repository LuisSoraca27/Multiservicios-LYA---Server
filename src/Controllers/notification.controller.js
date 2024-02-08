//models
import Notifications from "../Models/notifications.model.js";
import User from "../Models/user.model.js";


//Utils
import catchAsync from "../Utils/catchAsync.util.js";
import AppError from "../Utils/appError.js";



export const CreateNotification = catchAsync(async (req, res, next) => {
    const { message, type } = req.body;
    const { sessionUser } = req;


    const notification = await Notifications.create({
        message,
        type,
        userId: sessionUser.id
    })

    res.status(201).json({
        status: 'success',
        data: notification
    })
})


export const CreateNotificationLocal = async (notification) => {
    try {
        await Notifications.create({
            message: notification.message,
            type: 'normal',
            userId: 1,
        });

    } catch (error) {
        console.log(error);
    }
}



export const getNotifications = catchAsync(async (req, res, next) => {
    const notifications = await Notifications.findAll({
        include: [
            {
                model: User
            }
        ]
    })

    res.status(200).json({
        status: 'success',
        data: notifications
    })
})


export const deleteNotification = catchAsync(async (req, res, next) => {
    const { notification } = req;

    await notification.destroy();

    res.status(204).json({
        status: 'success'
    })
})