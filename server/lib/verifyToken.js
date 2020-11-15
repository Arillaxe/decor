const jwt = require('jsonwebtoken');
const config = require('config');

const { username, secret } = config.get('admin');

const verifyToken = (req, res, next) => {
  const token = req.header('auth');

  if (!token) return res.status(401).json({ error: 'Not authorized' });

  jwt.verify(token, secret, (err, { username: reqUsername }) => {
    if (err) return res.status(401).json({ error: err });
    if (username !== reqUsername) return res.status(401).json({ error: 'Not authorized' });

    next();
  });
};

module.exports = verifyToken;
