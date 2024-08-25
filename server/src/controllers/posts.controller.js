/* eslint-disable no-restricted-globals */
import { postsService } from '@/services';
import { CustomError } from '@/utils';

const postsController = {
  async getPosts(req, res) {
    try {
      const { category, limit, page } = req.query;
      if (limit && isNaN(limit)) {
        throw new CustomError({
          status: 400,
          message: 'Limit should be a number',
        });
      }

      if (page && isNaN(page)) {
        throw new CustomError({
          status: 400,
          message: 'Page should be a number',
        });
      }

      const response = await postsService.getPosts({
        category,
        limit: limit ? parseInt(limit, 10) : null,
        page: page ? parseInt(page, 10) : null,
      });

      return res.status(200).send({
        status: 200,
        message: 'success',
        result: response || [],
      });
    } catch (error) {
      return res
        .status(error.status)
        .send({ status: error.status, message: error.message });
    }
  },
};

export default postsController;
