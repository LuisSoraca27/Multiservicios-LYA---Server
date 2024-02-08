// Model
import License from '../Models/license.model.js'
import imgLicense from '../Models/imgLicense.model.js';

//Utils
import catchAsync from '../Utils/catchAsync.util.js';
import AppError from '../Utils/appError.js';
import { generateUniquedID } from '../Utils/function/function.util.js';
import { uploadLicenseImg, getLicensesImgsUrls, deleteImg } from '../Utils/firebase.util.js';




export const createLicense = catchAsync(async (req, res, next) => {

    const { name, description, price, offerPrice } = req.body;
    const { sessionUser } = req

    const id = generateUniquedID('license');

    const license = await License.create({
        id,
        name,
        description,
        price,
        offerPrice: offerPrice ? offerPrice : 0,
        userId: sessionUser.id
    })

    await uploadLicenseImg(req.file, license.id);

    res.status(201).json({
        status: 'success',
        data: license
    })
})

export const getLicense = catchAsync(async (req, res, next) => {
    const license = await License.findAll({
        where: { status: 'active' },
        include: [
            {
                model: imgLicense,
            }
        ]
    })

    await getLicensesImgsUrls(license);

    res.status(200).json({
        status: 'success',
        data: license
    })

});

export const updateLicense = catchAsync(async (req, res, next) => {
    const { license } = req;

    const {
        name,
        description,
        price,
    } = req.body;

    await license.update({
        name,
        description,
        price
    })

    res.status(200).json({
        status: 'success',
        data: license
    })

});


export const deleteLicense = catchAsync(async (req, res, next) => {

    const { license } = req;

    const img_License = await imgLicense.findOne({
        where: { licenseId: license.id }
    })

    await deleteImg(img_License.urlImagen);

    img_License.destroy();

    await license.destroy();

    res.status(204).json({
        status: 'success',
    })
})