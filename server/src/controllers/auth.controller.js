// Import asyncHandler to handle async errors
import asyncHandler from '../utils/AsyncHandler.js';
// import ApiError for custom error handling (not used in this snippet)
import ApiError from '../utils/apiError.constructor.js';
// Import ApiResponse for standardized API responses (not used in this snippet)
import ApiResponse from '../utils/apiResponse.constructor.js';
// Import User model
import User from '../models/userModel.js';
// Import transporter from nodemailer configuration
import COOKIE_OPTIONS from '../constants/cookieOptions.constants.js';
// Import error messages
import ERROR_MESSAGE from '../constants/errorMessage.constants.js';
// Import entralized Error codes and messages
import ErrorCodes from '../constants/errorCode.constants.js';
// Import generateOtp utility (not used in this snippet)
import generateOtp from '../utils/generateOtp.js';
// Import email service
import EMAIL_SERVICE from '../services/emailService.js';
// Import JWT
import jwt from 'jsonwebtoken';

// get user details form the forntend
// validate user credentials (email & password )
// check if user exists (using email or username)
// encrypt the pssword using bcrypt
// save the user in the database
// generate tokens (JWT)
// remove the password and refreshToken from the response
// send the response to the user

const register = asyncHandler(async (req, res, next) => {

  const { name, email, password, userName } = req.body;

  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return next(new ApiError(ErrorCodes.MISSING_FIELDS));
  }

  const userExists = await User.findOne({
    $or: [{ email }, { userName: userName.toLowerCase() }]
  })

  if (userExists) {
    return next(new ApiError(ErrorCodes.USER_ALREADY_EXISTS));
  }

  const user = await User.create({ name, email, password, userName: userName.toLowerCase() });


  const createdUser = await User.findById(user._id).select('-password -refreshToken');

  if (!createdUser) {
    return next(new ApiError(ErrorCodes.DATABASE_ERROR));
  }

  const tokens = await user.generateAccessAndRefreshToken();

  // Sending Welcome Message
  // We need to learn mongodb transaction and repoica set
  // Or most modern pattern create use immediately and fire the email in background.
  // Ot use a queue like BullMQ
  //const emailRes = await EMAIL_SERVICE.sendWelcomeEmail(createdUser.email, createdUser.name);


  return res
    .cookie('refreshToken', tokens.refreshToken, COOKIE_OPTIONS.REFRESH_TOKEN_OPTIONS)
    .cookie('accessToken', tokens.accessToken, COOKIE_OPTIONS.ACCESS_TOKEN_OPTIONS)
    .status(201)
    .json(new ApiResponse(201, { user: createdUser }, 'User registered successfully'));

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

  // This part have to be improved with a proper zod library
  if (!email?.trim() || !password?.trim()) {
    return next(new ApiError(ErrorCodes.MISSING_FIELDS,
      null, [
      !email?.trim() ? { email: 'Please Enter Email' } : { password: 'Please enter password' }
    ]));
  }

  const user = await User.findOne({ email });

  if (!user) return next(new ApiError(ErrorCodes.USER_NOT_FOUND, null, [{ email: 'User not found' }]));

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) return next(new ApiError(ErrorCodes.INVALID_CREDENTIALS, null, [{
    email: 'email or password is incorrect',
    password: 'email or password is incorrect'
  }]));

  const tokens = await user.generateAccessAndRefreshToken();

  const userData = await User.findById(user._id).select(
    '-password -refreshToken -verifyOtp -verifyOtpExpireAt'
  );

  return res
    .cookie('refreshToken', tokens.refreshToken, COOKIE_OPTIONS.REFRESH_TOKEN_OPTIONS)
    .cookie('accessToken', tokens.accessToken, COOKIE_OPTIONS.ACCESS_TOKEN_OPTIONS)
    .status(201)
    .json(new ApiResponse(201, { user: userData }, 'Login successful'));


});

// Refresh Access Token using Refresh Token
const refreshAccessToken = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return next(new ApiError(401, ERROR_MESSAGE.AUTH.TOKEN_MISSING));
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    return next(new ApiError(401, ERROR_MESSAGE.AUTH.TOKEN_INVALID));
  }

  const user = await User.findById(decoded._id);
  if (!user || user.refreshToken !== refreshToken) {
    return next(new ApiError(401, ERROR_MESSAGE.AUTH.TOKEN_INVALID));
  }

  const tokens = await user.generateAccessAndRefreshToken();

  return res
    .cookie('refreshToken', tokens.refreshToken, COOKIE_OPTIONS.REFRESH_TOKEN_OPTIONS)
    .cookie('accessToken', tokens.accessToken, COOKIE_OPTIONS.ACCESS_TOKEN_OPTIONS)
    .status(200)
    .json(new ApiResponse(200, {}, 'Token refreshed successfully'));
});

// Find the user

const logout = asyncHandler(async (req, res, next) => {

  await User.findByIdAndUpdate(req.user._id, { refreshToken: "" });

  return res
    .clearCookie('refreshToken', COOKIE_OPTIONS.REFRESH_TOKEN_OPTIONS)
    .clearCookie('accessToken', COOKIE_OPTIONS.ACCESS_TOKEN_OPTIONS)
    .status(200)
    .json(new ApiResponse(200, null, 'Logged out successfully'));
});

const verifyAuth = asyncHandler(async (req, res, next) => {
  const user = req.user;

  if (!user._id) throw new ApiError(401, ERROR_MESSAGE.AUTH.UNAUTHORIZED);

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User is authenticated"))

})

// Send Verification OTP to the User's Email
const sendVerifyOtp = asyncHandler(async (req, res, next) => {

  const userId = req.user._id;

  const user = await User.findById(userId);
  // check wheather user is already verified
  if (user.isVerified) throw new ApiError(ErrorCodes.EMAIL_ALREADY_VERIFIED);

  const otp = generateOtp();

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

  ////console.log(req.body)

  // check if otp is valid
  if (!otp || !/^\d{6}$/.test(otp)) throw new ApiError(400, ERROR_MESSAGE.OTP.INVALID_OTP);

  const user = await User.findById(userId);
  // check is user exists
  if (!user) throw new ApiError(404, ERROR_MESSAGE.USER.NOT_FOUND);
  // check if user already verified
  if (user.isAccountVerified) throw new ApiError(400, ERROR_MESSAGE.USER.EMAIL_ALREADY_VERIFIED);

  ////console.log('Client OTP:', otp)
  ////console.log('DataBase OTP:', user.verifyOtp)

  // Match the OTP
  if (user.verifyOtp !== otp) throw new ApiError(400, ERROR_MESSAGE.OTP.WRONG_OTP);
  // Check if OTP is expired
  if (user.verifyOtpExpireAt < Date.now()) throw new ApiError(400, ERROR_MESSAGE.OTP.OTP_EXPIRED);

  user.isAccountVerified = true;
  user.verifyOtp = null;
  user.verifyOtpExpireAt = 0;

  await user.save();

  await EMAIL_SERVICE.sendEmailVerifiedConfirmation(user.email, user.name)

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Email verified successfully"));


})

// Send Password Reset OTP to the User's Email
const sendPasswordResetOtp = asyncHandler(async (req, res, next) => {

})

// Reset Password route
const resetOtp = asyncHandler(async (req, res, next) => {

})

export {
  register,
  login,
  logout,
  refreshAccessToken,
  sendVerifyOtp,
  verifyOtp,
  verifyAuth,
};
