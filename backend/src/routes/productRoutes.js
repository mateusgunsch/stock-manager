const express = require('express');
const router = express.Router();
const { getProducts, createProduct, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');

router.put('/:id', updateProduct);
router.get('/:id', getProductById);
router.get('/', getProducts);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);

module.exports = router;