import { Router } from 'express';
import upload from '../Utils/multer.util.js'

//controllers
import { createAccount, getAccount, filterAccount, updateAccount, deleteAccount, getLengthCategoryAccount, createForExcel, deleteAccounts } from '../Controllers/account.controller.js'

//middlewares
import { protectSession, protectAdmin, protectAccountOwner } from "../Middlewares/auth.middleware.js";
import { createAccountValidators } from "../Middlewares/validator.middleware.js";
import { accountExists } from '../Middlewares/account.middlewares.js';


const accountRoutes = Router();

accountRoutes.use(protectSession)


accountRoutes.get("/", getAccount)

// Ruta para subir un archivo
accountRoutes.post('/uploadexcelaccount', upload.single('file'), createForExcel)

accountRoutes.get("/length", getLengthCategoryAccount)

accountRoutes.post("/filter", filterAccount)

accountRoutes.use(protectAdmin);

accountRoutes.post("/", createAccountValidators, createAccount);

accountRoutes.put("/:id", accountExists, updateAccount);

accountRoutes.delete("/:id", accountExists, deleteAccount);


accountRoutes.delete("/deletes", deleteAccounts)


export default accountRoutes;