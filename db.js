const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/inotebook"; // Update this to your MongoDB URI

const connectToMongo = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(mongoURI); // Removed deprecated options
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err); // Print detailed error
    process.exit(1); // Exit the app if the connection fails
  }
};

module.exports = connectToMongo;
