const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB conectado!');
    } catch (error) {
        console.error('Erro na conexão com MongoDB', error);
        process.exit(1);
    }
};

module.exports = connectDB;