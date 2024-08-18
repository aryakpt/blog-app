import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authUtil = {
  generateAccessToken(userId) {
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '1d'});
  },
};

export default authUtil;
