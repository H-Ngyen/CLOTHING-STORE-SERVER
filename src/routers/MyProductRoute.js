import express from 'express';
import { createMyProduct, updateMyProduct, deleteMyProductController } from '../controllers/MyProductController.js';
import multer from 'multer';
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

// api/my/product
router.post('/', upload.single('image'), createMyProduct);
router.put('/:id', upload.single('image'), updateMyProduct);
router.delete('/:id', deleteMyProductController);

export default router;