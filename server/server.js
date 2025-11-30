import 'dotenv/config';
import app from './app.js';
import connectDB from './src/database/connection.js';
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB()
  .then(() => {
    // Start the server only after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });