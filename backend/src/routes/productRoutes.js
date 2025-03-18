const express = require('express');
const router = express.Router();
const { getProducts, createProduct, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

router.put('/:id', authMiddleware, updateProduct);
router.get('/:id', getProductById);
router.get('/', getProducts);
router.post('/', authMiddleware, createProduct);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;