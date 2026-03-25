const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String, // Cloudinary URL
  imageData: Buffer, // Raw image binary
  imageContentType: String, // MIME type like "image/jpeg"
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Blog', BlogSchema);
