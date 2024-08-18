import {Router} from 'express';
import {authController} from '../controllers/index.js';

export const authRoutes = '/api/auth';

const authRouter = Router();

authRouter.post('/register', authController.register);
authRouter.get('/login', authController.login);
authRouter.post('/logout', authController.logout);

export default authRouter;
