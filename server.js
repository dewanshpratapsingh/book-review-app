require('dotenv').config();
const app = require('./app');
const PORT = process.env.PORT || 3000;
const dbConfig = require('./config/db.config');

async function startServerDependencies(){
    try {
        // Initialize database connection
        dbConfig.connectDB();
        console.log('Database initialized successfully');
        // Initialize Redis connection
    
        // Initialize ElasticSearch connection
    
        console.log('All dependencies initialized successfully');
    } catch (error) {
        console.error('Error initializing dependencies:', error);
        process.exit(1);
    }
}

startServerDependencies().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});