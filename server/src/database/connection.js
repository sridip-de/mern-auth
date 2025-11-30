import mongoose from 'mongoose';


const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    )
     console.log(
      `MongoDB Connected: ${connectionInstance.connection.host}`
    )
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
}

export default connectDB;