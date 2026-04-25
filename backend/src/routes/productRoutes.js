const express = require('express');
const {
  getProducts,
  getFeaturedProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleActive
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const { uploadArray } = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:slug', getProductBySlug);

router.post('/', protect, admin, uploadArray('images', 5), createProduct);
router.put('/:id', protect, admin, uploadArray('images', 5), updateProduct);
router.delete('/:id', protect, admin, deleteProduct);
router.patch('/:id/toggle-active', protect, admin, toggleActive);

module.exports = router;

