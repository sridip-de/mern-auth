// Import asyncHandler to handle async errors
import asyncHandler from 'express-async-handler';
// import ApiError for custom error handling (not used in this snippet)
import ApiError from '../utils/apiError.js';
// Import ApiResponse for standardized API responses (not used in this snippet)
import ApiResponse from '../utils/ApiResponse.js';
// Import User model
import User from '../models/userModel.js';

// get user details form the forntend
// validate user credentials (email & password )
// check if user exists (using email or username)
// encrypt the pssword using bcrypt
// save the user in the database
// generate tokens (JWT)
// remove the password and refreshToken from the response
// send the response to the user

const resister = asyncHandler(async (req, res, next) => {

  const { name, email, password,userName } = req.body;

  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return next(new ApiError('All fields are required', 400));
  }

  const userExists = await User.findOne({
    $or: [{ email }, { userName }]
  })

  if (userExists) {
    return next(new ApiError('Uer already exists', 400));
  }

  const user = await User.create({ name, email, password, userName: userName.toLowerCase()});
  

  const createdUser = await User.findById(user._id).select('-password -refreshToken');

  if(!createdUser){
    return next(new ApiError('User not created', 500));
  }

  res.status(201).json(
    new ApiResponse(201, createdUser, 'User created successfully')
  )

});
