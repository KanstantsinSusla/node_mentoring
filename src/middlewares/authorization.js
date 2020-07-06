import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  if (req.originalUrl === '/users/login/') {
    next();
    return;
  }

  const authHeader = req.headers['x-access-token'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
      if (err) {
        res.status(403).json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        next();
      }
    });
  } else {
    res.status(401).send({ success: false, message: 'Token is not found' });
  }
};

export default authenticateToken;
