import { Router } from 'express';

export const postsRoutes = '/api/posts';

const postsRouter = Router();

postsRouter.get('/', (req, res) => {
  res.sendStatus(200);
});

export default postsRouter;
