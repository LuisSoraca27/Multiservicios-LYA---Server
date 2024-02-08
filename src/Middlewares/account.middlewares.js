import Account from '../Models/account.model.js';


//utils
import catchAsync from '../Utils/catchAsync.util.js';
import appError from '../Utils/appError.js';


export const accountExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const account = await Account.findOne({
        where: { id },
    });

    // If user doesn't exist, send error message
    if (!account) {
        return next(new appError('account not found', 404));
    }

    // req.anyPropName = 'anyValue'
    req.account = account;
    next();
});