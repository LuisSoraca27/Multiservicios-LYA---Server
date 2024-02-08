//models
import Notifications from '../Models/notifications.model.js';


//utils
import catchAsync from '../Utils/catchAsync.util.js';
import appError from '../Utils/appError.js';


export const notificationExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const notification = await Notifications.findOne({
        where: { id },
    });

    // If notification doesn't exist, send error message
    if (!notification) {
        return next(new appError('Course not found', 404));
    }

    // req.anyPropName = 'anyValue'
    req.notification = notification;
    next();
});