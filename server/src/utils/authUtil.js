import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authUtil = {
  generateAccessToken({ userId, name, email, role }) {
    return jwt.sign({ userId, name, email, role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  },
};

export default authUtil;
