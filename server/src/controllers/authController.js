import dayjs from 'dayjs';
import bcryptjs from 'bcryptjs';
import db from '../config/db.js';
import authUtil from '../utils/authUtil.js';

const authController = {
  register(req, res) {
    const {email, username, password} = req.body;
    if (!email) return res.status(400).send({status: 400, message: 'email cannot be empty'});
    if (!username) return res.status(400).send({status: 400, message: 'username cannot be empty'});
    if (!password) return res.status(400).send({status: 400, message: 'password cannot be empty'});

    const query = 'SELECT * FROM users WHERE email = ? OR username = ?';
    db.query(query, [email, username], (err, data) => {
      if (err) res.json(err);
      if (data.length) return res.status(403).json({status: 403, message: 'User already exists!'});

      const salt = bcryptjs.genSaltSync(10);
      const hashedPassword = bcryptjs.hashSync(password, salt);

      const query = 'INSERT INTO users (email, username, password, created_at, updated_at) VALUES (?)';
      const currentDateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
      db.query(query, [[email, username, hashedPassword, currentDateTime, currentDateTime]], (err, data) => {
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

    const query = 'SELECT * FROM users WHERE username = ? OR email = ?';
    db.query(query, [username, username], async (err, data) => {
      if (err) return res.send(err);
      if (!data.length) return res.status(404).send({status: 404, message: 'User not exist!'});

      const user = data[0];
      const generatedToken = authUtil.generateAccessToken(user.id);

      const isPasswordCorrect = await bcryptjs.compare(password, user.password);
      if (!isPasswordCorrect) return res.status(400).send({status: 400, message: 'username or password incorrect!'});

      return res.status(200).json({status: 200, message: 'User logged in!', token: generatedToken});
    });
  },
};

export default authController;
