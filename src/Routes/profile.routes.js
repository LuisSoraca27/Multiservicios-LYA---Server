import { Router } from "express";
import upload from "../Utils/multer.util.js";

//controller
import { createProfile, filterProfile, updateProfile, deleteProfile, getLengthCategoryProfile, createForExcel, deleteProfiles } from "../Controllers/profile.controller.js";

//middleware
import { protectSession, protectAdmin, protectProfileOwner } from "../Middlewares/auth.middleware.js";
import { createProfileValidators } from "../Middlewares/validator.middleware.js";
import { profileExists } from "../Middlewares/profile.middleware.js";


const profileRoutes = Router();

// profileRoutes.get("/getprofile/:id", getProfile)


profileRoutes.use(protectSession)

profileRoutes.post('/uploadexcelprofile', upload.single('file'), createForExcel)
profileRoutes.get("/length", getLengthCategoryProfile)

profileRoutes.post("/filter", filterProfile)

profileRoutes.use(protectAdmin);

profileRoutes.post("/", createProfileValidators, createProfile);

profileRoutes.put("/:id", profileExists, updateProfile);

profileRoutes.delete("/:id", profileExists, deleteProfile);


profileRoutes.delete("/deletes", deleteProfiles)

export default profileRoutes