import {Router} from 'express';

export const usersRoutes = '/api/users';

const usersRouter = Router();

usersRouter.get('/', (req, res) => {
  return res.send('users');
});

export default usersRouter;
