import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';

const userSchema = new mongoose.Schema({
  name:{type: String, required: true},
  email:{type: String, required: true, unique: true},
  password:{type: String, required: true},
  verifyOtp:{type: String, default:""},
  verifyOtpExpireAt:{type: Number, default:0},
  isAccountVerified:{type: Boolean, default:false},
  refreshToken: {type: String, default:""},
})

// Middlewares
userSchema.pre('save', async function (next) {
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

// Methods
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
}

userSchema.methods.getAccessToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_LIFE }
  )
}

userSchema.methods.getRefreshToken = function () {
  return jwt.sign(
    { _id: this._id,},
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_LIFE}
  )
}

userSchema.methods.generateAccessAndRefreshToken = async function () {
  try {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
  
    this.refreshToken = refreshToken;
    await this.save({validateBeforeSave: false});
    
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500,"Token Generation Failed");
  }
}


const userModel = mongoose.models.user || mongoose.model("user", userSchema); 
// to prevent model overwrite issue in watch mode
// mongoose.models contains all the registered models in cashe memory 
// we check if the model already exists before creating a new one
// if it exists we use the existing model from mongoose.models
// otherwise we create a new model using mongoose.model()
// This is particularly useful in development environments where files may be reloaded frequently
// preventing errors related to model redefinition.


export default userModel;