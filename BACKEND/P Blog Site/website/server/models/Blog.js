const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  createdAt: { type: Date, default: Date.now },
  comments: [{
    user: String,
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }],
  feedback: [{
    user: String,
    message: String
  }]
});

module.exports = mongoose.model('Blog', blogSchema);
