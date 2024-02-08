
//models
import CategoriesCP from "../Models/categoriesCP.model.js";

//utils
import catchAsync from "../Utils/catchAsync.util.js";
import AppError from "../Utils/appError.js";


export const createCategoriesCP = catchAsync(async (req, res, next) => {
    const { name } = req.body;

    const categoriesCPexists = await CategoriesCP.findOne({ where: { name, status: "active" } });
    if (categoriesCPexists) {
        return next(new AppError('CategoriesCP already exists', 400));
    }

    const newCategoriesCP = await CategoriesCP.create({ name });

    res.status(201).json({
        status: "success",
        data: newCategoriesCP
    })
})


export const getCategoriesCP = catchAsync(async (req, res, next) => {
    const categoriesCP = await CategoriesCP.findAll({where: {status: "active"}});
    res.status(200).json({
        status: "success",
        data: categoriesCP
    })
})

export const deleteCategoriesCP = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const categoriesCP = await CategoriesCP.findByPk(id);
    if (!categoriesCP) {
        return next(new AppError('CategoriesCP not found', 404));
    }
    await categoriesCP.destroy();
    res.status(204).json({
        status: "success",
    })
})