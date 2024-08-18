import bcryptjs from 'bcryptjs';
import db from '../config/db.js';

const authController = {
  register(req, res) {
    const {email, username, password} = req.body;
    const query = 'SELECT * FROM users WHERE email = ? OR username = ?';
    db.query(query, [email, username], (err, data) => {
      if (err) res.json(err);
      if (data.length) return res.status(403).json({status: 403, message: 'User already exists!'});

      const salt = bcryptjs.genSaltSync(10);
      const hashedPassword = bcryptjs.hashSync(password, salt);

      const query = 'INSERT INTO users (email, username, password) VALUES (?)';
      db.query(query, [[email, username, hashedPassword]], (err, data) => {
        if (err) res.json(err);
        return res.status(200).json({status: 200, message: 'User has been created!'});
      });
    });
  },
  login(req, res) {
    const {username, password} = req.body;
    if (!username || !password) {
      return res.status(400).json({error: 'Username or Password fields cannot be empty!'});
    }

    const query = 'SELECT * FROM users WHERE username = ? OR password = ?';
    db.query(query, [username, username], (err, data) => {
      if (err) return res.send(err);
      if (!data.length) return res.status(404).send({status: 404, message: 'User not exist!'});
    });
    return res.send({username, password, query});
  },
  logout(req, res) {},
};

export default authController;
