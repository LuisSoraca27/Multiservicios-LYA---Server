//models
import Gift from '../Models/gift.model.js';


//utils
import catchAsync from '../Utils/catchAsync.util.js';
import appError from '../Utils/appError.js';


export const giftExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const gift = await Gift.findOne({
		where: { id, status: 'active' },
	});

	// If user doesn't exist, send error message
	if (!gift) {
		return next(new appError('gift not found', 404));
	}

	// req.anyPropName = 'anyValue'
	req.gift  = gift;
	next();
});