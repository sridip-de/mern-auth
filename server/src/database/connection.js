import mongoose from 'mongoose';


const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    )
     console.error(
      `MongoDB Connected: ${connectionInstance.connection.host}`
    )
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
}

export default connectDB;