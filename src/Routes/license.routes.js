import { Router } from 'express';

//Controller
import { createLicense, getLicense, deleteLicense, updateLicense } from '../Controllers/license.controller.js';


//Middlewares
import { protectAdmin, protectSession } from '../Middlewares/auth.middleware.js'
import { createLicenseValidators } from '../Middlewares/validator.middleware.js'
import { licenseExists } from '../Middlewares/license.middleware.js'


//utils
import upload from '../Utils/multer.util.js'

const licenseRouter = Router();


licenseRouter.use(protectSession);

licenseRouter.get("/", getLicense);

licenseRouter.use(protectAdmin)

licenseRouter.post("/", upload.single('licenseImg'), createLicenseValidators, createLicense);

licenseRouter.put("/:id", licenseExists, updateLicense);

licenseRouter.delete("/:id", licenseExists, deleteLicense);


export default licenseRouter;