// // Basic middleware to restrict blog posting
// module.exports = (req, res, next) => {
//   const isAdmin = req.headers['admin-token'] === process.env.ADMIN_TOKEN;
//   if (!isAdmin) return res.status(403).json({ error: 'Unauthorized' });
//   next();
// };
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  // Get token from header or cookie
  const token = req.headers['admin-token'] || req.cookies?.adminToken;
  
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    req.admin = decoded.admin;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};