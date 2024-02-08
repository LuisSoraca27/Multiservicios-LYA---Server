//models
import Combo from '../Models/combo.model.js';
import ProfileInCombo from '../Models/profileInCombo.model.js';
import Profile from '../Models/profile.model.js';
import imgCombo from '../Models/imgCombo.js';

//utils
import catchAsync from '../Utils/catchAsync.util.js';
import AppError from '../Utils/appError.js';
import { generateUniquedID, encrypt, decrypt } from '../Utils/function/function.util.js';
import { uploadComboImg, getCombosImgsUrls, deleteImg } from '../Utils/firebase.util.js';


export const getCombo = catchAsync(async (req, res, next) => {
    const combos = await Combo.findAll({
        include: [{
            model: ProfileInCombo,
            include: [{
                model: Profile
            }]

        },
        {
            model: imgCombo
        }
        ]
    });

    await getCombosImgsUrls(combos);
    

    combos.forEach(combo => {
        combo.profileInCombos.forEach(profile => {
            profile.profile.passwordAccount = decrypt(profile.profile.passwordAccount)
            profile.profile.emailAccount = decrypt(profile.profile.emailAccount)
        })
    })

    res.status(200).json({
        status: 'success',
        data: combos,
    });
})


export const createCombo = catchAsync(async (req, res, next) => {

    const { name, description, price, profiles } = req.body;
    const { sessionUser } = req;

    const profilesJSON = JSON.parse(profiles)

    const idCombo = generateUniquedID('combo');

    const combo = await Combo.create({
        id: idCombo,
        name,
        description,
        price,
        userId: sessionUser.id
    })
    const comboID = combo.id;

    await uploadComboImg(req.file, comboID);

    await Promise.all(profilesJSON.map(async (profile) => {

        const idProfile = generateUniquedID('profile');

        const {
            name,
            description,
            price,
            emailAccount,
            passwordAccount,
            profileAccount,
            pincodeAccount,
            categoryId,
            isCombo
        } = profile

        const emailAccountEncrypted = encrypt(emailAccount);
        const passwordAccountEncrypted = encrypt(passwordAccount);

        const newProfile = await Profile.create({

            id: idProfile,
            name,
            description,
            price,
            emailAccount: emailAccountEncrypted,
            passwordAccount: passwordAccountEncrypted,
            profileAccount: profileAccount ? profileAccount : null,
            pincodeAccount: pincodeAccount ? pincodeAccount : null,
            categoryId,
            isCombo,
            userId: sessionUser.id,
        })

        const profileInCombo = await ProfileInCombo.create({
            profileId: newProfile.id,
            comboId: combo.id,
        })
    }))

    res.status(201).json({
        status: 'success',
        data: combo
    })
})


export const updateCombo = catchAsync(async (req, res, next) => {

    const { name, description, price, profiles } = req.body;
    const { sessionUser } = req;
    const { combo } = req

    await combo.update({
        name,
        description,
        price,
    })

    await Promise.all(profiles.map(async (profile) => {
        const {
            id,
            name,
            description,
            price,
            emailAccount,
            passwordAccount,
            profileAccount,
            pincodeAccount,
            categoryId,
            isCombo,
        } = profile;

        const existProfile = await Profile.findOne({
            where: {
                id: id
            }
        })

        if (existProfile) {
            console.log('Estoy actualizando el perfil')
            await existProfile.update({
                name,
                description,
                price,
                emailAccount,
                passwordAccount,
                profileAccount,
                pincodeAccount,
            })
        } else {
            console.log('Estoy creando el perfil')
            const newId = generateUniquedID('profile');
            const newProfile = await Profile.create({
                id: newId,
                name,
                description,
                price,
                emailAccount,
                passwordAccount,
                profileAccount,
                pincodeAccount,
                categoryId,
                userId: sessionUser.id,
                isCombo
            });

            await ProfileInCombo.create({
                profileId: newProfile.id,
                comboId: combo.id,
            });
        }
    }))

    res.status(200).json({
        status: 'success',
        message: 'Combo updated successfully',
    });
})


export const deleteCombo = catchAsync(async (req, res, next) => {

    const { combo } = req;


    const img_combo = await imgCombo.findOne({
        where: {
            comboId: combo.id
        }
    })

    await deleteImg(img_combo.urlImagen);

    await ProfileInCombo.destroy({
        where: {
            comboId: combo.id
        },
        include: [
            {
                model: Profile,
                through: {
                    model: ProfileInCombo,
                    where: {
                        comboId: combo.id
                    }
                }
            }
        ]
    });

    await combo.destroy();

    res.status(200).json({
        status: 'success',
    })
})
