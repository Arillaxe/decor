const router = require("express").Router();
const jwt = require('jsonwebtoken');
const config = require('config');

const {
  username,
  password,
  secret,
  expiresIn,
} = config.get('admin');

router.post('/login', (req, res) => {
  const { username: reqUsername, password: reqPassword } = req.body;

  if (username === reqUsername && password === reqPassword) {
    jwt.sign({ username }, secret, { expiresIn }, (err, token) => {
      if (err) return res.status(401).json({ error: err });

      res.header('auth', token).json({ token });
    });
  } else {
    return res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
  }
});

module.exports = router;
