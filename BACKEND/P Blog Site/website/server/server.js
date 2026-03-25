const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));

mongoose.connect(process.env.MONGO_URI, () => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server running on port 5000'));
});
