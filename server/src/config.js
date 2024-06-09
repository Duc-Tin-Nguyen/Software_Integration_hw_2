// src/config.js
const dotenv = require('dotenv');
const path = require('path');

// Determine the current environment
const env = process.env.NODE_ENV || 'development';
const envFilePath = path.resolve(__dirname, `./${env}.env`);

// Load environment variables from the stage-specific .env file
const result = dotenv.config({ path: envFilePath });

if (result.error) {
    throw result.error;
}

// Export the parsed environment variables
module.exports = {
    mongoURI: process.env.MONGO_URI,
    port: process.env.PORT || 3000,
};
