import db from '@/config/db';
import { CustomError } from '@/utils';

const usersRepository = {
  async findOneByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [email], (err, data) => {
        if (err) {
          reject(new CustomError({ status: 500, message: err.message }));
        } else {
          resolve(data[0]);
        }
      });
    });
  },
  async insert({
    name,
    email,
    password,
    phone,
    image,
    role,
    createdAt,
    updatedAt,
  }) {
    const query =
      'INSERT INTO users (name, email, password, phone, image, role, created_at, updated_at) VALUES (?)';
    return new Promise((resolve, reject) => {
      db.query(
        query,
        [[name, email, password, phone, image, role, createdAt, updatedAt]],
        (err) => {
          if (err) {
            reject(new CustomError({ status: 500, message: err.message }));
          } else {
            resolve(true);
          }
        }
      );
    });
  },
};

export default usersRepository;
