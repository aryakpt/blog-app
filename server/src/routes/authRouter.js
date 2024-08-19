import {Router} from 'express';
import {authController} from '../controllers/index.js';

export const authRoutes = '/api/auth';

const authRouter = Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

export default authRouter;
