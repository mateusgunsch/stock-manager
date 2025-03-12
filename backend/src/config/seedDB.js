const Product = require('../models/Product');

const seedProducts = async () => {
    try {
        await Product.deleteMany({}); // clear existing products
        const products = [
            { name: 'Product 1', price: 19.99, quantity: 10, description: 'Description for Product 1' },
            { name: 'Product 2', price: 9.99, quantity: 20, description: 'Description for Product 2' },
            { name: 'Product 3', price: 29.99, quantity: 5, description: 'Description for Product 3' },
            { name: 'Product 4', price: 14.99, quantity: 15, description: 'Description for Product 4' },
            { name: 'Product 5', price: 39.99, quantity: 8, description: 'Description for Product 5' },
        ];
        await Product.insertMany(products);
        console.log('Products seeded successfully');
    } catch (error) {
        console.error('Error seeding products:', error);
    }
};

module.exports = seedProducts;