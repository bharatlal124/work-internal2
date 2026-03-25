// const app = require('./app');
// const connectDB = require('./config/db');
// require('dotenv').config();

// const PORT = process.env.PORT || 5000;
// connectDB();

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const app = require('./app');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Hash admin password on startup (one-time)
async function setupAdmin() {
  if (process.env.ADMIN_PASSWORD && !process.env.ADMIN_PASSWORD_HASH) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
    console.log('ADMIN_PASSWORD_HASH=' + hash);
    console.log('\n  Copy this hash to your .env file as ADMIN_PASSWORD_HASH');
    console.log('  Then remove the plaintext ADMIN_PASSWORD from your .env file\n');
  }
}

// Connect to database and start server
async function startServer() {
  try {
    await connectDB();
    await setupAdmin();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();