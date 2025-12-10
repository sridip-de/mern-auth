// Import asyncHandler to handle async errors
import asyncHandler from '../utils/AsyncHandler.js';
// import ApiError for custom error handling (not used in this snippet)
import ApiError from '../utils/ApiError.js';
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

const register = asyncHandler(async (req, res, next) => {

  const { name, email, password,userName } = req.body;

  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return next(new ApiError(400,'All fields are required' ));
  }

  const userExists = await User.findOne({
    $or: [{ email }, { userName: userName.toLowerCase() }]
  })

  if (userExists) {
    return next(new ApiError(400,'Uer already exists' ));
  }

  const user = await User.create({ name, email, password, userName: userName.toLowerCase() });


  const createdUser = await User.findById(user._id).select('-password -refreshToken');

  if (!createdUser) {
    return next(new ApiError(500,'User not created'));
  }

  const tokens = await user.generateAccessAndRefreshToken();

  return res
    .cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path:'/api/users/refresh-token',
    })
    .cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    })
    .status(201)
    .json(new ApiResponse(201,{ user: createdUser }, 'User registered successfully'));

});

// 1. Get user credentials from the frontend
// 2. Validate user credentials (email & password )
// 3. Check if user exists (using email)
// 4. Compare the password using bcrypt
// 5. Generate tokens (JWT)
// 6. Remove the password and refreshToken from the response
// 7. Send the response to the user
const login = asyncHandler(async (req, res, next) => {

  const { email, password } = req.body;

  if (!email?.trim() || !password?.trim()) {
    return next(new ApiError(400,'All fields are required'));
  }

  const user = await User.findOne({ email });

  if (!user) return next(new ApiError(404, 'User not found'));

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) return next(new ApiError(401, 'Invalid credentials'));

  const tokens = await user.generateAccessAndRefreshToken();

  const userData = await User.findById(user._id).select(
    '-password -refreshToken -verifyOtp -verifyOtpExpireAt'
  );

  return res
    .cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path:'/api/users/refresh-token',
    })
    .cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    })
    .status(201)
    .json(new ApiResponse(201,{ user: userData }, 'User registered successfully'));
  

});

// Find the user
// 

const logout = asyncHandler(async (req,res,next) => {
  
  //await User.findByIdAndUpdate(req.user._id, { refreshToken: "" });

  return res 
  .clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path:'/api/users/refresh-token',
  })
  .clearCookie('accessToken', { 
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  })
  .status(200)
  .json(new ApiResponse(200, null, 'Logged out successfully'));
});

export {
  register,
  login,
  logout,
};
