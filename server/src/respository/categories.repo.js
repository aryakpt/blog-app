import { CustomError } from '@/utils';
import db from '@/config/db';

const categoriesRepository = {
  async findAll() {
    const query = 'SELECT * FROM categories';
    return new Promise((resolve, reject) => {
      db.query(query, [], (err, data) => {
        if (err) reject(new CustomError({ status: 500, message: err.message }));
        else resolve(data);
      });
    });
  },
  async findById(id) {
    const query = 'SELECT * FROM categories WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, data) => {
        if (err) reject(new CustomError({ status: 500, message: err.message }));
        else resolve(data[0]);
      });
    });
  },
  async findByName(name) {
    const query = 'SELECT * FROM categories WHERE name = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [name], (err, data) => {
        if (err) reject(new CustomError({ status: 500, message: err.message }));
        else resolve(data[0]);
      });
    });
  },
  async insert({ name, image, createdAt, updatedAt }) {
    const query =
      'INSERT INTO categories (name, image, created_at, updated_at) VALUES (?)';
    return new Promise((resolve, reject) => {
      db.query(query, [[name, image, createdAt, updatedAt]], (err) => {
        if (err) reject(new CustomError({ status: 500, message: err.message }));
        else resolve(true);
      });
    });
  },
  async update({ id, name, image, updatedAt }) {
    let query = 'UPDATE categories SET name = ?, updated_at = ?';
    const params = [name, updatedAt];

    if (image) {
      query += ', image = ?';
      params.push(image);
    }

    query += ' WHERE id = ?';
    params.push(id);

    return new Promise((resolve, reject) => {
      db.query(query, params, (err) => {
        if (err) {
          return reject(new CustomError({ status: 500, message: err.message }));
        }
        return resolve(true);
      });
    });
  },
  async delete(id) {
    const query = 'DELETE FROM categories where id = ?';
    try {
      await new Promise((resolve, reject) => {
        db.query(query, [id], (err) => {
          if (err)
            return reject(
              new CustomError({ status: 500, message: err.message })
            );
          return resolve(true);
        });
      });
      return true; // Optional, depends on what you need to return
    } catch (err) {
      throw new CustomError({ status: 500, message: err.message }); // Ensure the error propagates correctly
    }
  },
};

export default categoriesRepository;
