import User from "../Models/user.model.js";

//utils
import catchAsync from "../Utils/catchAsync.util.js";
import appError from "../Utils/appError.js";



export const roleValidator = (req, res, next) => {

	const { role } = req.body;

	if (role !== "admin" && role !== "seller") {
		return next(new appError("Invalid role", 400));
	}
	next();
}

export const roleValidatorSeller = (req, res, next) => {
	const { role } = req.body;

	if (role !== "seller") {
		return next(new appError("Invalid role", 400));
	}
	next();
}


export const userExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const user = await User.findOne({
		attributes: { exclude: ['password'] },
		where: { id },
	});

	// If user doesn't exist, send error message
	if (!user) {
		return next(new appError('User not found', 404));
	}

	req.user = user;
	next();
});


