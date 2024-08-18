import {Router} from 'express';

export const postsRoutes = '/api/posts';

const postsRouter = Router();

postsRouter.post('/', (req, res) => {
  res.sendStatus(200);
});
postsRouter.post('/login', (req, res) => {
  res.json('posts');
});
postsRouter.post('/login', (req, res) => {
  res.json('posts');
});

export default postsRouter;
