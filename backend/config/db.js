// backend/config/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // IMPORTANT: Replace this with your actual MongoDB connection string!
        const MONGO_URI = 'mongodb+srv://atulsingh04895_db_user:NaQewJonwEPThtSj@cluster0.c3mz75w.mongodb.net/?appName=Cluster0'; 

        const conn = await mongoose.connect(MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;