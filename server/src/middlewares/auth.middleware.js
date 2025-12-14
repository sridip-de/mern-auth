import asyncHandler from "../utils/AsyncHandler";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import ApiError from "../utils/apiError.constructor";
import ERROR_MESSAGE from "../constants/errorMessage.constants";

const authMiddleware = asyncHandler(async (req, res, next) => {

  const token = req.cookies?.accessToken;
  
  const decoded = null;

  try {

    if (!token) throw new ApiError(401, ERROR_MESSAGE.AUTH.TOKEN_MISSING);
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);    
    
  } catch (error) {
    
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, ERROR_MESSAGE.AUTH.TOKEN_EXPIRED);
    }

    if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, ERROR_MESSAGE.AUTH.TOKEN_INVALID);
    }

    if (error.name === "NotBeforeError") {
      throw new ApiError(401, ERROR_MESSAGE.AUTH.TOKEN_INVALID);
    }

    throw new ApiError(401, ERROR_MESSAGE.AUTH.TOKEN_INVALID);
  }

  const user = await User.findById(decoded.id).select("-password -refreshToken");

  if (!user) throw new ApiError(401, ERROR_MESSAGE.AUTH.USER_NOT_FOUND);

  req.user = user;

  next();
})

// jwt.verify() doesn't return `null` or `undefined`
// it either ------
// 1. returns the decoded payload
// 2. throws an error if the token is invalid or expired

// That is why the check for `!decoded` is not correct apprach

// Why Extra Try-Catch ?
// >> Evnen though the asyncHandler will catch the error thrown by jwt.verify(),
// >> but to provide a more specific error message for token verification failures,
// >> we can wrap the jwt.verify() call in a try-catch block.
// >> This allows us to catch the specific error thrown by jwt.verify() and
// >> pass a more meaningful ApiError to the next middleware.
// >> This improves the clarity of the error handling in our authentication middleware.
// >> The jwt.verify() does not includes status code to its error and the Global Error Handler will push 500 code as a Fallback
// >> By catching the error here, we can provide a 401 Unauthorized status code instead,

export default authMiddleware;