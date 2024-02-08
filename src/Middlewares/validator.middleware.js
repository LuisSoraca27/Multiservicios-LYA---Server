import { body, validationResult } from 'express-validator';

// Utils
import AppError from '../Utils/appError.js';

const checkValidations = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
        const errorMessages = errors.array().map((err) => err.msg);

        const message = errorMessages.join(". ");

        return next(new AppError(message, 400));
    }

    next();
};

export const createUserValidators = [
    body("username")
        .isString()
        .withMessage("Name must be a string")
        .notEmpty()
        .withMessage("Name cannot be empty")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters"),
    body("email")
        .isEmail()
        .withMessage("Must provide a valid email"),
    body("password")
        .isString()
        .withMessage("Password must be a string")
        .notEmpty()
        .withMessage("Password cannot be empty")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
    body("role")
        .isString()
        .withMessage("Role must be a string")
        .notEmpty()
        .withMessage("Role cannot be empty"),
    checkValidations,
];

export const createProfileValidators = [
    body("name")
        .isString()
        .withMessage("Name must be a string")
        .notEmpty()
        .withMessage("name cannot be empty")
        .isLength({ min: 3 })
        .withMessage("title must be at least 3 characters"),
    body("description")
        .isString()
        .withMessage("description must be a string")
        .notEmpty()
        .withMessage("description cannot be empty")
        .isLength({ min: 10, max: 230 })
        .withMessage("description must be at least 20 characters"),
    body("price")
        .isNumeric()
        .withMessage("price must be a number")
        .notEmpty()
        .withMessage("price cannot be empty"),
    body("emailAccount")
        .isString()
        .withMessage("emailAccount must be a string")
        .notEmpty()
        .withMessage("quantity cannot be empty"),
    body("passwordAccount")
        .isString()
        .withMessage("passwordAccount must be a string")
        .notEmpty()
        .withMessage("passwordAccount cannot be empty"),
    body("profileAccount")
        .isString()
        .withMessage("profileAccount must be a string")
        .notEmpty()
        .withMessage("profileAccount cannot be empty"),
    body("pincodeAccount")
        .isString()
        .withMessage("pincodeAccount must be a string")
        .notEmpty()
        .withMessage("pincodeAccount cannot be empty"),
    body("categoryId")
        .isNumeric()
        .withMessage("categoryId must be a number")
        .notEmpty()
        .withMessage("categoryId cannot be empty"),
    checkValidations,
];


export const createAccountValidators = [
    body("name")
        .isString()
        .withMessage("Name must be a string")
        .notEmpty()
        .withMessage("name cannot be empty")
        .isLength({ min: 3 })
        .withMessage("title must be at least 3 characters"),
    body("description")
        .isString()
        .withMessage("description must be a string")
        .notEmpty()
        .withMessage("description cannot be empty")
        .isLength({ min: 10, max: 230 })
        .withMessage("description must be at least 20 characters"),
    body("price")
        .isNumeric()
        .withMessage("price must be a number")
        .notEmpty()
        .withMessage("price cannot be empty"),
    body("emailAccount")
        .isString()
        .withMessage("emailAccount must be a string")
        .notEmpty()
        .withMessage("quantity cannot be empty"),
    body("passwordAccount")
        .isString()
        .withMessage("passwordAccount must be a string")
        .notEmpty()
        .withMessage("passwordAccount cannot be empty"),
    body("categoryId")
        .isNumeric()
        .withMessage("categoryId must be a number")
        .notEmpty()
        .withMessage("categoryId cannot be empty"),
    checkValidations,
];

export const createComboValidators = [
    body("name")
        .isString() 
        .withMessage("Name must be a string")
        .notEmpty()
        .withMessage("name cannot be empty")
        .isLength({ min: 3 })
        .withMessage("title must be at least 3 characters"),
    body("description")
        .isString()
        .withMessage("description must be a string")
        .notEmpty()
        .withMessage("description cannot be empty")
        .isLength({ min: 10, max: 230 })
        .withMessage("description must be at least 10 characters"),
    body("price")
        .isNumeric()
        .withMessage("price must be a number")
        .notEmpty()
        .withMessage("price cannot be empty"),
        checkValidations,
    ]

export const createCourseValidators = [
    body("name")
        .isString()
        .withMessage("Name must be a string")
        .notEmpty()
        .withMessage("name cannot be empty")
        .isLength({ min: 3 })
        .withMessage("title must be at least 3 characters"),
    body("description")
        .isString()
        .withMessage("description must be a string")
        .notEmpty()
        .withMessage("description cannot be empty")
        .isLength({ min: 10, max: 230 })
        .withMessage("description must be at least 10 characters"),
    body("price")
        .isNumeric()
        .withMessage("price must be a number")
        .notEmpty()
        .withMessage("price cannot be empty"),
    body("linkCourse")
        .isString()
        .withMessage("linkCourse must be a string")
        .notEmpty()
        .withMessage("linkCourse cannot be empty"),
    checkValidations
]

export const createLicenseValidators = [
    body("name")
        .isString()
        .withMessage("Name must be a string")
        .notEmpty()
        .withMessage("name cannot be empty")
        .isLength({ min: 3 })
        .withMessage("title must be at least 3 characters"),
    body("description")
        .isString()
        .withMessage("description must be a string")
        .notEmpty()
        .withMessage("description cannot be empty")
        .isLength({ min: 10, max: 230 })
        .withMessage("description must be at least 10 characters"),
    body("price")
        .isNumeric()
        .withMessage("price must be a number")
        .notEmpty()
        .withMessage("price cannot be empty"),
    checkValidations
]

export const createGiftValidators = [
    body("name")
        .isString()
        .withMessage("Name must be a string")
        .notEmpty()
        .withMessage("name cannot be empty")
        .isLength({ min: 3 })
        .withMessage("title must be at least 3 characters"),
    body("description")
        .isString()
        .withMessage("description must be a string")
        .notEmpty()
        .withMessage("description cannot be empty")
        .isLength({ min: 10, max: 240 })
        .withMessage("description must be at least 10 characters"),
    checkValidations
]