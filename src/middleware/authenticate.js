const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/config');

const authenticate = (req, res, next) => {
  const bearerToken = req.header('Authorization');
  const token = bearerToken.replace('Bearer ','');

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required.' });
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticate;