//models
import Course from '../Models/course.model.js';


//utils
import catchAsync from '../Utils/catchAsync.util.js';
import appError from '../Utils/appError.js';


export const courseExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const course = await Course.findOne({
		where: { id, status: 'active' },
	});

	// If user doesn't exist, send error message
	if (!course) {
		return next(new appError('Course not found', 404));
	}

	// req.anyPropName = 'anyValue'
	req.course  = course;
	next();
});