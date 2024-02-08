import { Router } from 'express'


//Controllers
import { createGift, getGifts, deleteGift, updateGift, sendGift } from "../Controllers/gift.controller.js";

//Middlewares
import { createGiftValidators } from "../Middlewares/validator.middleware.js"
import {  protectAdmin, protectSession } from '../Middlewares/auth.middleware.js'
import { giftExists } from '../Middlewares/gift.middleware.js'


const giftRoutes = Router()


giftRoutes.use(protectSession)

giftRoutes.use(protectAdmin)

giftRoutes.get("/", getGifts)

giftRoutes.post('/', createGiftValidators, createGift)

giftRoutes.post('/send/:id', giftExists,sendGift)

giftRoutes.patch('/:id', giftExists, updateGift)

giftRoutes.delete('/:id', giftExists, deleteGift)

export default giftRoutes;