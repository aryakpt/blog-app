import { postsController } from '@/controllers';
import { Router } from 'express';

export const postsRoutes = '/api/posts';

const postsRouter = Router();

postsRouter.get('/', postsController.getPosts);

export default postsRouter;
