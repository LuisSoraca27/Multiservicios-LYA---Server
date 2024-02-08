import { Router } from "express";

//controllers
import { createCategoriesCP, getCategoriesCP, deleteCategoriesCP } from "../Controllers/categoriesCP.controller.js";

//middlewares
import { protectAdmin, protectSession } from "../Middlewares/auth.middleware.js";

const categoriesCPRouter = Router();

categoriesCPRouter.get("/", getCategoriesCP);

categoriesCPRouter.use(protectSession, protectAdmin);

categoriesCPRouter.post("/create", createCategoriesCP);

categoriesCPRouter.delete("/delete/:id", deleteCategoriesCP);


export default categoriesCPRouter 