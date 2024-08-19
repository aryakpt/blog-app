import db from '../config/db.js';
import {Router} from 'express';

export const usersRoutes = '/api/users';

const usersRouter = Router();

usersRouter.get('/', (req, res) => {
  const query = 'SELECT * from users';

  db.query(query, (err, data) => {
    console.log(data);

    return res.send(data);
  });
});

export default usersRouter;
