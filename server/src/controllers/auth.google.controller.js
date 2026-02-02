import COOKIE_OPTIONS from "../constants/cookieOptions.constants.js";
import User from '../models/userModel.js';
import ApiError from "../utils/apiError.constructor.js";
import asyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/apiResponse.constructor.js";

const handleGoogleCallback = asyncHandler(async (req, res, next) => {
  const googleUser = req.user;

  //console.log(googleUser)
  // 1. Find or create user in db
  let user = await User.findOne({email: googleUser.emails[0].value});

  if(!user) {
    user = await User.create({
      email:googleUser.emails[0].value,
      name: googleUser.displayName,
      password: 'google-auth',
      authProvider:'google',
      isEmailVerified:true,
      picture: googleUser.photos[0].value,
    })
  } else {
    // Make sure existed user info is upto date with google
    if(googleUser.displayName) user.name = googleUser.displayName;
    if(googleUser.photos?.[0]?.value) user.picture = googleUser.photos[0].value;

    await user.save();
  }

  // 2. Generate tokens (same logic as normal login)
  const tokens = await user.generateAccessAndRefreshToken();

  // 3. Set Cookies
  res
    .cookie('accessToken',tokens.accessToken, COOKIE_OPTIONS.ACCESS_TOKEN_OPTIONS )
    .cookie('refreshToken', tokens.refreshToken, COOKIE_OPTIONS.REFRESH_TOKEN_OPTIONS)
    .redirect('http://localhost:5173/')
});

export {
  handleGoogleCallback,
}