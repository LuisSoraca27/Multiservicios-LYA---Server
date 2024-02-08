//models
import License from '../Models/license.model.js';


//utils
import catchAsync from '../Utils/catchAsync.util.js';
import appError from '../Utils/appError.js';


export const licenseExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const license = await License.findOne({
		where: { id, status: 'active' },
	});

	// If user doesn't exist, send error message
	if (!license) {
		return next(new appError('License not found', 404));
	}

	// req.anyPropName = 'anyValue'
	req.license = license;
	next();
});