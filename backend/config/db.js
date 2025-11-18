// backend/config/db.js

const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        // IMPORTANT: Replace this with your actual MongoDB connection string!
        const MONGO_URI = process.env.MONGO_URI; 
        const conn = await mongoose.connect(MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;