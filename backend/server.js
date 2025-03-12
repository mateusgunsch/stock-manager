const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const productRoutes = require('./src/routes/productRoutes');
const seedProducts = require('./src/config/seedProducts');
const Product = require('./src/models/Product');


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/products', productRoutes);

// seedProducts();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));