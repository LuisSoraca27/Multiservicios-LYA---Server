import { Router } from 'express';


//Controllers
import {
    CreateNotification,
    getNotifications,
    deleteNotification
} from '../Controllers/notification.controller.js'


//Middlewares
import { protectAdmin, protectSession } from '../Middlewares/auth.middleware.js'
import { notificationExists } from '../Middlewares/notification.middleware.js'


const notificationRouter = Router();

notificationRouter.use(protectSession);


notificationRouter.post('/', CreateNotification);

notificationRouter.get('/', getNotifications);

notificationRouter.delete('/:id', notificationExists, deleteNotification);

export default notificationRouter