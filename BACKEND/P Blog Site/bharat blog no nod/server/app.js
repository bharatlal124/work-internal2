const express = require('express');
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes');
const uploadRoute = require('./routes/uploadRoute');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRoutes);
app.use('/api', uploadRoute);
module.exports = app;
