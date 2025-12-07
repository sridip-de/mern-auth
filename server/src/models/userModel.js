import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name:{type: String, required: true},
  email:{type: String, required: true, unique: true},
  password:{type: String, required: true},
  verifyOtp:{type: String, default:""},
  verifyOtpExpireAt:{type: Number, default:0},
  isAccauntVerified:{type: Boolean, default:false},
})

const userModel = mongoose.models.user || mongoose.model("user", userSchema); 
// to prevent model overwrite issue in watch mode
// mongoose.models contains all the registered models in cashe memory 
// we check if the model already exists before creating a new one
// if it exists we use the existing model from mongoose.models
// otherwise we create a new model using mongoose.model()
// This is particularly useful in development environments where files may be reloaded frequently
// preventing errors related to model redefinition.


export default userModel;