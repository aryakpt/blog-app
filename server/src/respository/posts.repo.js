import db from '@/config/db';
import { CustomError } from '@/utils';

const postsRepository = {
  async findByCategory({ category, limit, page }) {
    const params = [];
    let query = 'SELECT * FROM posts ';
    if (category) {
      query += 'WHERE category_id=? ';
      params.push(category);
    }
    if (limit) {
      query += 'LIMIT ?';
      params.push(limit);
    }

    if (limit && page) {
      const offset = (page - 1) * limit;
      query += ' OFFSET ?';
      params.push(offset);
    }

    return new Promise((resolve, reject) => {
      db.query(query, params, (err, data) => {
        if (err) {
          reject(new CustomError({ status: 500, message: err.message }));
        } else {
          resolve(data);
        }
      });
    });
  },
};

export default postsRepository;
