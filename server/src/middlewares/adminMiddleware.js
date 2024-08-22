import dotenv from 'dotenv';
import { Role } from '@/constants/enums';

dotenv.config();

// eslint-disable-next-line consistent-return
const adminMiddleware = (req, res, next) => {
  const { user } = req;

  if (!user || user.role !== Role.Admin) {
    return res
      .status(401)
      .send({ code: 401, message: 'Only admin have this access' });
  }

  next();
};

export default adminMiddleware;
