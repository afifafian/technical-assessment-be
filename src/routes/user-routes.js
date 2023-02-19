import express from 'express';
import { UserControllers } from '../controllers/user.js';

const router = express.Router();

router.post('/login', UserControllers.login);
router.post('/register', UserControllers.register);

export default router;
