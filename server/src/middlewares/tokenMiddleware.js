import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const tokenMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader ? authHeader.split(' ')[1] : undefined;

  if (!token) return res.status(401).send({code: 401, message: 'Unauthorized'});
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send({code: 403, message: err});

    req.user = user;

    next();
  });
};

export default tokenMiddleware;
