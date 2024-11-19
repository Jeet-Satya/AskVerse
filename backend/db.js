const mongoose = require('mongoose');
require('dotenv').config(); // Ensure environment variables are loaded

const mongoURI = process.env.MONGO_URI;

const connectToMongo = () => {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,   // Use the new URL parser to avoid deprecation warnings
        useUnifiedTopology: true // Use the new Server Discover and Monitoring engine
    })
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch(err => {
        console.error("Failed to connect to MongoDB", err);
        // Optional: Implement retry logic here if needed
    });
};

// Optional: Handle MongoDB connection events
mongoose.connection.on('connected', () => {
    console.log('MongoDB connection established');
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB connection disconnected');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

module.exports = connectToMongo;
