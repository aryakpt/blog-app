import { categoriesService } from '@/services';
import { CustomError } from '@/utils';

const categoriesController = {
  async getCategories(req, res) {
    try {
      const response = await categoriesService.getCategories();
      return res.status(response.status).send(response);
    } catch (error) {
      return res
        .status(error.status)
        .send({ status: error.status, message: error.message });
    }
  },
  async getCategory(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const response = await categoriesService.getCategory(parseInt(id, 10));
      return res.status(response.status).send(response);
    } catch (error) {
      return res
        .status(error.status)
        .send({ status: error.status, message: error.message });
    }
  },
  async createCategory(req, res) {
    try {
      const {
        user,
        body: { name, image },
      } = req;

      if (!name) {
        throw new CustomError({ status: 400, message: 'Name cannot be empty' });
      }

      const response = await categoriesService.createCategory({
        user,
        name,
        image,
      });

      return res.status(response.status).send(response);
    } catch (error) {
      return res
        .status(error.status)
        .send({ status: error.status, message: error.message });
    }
  },
  async updateCategory(req, res) {
    try {
      const {
        params: { id },
        body: { name, image },
      } = req;

      if (!name) {
        throw new CustomError({ status: 400, message: 'Name cannot be empty' });
      }

      const response = await categoriesService.updateCategory({
        id,
        name,
        image,
      });
      return res.status(response.status).send(response);
    } catch (error) {
      return res
        .status(error.status)
        .send({ status: error.status, message: error.message });
    }
  },
  async deleteCategory(req, res) {
    try {
      const {
        params: { id },
      } = req;

      const response = await categoriesService.deleteCategory({
        id: parseInt(id, 10),
      });

      return res.status(response.status).send(response);
    } catch (error) {
      return res
        .status(error.status)
        .send({ status: error.status, message: error.message });
    }
  },
};

export default categoriesController;
