import userModel from '../models/userModel.js';
import userModel from '../models/userModel.js';
import asyncHandler from '../utils/AsyncHandler.js';
import ApiError from '../utils/apiError.constructor.js';
import ApiResponse from '../utils/apiResponse.constructor.js';
import ERROR_MESSAGE from '../constants/errorMessage.constants.js';

// Get user profile
const getUserProfile = asyncHandler(async (req, res, next) => {
  // Get the userId from req.user
  const userId = req.user._id;

  const user = await userModel.findById(userId).select('-password -refreshToken');
  // Check if userId exists
  if(!user) throw new ApiError(401,ERROR_MESSAGE.USER.NOT_FOUND);

  return res
    .status(200)
    .json(
      new ApiResponse(200,user)
    );
})

export default getUserProfile;