const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const productRoutes = require('./src/routes/productRoutes');


dotenv.config();

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options("*", cors());

app.use(express.json());

app.get("/api/test", async (req, res) => {
    try {
        await connectDB();
        res.json({ message: "Backend is working!" })
    } catch (error) {
        res.status(500).json({ error: "Database connection failed", details: error.message })
    }
})

app.use('/api/products', 
    async (req, res, next) => {
        try {
            await connectDB();
            next();
        } catch (error) {
            res.status(500).json({ error: "Database connection failed", details: error.message })
        }
    },
    productRoutes
);

app.use((req, res) => {
    res.status(404).json({ error: "Not Found", path: req.path })
})

// seedProducts();

// For local development
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

module.exports = app;