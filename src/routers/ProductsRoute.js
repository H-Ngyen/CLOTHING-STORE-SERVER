import express from 'express'
import { getProducts, getProductById } from '../controllers/ProductController.js';

const router = express.Router();

// api/product
router.get('/', getProducts)
router.get('/:id', getProductById)
export default router;