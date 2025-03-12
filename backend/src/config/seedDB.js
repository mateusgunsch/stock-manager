const Product = require('../models/Product');

const seedProducts = async () => {
    try {
        await Product.deleteMany({}); // clear existing products
        const products = [
            { name: 'Product 1', price: 19.99, quantity: 10 },
            { name: 'Product 2', price: 9.99, quantity: 20 },
            { name: 'Product 3', price: 29.99, quantity: 5 },
            { name: 'Product 4', price: 14.99, quantity: 15 },
            { name: 'Product 5', price: 39.99, quantity: 8 },
        ];
        await Product.insertMany(products);
        console.log('Products seeded successfully');
    } catch (error) {
        console.error('Error seeding products:', error);
    }
};

module.exports = seedProducts;