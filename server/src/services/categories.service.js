import { categoriesRepository } from '@/respository';
import { CustomError } from '@/utils';
import dayjs from 'dayjs';

const categoriesService = {
  async getCategories() {
    try {
      const categories = await categoriesRepository.findAll();
      const result = {
        status: 200,
        message: 'success',
        result: categories || [],
      };
      return result;
    } catch (error) {
      throw error;
    }
  },
  async getCategory(id) {
    try {
      const category = await categoriesRepository.findById(id);
      if (!category) {
        throw new CustomError({ status: 404, message: 'Category not found' });
      }
      const result = {
        status: 200,
        message: 'success',
        result: category,
      };
      return result;
    } catch (error) {
      throw error;
    }
  },
  async createCategory({ name, image }) {
    try {
      const category = await categoriesRepository.findByName(name);
      if (category) {
        throw new CustomError({
          status: 400,
          message: 'Category already exist!',
        });
      }

      const currentDateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');

      const body = {
        name,
        image,
        createdAt: currentDateTime,
        updatedAt: currentDateTime,
      };

      await categoriesRepository.insert(body);
      return { status: 201, message: 'Category has been created!' };
    } catch (error) {
      throw error;
    }
  },
  async updateCategory({ id, name, image }) {
    try {
      const currentDateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');

      await this.getCategory(id);
      await categoriesRepository.update({
        id: parseInt(id, 10),
        name,
        image,
        updatedAt: currentDateTime,
      });
      return { status: 200, message: 'Category has been updated!' };
    } catch (error) {
      throw error;
    }
  },
  async deleteCategory({ id }) {
    try {
      await this.getCategory(id);
      await categoriesRepository.delete(id);
      return { status: 200, message: 'Category has been deleted!' };
    } catch (error) {
      throw error;
    }
  },
};

export default categoriesService;
