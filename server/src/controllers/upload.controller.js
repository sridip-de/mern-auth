import ApiError from "../utils/apiError.constructor.js";
import ErrorCodes from "../constants/errorCode.constants.js";
import asyncHandler from "../utils/AsyncHandler.js"
import uploadFromBuffer from "../configs/cloudinary.config.js";
import ApiResponse from "../utils/apiResponse.constructor.js";
import User from "../models/userModel.js";

export const uploadImage = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!req.file) throw new ApiError(ErrorCodes.INVALID_INPUT);

  const result = await uploadFromBuffer(req.file.buffer);

  if (!result) throw new ApiError(ErrorCodes.INTERNAL_SERVER_ERROR);

  const user = await User.findById(userId);

  if (!user) throw new ApiError(ErrorCodes.INTERNAL_SERVER_ERROR);

  // Filtter sensitive data
  const safeData = {
    public_id: result.pulic_id,
    url: result.secure_url,
    width: result.width,
    height: result.height,
    format: result.format,
    bytes: result.bytes,
    created_at: result.created_at
  }

  user.picture = safeData;

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, safeData, 'Image uploaded successfully!'))
});

// NOTE
// Because the global asyncHandler is Promise.resolve(); already resolved , means it is not going to a pending state and any child Promise inside it can not block stop the further execution of the parrent Promise block;
// so we need to wait ot stop the code execution in uploadFromBuffer line until result is returned;
// that is way awit is usefull here cause await expects a promise pending/resolved
// when promise returns with a pending state await stops the further execution in async block 
// node starts remaining execution ouside of async block;
