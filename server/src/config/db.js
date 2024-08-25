import mysql from 'mysql2';
import config from './config';

const db = mysql.createPool(config.db);

export const connectDB = async () => {
  db.getConnection((err, connection) => {
    if (err) {
      console.log({ error: err.message });
    }

    console.log('Connected to MySQL database');
    connection.release();
  });
};

export default db;
