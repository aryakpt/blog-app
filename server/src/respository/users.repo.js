import db from '@/config/db';
import { CustomError } from '@/utils';

const usersRepository = {
  async findOneByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [email], (err, data) => {
        if (err) {
          reject(new CustomError({ status: 500, message: err }));
        } else {
          resolve(data[0]);
        }
      });
    });
  },
  async insert({ name, email, password, phone, image, currentDateTime }) {
    const query =
      'INSERT INTO users (name, email, password, phone, image, created_at, updated_at) VALUES (?)';
    return new Promise((resolve, reject) => {
      db.query(
        query,
        [
          [
            name,
            email,
            password,
            phone,
            image,
            currentDateTime,
            currentDateTime,
          ],
        ],
        (err) => {
          if (err) {
            reject(new CustomError({ status: 500, message: err }));
          } else {
            resolve(true);
          }
        }
      );
    });
  },
};

export default usersRepository;
