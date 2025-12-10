import mongoose from 'mongoose';


const connectDB = async () => {
  try {
    
    mongoose.connection.on('connecting', () => {
      console.log('Connecting to MongoDB...');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    })
    
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connection established successfully.');
    });

    //mongoose.connect(uri, options);
    const connectionInstance = await mongoose.connect(
      process.env.MONGODB_URI,
      { dbName: process.env.DB_NAME}
    )

    //console.log(`MongoDB Connected: ${connectionInstance.connection.host}`)

  } catch (error) {
    console.error (`MongoDB Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
}

export default connectDB;