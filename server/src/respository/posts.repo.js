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
  async findAll({ category, limit, page }) {
    const params = [];
    let query =
      'SELECT p.*, u.name as user_name, u.image as user_image, c.name as category_name, c.image as category_image FROM posts as p JOIN users as u ON p.user_id=u.id JOIN categories as c ON p.category_id=c.id ';
    if (category) {
      query += 'WHERE category_id=? ';
      params.push(category);
    }

    query += 'ORDER BY p.updated_at DESC ';

    if (limit) {
      query += 'LIMIT ? ';
      params.push(limit);
    }

    if (limit && page) {
      const offset = (page - 1) * limit;
      query += 'OFFSET ?';
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
