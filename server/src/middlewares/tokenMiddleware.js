import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line consistent-return
const tokenMiddleware = (req, res, next) => {
  // eslint-disable-next-line dot-notation
  const authHeader = req.headers['authorization'];
  const token = authHeader ? authHeader.split(' ')[1] : undefined;
  if (!token) {
    return res.status(401).send({ code: 401, message: 'Unauthorized' });
  }

  // eslint-disable-next-line consistent-return
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send({ code: 403, message: err.message });

    req.user = user;

    next();
  });
};

export default tokenMiddleware;
