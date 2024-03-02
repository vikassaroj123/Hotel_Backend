const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Mongoose connected to ${MONGO_URL}`);
}).catch((error) => {
    console.error('Mongoose initial connection error:', error);
});

mongoose.connection.on('error', (error) => {
    console.error('Mongoose connection error:', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    } catch (error) {
        console.error('Error while closing Mongoose connection:', error);
        process.exit(1);
    }
});

module.exports = mongoose;