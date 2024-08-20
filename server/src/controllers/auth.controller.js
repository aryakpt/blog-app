import { authService } from '@/services';
import { CustomError } from '@/utils/errorUtil';

const authController = {
  async register(req, res) {
    try {
      const { name, email, password, phone = null, image = null } = req.body;
      if (!email)
        throw new CustomError({
          status: 400,
          message: 'Email cannot be empty!',
        });
      if (!name)
        throw new CustomError({
          status: 400,
          message: 'Name cannot be empty!',
        });
      if (!password)
        throw new CustomError({
          status: 400,
          message: 'Password cannot be empty!',
        });
      const result = await authService.register({
        name,
        email,
        password,
        phone,
        image,
      });
      return res.status(result.status).send(result);
    } catch (error) {
      return res
        .status(error.status)
        .send({ status: error.status, message: error.message });
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new CustomError({
          status: 400,
          message: 'Username or Password fields cannot be empty!',
        });
      }
      const result = await authService.login({ email, password });
      return res.status(result.status).send(result);
    } catch (error) {
      return res
        .status(error.status)
        .send({ status: error.status, message: error.message });
    }
  },
};

export default authController;
