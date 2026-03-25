// Basic middleware to restrict blog posting
module.exports = (req, res, next) => {
  const isAdmin = req.headers['admin-token'] === process.env.ADMIN_TOKEN;
  if (!isAdmin) return res.status(403).json({ error: 'Unauthorized' });
  next();
};
