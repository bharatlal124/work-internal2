// const express = require('express');
// const cors = require('cors');
// const blogRoutes = require('./routes/blogRoutes');
// const uploadRoute = require('./routes/uploadRoute');
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use('/api/blogs', blogRoutes);
// app.use('/api', uploadRoute);
// module.exports = app;


const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const blogRoutes = require('./routes/blogRoutes');
const uploadRoute = require('./routes/uploadRoute');
const adminRoutes = require('./routes/adminRoutes');
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/blogs', blogRoutes);
app.use('/api', uploadRoute);
app.use('/api/admin', adminRoutes);

module.exports = app;