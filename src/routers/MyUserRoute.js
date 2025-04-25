import express from 'express'
import { Login, Register } from '../controllers/MyUserController.js';

const router = express.Router();

// api/my/user
router.post('/login', Login)
router.post('/register', Register)

export default router;//