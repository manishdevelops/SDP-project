const catchAsync = require("./catchAsync");
const AppError = require('./appError');
const User = require('../models/userModel');

exports.isAdmin = catchAsync(async (req, res, next) => {

    const user = await User.findById({ _id: req.user.id });

    if (user.role !== 'admin') return next(new AppError('Unauthorized action. Please contact your administrator.'));

    next();
});