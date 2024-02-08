import { Router } from 'express';

//Controllers
import {
    orderProfile,
    orderCombo,
    orderLicense,
    orderCourse,
    orderAccount,
    getOrderbyMonth,
    getSalesByDay,
    getSalesByDayByUser,
    getDailySales,
} from '../Controllers/order.controller.js';

//Middlewares
import { protectSession, protectAdmin } from '../Middlewares/auth.middleware.js'
import { profileExists } from '../Middlewares/profile.middleware.js'
import { comboExists } from '../Middlewares/combo.middleware.js';
import { courseExists } from '../Middlewares/course.middleware.js';
import { licenseExists } from '../Middlewares/license.middleware.js';
import { accountExists } from '../Middlewares/account.middlewares.js'




const orderRouter = Router();

// orderRouter.get('/getdaily', getDailySales );
orderRouter.get('/getdaily/', getDailySales);

orderRouter.use(protectSession);

orderRouter.post('/profile/:id', profileExists, orderProfile);

orderRouter.post('/combo/:id', comboExists, orderCombo);

orderRouter.post('/license/:id', licenseExists, orderLicense);

orderRouter.post('/course/:id', courseExists, orderCourse);

orderRouter.post('/account/:id', accountExists, orderAccount);

orderRouter.get('/day/user/:id', getSalesByDayByUser);

orderRouter.use(protectAdmin);

orderRouter.get('/month/', getOrderbyMonth);

orderRouter.get('/day/', getSalesByDay);

orderRouter.post('/getdaily/', getDailySales);

export default orderRouter;