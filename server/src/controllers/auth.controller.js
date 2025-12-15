// Import asyncHandler to handle async errors
import asyncHandler from '../utils/AsyncHandler.js';
// import ApiError for custom error handling (not used in this snippet)
import ApiError from '../utils/apiError.constructor.js';
// Import ApiResponse for standardized API responses (not used in this snippet)
import ApiResponse from '../utils/apiResponse.constructor.js';
// Import User model
import User from '../models/userModel.js';
// Import transporter from nodemailer configuration
import transporter from '../configs/nodeMailer.config.js'
// Import cookie options 
import COOKIE_OPTIONS from '../constants/cookieOptions.constants.js';
// Import error messages
import ERROR_MESSAGE from '../constants/errorMessage.constants.js';
// Import generateOtp utility (not used in this snippet)
import generateOtp from '../utils/generateOtp.js';
// Import email service
import EMAIL_SERVICE from '../services/emailService.js';

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

  // Sending Welcome Message
  await EMAIL_SERVICE.sendWelcomeEmail(createdUser.email, createdUser.name);

  return res
    .cookie('refreshToken', tokens.refreshToken,COOKIE_OPTIONS.REFRESH_TOKEN_OPTIONS)
    .cookie('accessToken', tokens.accessToken,COOKIE_OPTIONS.ACCESS_TOKEN_OPTIONS)
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
    .cookie('refreshToken', tokens.refreshToken, COOKIE_OPTIONS.REFRESH_TOKEN_OPTIONS)
    .cookie('accessToken', tokens.accessToken, COOKIE_OPTIONS.ACCESS_TOKEN_OPTIONS)
    .status(201)
    .json(new ApiResponse(201,{ user: userData }, 'User registered successfully'));
  

});

// Find the user

const logout = asyncHandler(async (req,res,next) => {
  
  //await User.findByIdAndUpdate(req.user._id, { refreshToken: "" });

  return res 
  .clearCookie('refreshToken', COOKIE_OPTIONS.REFRESH_TOKEN_OPTIONS)
  .clearCookie('accessToken', COOKIE_OPTIONS.ACCESS_TOKEN_OPTIONS)
  .status(200)
  .json(new ApiResponse(200, null, 'Logged out successfully'));
});

// Send Verification OTP to the User's Email
const sendVerifyOtp = asyncHandler(async (req, res, next) => {

  const userId = req.user._id;

  const user = await User.findById(userId);
  // check wheather user is already verified
  if (user.isVerified) throw new ApiError(400, ERROR_MESSAGE.USER.EMAIL_ALREADY_VERIFIED);

  const otp = generateOtp();
  console.log(otp)

  user.verifyOtp = otp;
  user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000;

  await user.save();

  await EMAIL_SERVICE.sendVerificationEmail(user.email, user.verifyOtp, user.name);

  return res
    .status(200)
    .json(new ApiResponse(200, null, 'Verification OTP sent to your email'));
})

// Verify OTP and verify the user's email
const verifyOtp = asyncHandler(async (req, res, next) => {

  const userId = req.user._id;
  const { otp } = req.body;
  // check if otp is valid
  if (!otp?.trim() || otp.length !== 6) throw new ApiError(400, ERROR_MESSAGE.OTP.INVALID_OTP); 
  
  const user = await User.findById(userId);
  // check is user exists
  if (!user) throw new ApiError(404, ERROR_MESSAGE.USER.NOT_FOUND);
  // check if user already verified
  if(user.isVerified) throw new ApiError(400, ERROR_MESSAGE.USER.EMAIL_ALREADY_VERIFIED);
  // Match the OTP
  if (user.verifyOtp !== otp) throw new ApiError(400, ERROR_MESSAGE.OTP.INVALID_OTP);
  // Check if OTP is expired
  if (user.verifyOtpExpireAt < Date.now()) throw new ApiError(400, ERROR_MESSAGE.OTP.OTP_EXPIRED);

  user.isAccountVerified = true;
  user.verifyOtp = null;
  user.verifyOtpExpireAt = 0;

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Email verified successfully"));


})

export {
  register,
  login,
  logout,
  sendVerifyOtp,
  verifyOtp,
};
