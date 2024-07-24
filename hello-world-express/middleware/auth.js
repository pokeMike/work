const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

module.exports = async function (req, res, next) {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(403).send('Authorization header is required');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(403).send('Token is required');
    }

    const decoded = await jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).send('Invalid token');
  }
};
