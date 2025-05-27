const mongooose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const dbConfig = {
    url: process.env.DB_URL || 'mongodb://localhost:27017/bookstore',
};
const connectDB = async () => {
    try {
        await mongooose.connect(dbConfig.url);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
};
module.exports = {
    connectDB,
    dbConfig
};