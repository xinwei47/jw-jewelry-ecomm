import express from 'express';
const router = express.Router();

import {
  getSingleProduct,
  getProducts,
  getCategories,
} from '../controllers/productControllers.js';

router.route('/categories').get(getCategories);
router.route('/products/:productName/:productId').get(getSingleProduct);
router.route('/:category').get(getProducts);

export default router;
