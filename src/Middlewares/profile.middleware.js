//models
import Profile from '../Models/profile.model.js';


//utils
import catchAsync from '../Utils/catchAsync.util.js';
import appError from '../Utils/appError.js';


export const profileExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const profile = await Profile.findOne({
		where: { id },
	});

	// If user doesn't exist, send error message
	if (!profile) {
		return next(new appError('Profile not found', 404));
	}

	// req.anyPropName = 'anyValue'
	req.profile = profile;
	next();
});