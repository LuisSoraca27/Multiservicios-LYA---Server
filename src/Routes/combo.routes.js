import { Router } from 'express';

//Controllers
import { createCombo, getCombo, deleteCombo, updateCombo } from '../Controllers/combo.controller.js';
import { comboExists } from '../Middlewares/combo.middleware.js';
import { protectAdmin, protectSession } from '../Middlewares/auth.middleware.js';


//Utils
import upload from '../Utils/multer.util.js'



const comboRouter = Router();



comboRouter.use(protectSession)

comboRouter.get("/", getCombo);

comboRouter.use(protectAdmin)

comboRouter.post("/", upload.single('comboImg'), createCombo);

comboRouter.put("/:id", comboExists, updateCombo);

comboRouter.delete("/:id", comboExists, deleteCombo);


export default comboRouter
