//models
import Combo from '../Models/combo.model.js';


//utils
import catchAsync from '../Utils/catchAsync.util.js';
import appError from '../Utils/appError.js';


export const comboExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const combo = await Combo.findOne({
		where: { id, status: 'active' },
	});

	// If user doesn't exist, send error message
	if (!combo) {
		return next(new appError('Combo not found', 404));
	}

	// req.anyPropName = 'anyValue'
	req.combo = combo;
	next();
});