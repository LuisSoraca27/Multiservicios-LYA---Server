import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


//users
import User from '../Models/user.model.js';

//utils
import catchAsync from '../Utils/catchAsync.util.js';
import AppError from '../Utils/appError.js';

dotenv.config();





export const protectSession = catchAsync(async (req, res, next) => {
	// Get token
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		// Extract token
		// req.headers.authorization = 'Bearer token'
		token = req.headers.authorization.split(' ')[1]; // -> [Bearer, token]
	}

	// Check if the token was sent or not
	if (!token) {
		return next(new AppError('The token was invalid', 403));
	}

	// Verify the token
	const decoded = jwt.verify(token, process.env.JWT_SECRET);

	// Verify the token's owner
	const user = await User.findOne({
		where: { id: decoded.id, status: 'active' },
	});

	if (!user) {
		return next(
			new AppError('The owner of the session is no longer active', 403)
		);
	}

	// Grant access
	req.sessionUser = user;
	next();
});


export const protectAdmin = (req, res, next) => {
	const { sessionUser } = req;

	if (sessionUser.role !== 'admin') {
		return next(new AppError('You do not have the right access level.', 403));
	}

	next();
};

export const protectProfileOwner = (req, res, next) => {

	const { sessionUser, profile} = req;

	if (sessionUser.id !== profile.userId) {
		return next(new AppError('You are not the owner of this account.',403))
	}
	next();
}

export const protectAccountOwner = (req, res, next) => {

	const { sessionUser, account} = req;

	if (sessionUser.id !== account.userId) {
		return next(new AppError('You are not the owner of this account.',403))
	}
	next();
}