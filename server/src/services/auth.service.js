import dayjs from 'dayjs';
import bcryptjs from 'bcryptjs';
import { usersRepository } from '@/respository';
import { authUtil, CustomError } from '@/utils';
import { Role } from '@/constants/enums';

const authService = {
  async register({ name, email, password, phone, image }) {
    try {
      const user = await usersRepository.findOneByEmail(email);
      if (user) {
        throw new CustomError({ status: 400, message: `User already exist` });
      }
      const currentDateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
      const salt = bcryptjs.genSaltSync(10);
      const hashedPassword = bcryptjs.hashSync(password, salt);
      const payload = {
        name,
        email,
        password: hashedPassword,
        phone,
        image,
        role: Role.Author,
        createdAt: currentDateTime,
        updatedAt: currentDateTime,
      };
      await usersRepository.insert(payload);
      return { status: 201, message: 'User has been created!' };
    } catch (err) {
      throw err;
    }
  },
  async login({ email, password }) {
    try {
      const user = await usersRepository.findOneByEmail(email);
      if (!user)
        throw new CustomError({ status: 404, message: `User not exist!` });

      const generatedToken = authUtil.generateAccessToken({
        userId: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
      });

      const isPasswordCorrect = await bcryptjs.compare(password, user.password);
      if (!isPasswordCorrect)
        throw new CustomError({
          status: 400,
          message: `username or password incorrect!`,
        });
      return {
        status: 200,
        message: 'User logged in!',
        result: { token: generatedToken },
      };
    } catch (err) {
      throw err;
    }
  },
};

export default authService;
