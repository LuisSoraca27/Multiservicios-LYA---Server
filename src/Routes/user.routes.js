import { Router } from 'express';

//controllers
import {
    createuser,
    login,
    getUserAdmnin,
    getUserSeller,
    updateUser,
    agreeBalance,
    deleteUser,
    getBalanceUser,
    getUser,
    getRechargeUser
} from '../Controllers/user.controller.js';

//middlewares
import { createUserValidators } from '../Middlewares/validator.middleware.js';
import { roleValidator, userExists, roleValidatorSeller } from '../Middlewares/user.middleware.js';
import { protectSession, protectAdmin,  } from '../Middlewares/auth.middleware.js';


const userRoutes = Router();

userRoutes.post('/login' ,login)


userRoutes.post('/createuserseller', createUserValidators, roleValidatorSeller, createuser)

userRoutes.post('/createuser', createUserValidators, roleValidator, createuser)

userRoutes.use(protectSession)

userRoutes.get("/getrechargeuser/:id", getRechargeUser)

userRoutes.get("/usersession/:id", userExists, getUser)

userRoutes.get("/getbalance/:id", userExists, getBalanceUser)

userRoutes.patch("/updateuser/:id", userExists, updateUser)

userRoutes.use(protectAdmin)

userRoutes.get("/getuseradmin", getUserAdmnin)

userRoutes.get("/getuserseller", getUserSeller)

userRoutes.post('/createuser', createUserValidators, roleValidator, createuser)

userRoutes.patch("/agreebalance/:id", userExists, agreeBalance)

userRoutes.delete("/deleteuser/:id", userExists, deleteUser)


export default userRoutes;