const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  excerpt: { type: String },
  slug: { type: String, unique: true },
  image: String, // Cloudinary URL
  imageData: Buffer, // Raw image binary
  imageContentType: String, // MIME type like "image/jpeg"
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  publishedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  authorName: {
    type: String,
    default: 'Bharat'  
  },
  authorImage: {
    type: String,
    default: 'https://res.cloudinary.com/dok1a0vcc/image/upload/v1750056915/blog-images/qfapmrmhdxrekp6sg6l2.png'  
  },
  metaTitle: String,
  metaDescription: String,
  tags: [{ type: String }]
});

// Add pre-save hook to generate slug
BlogSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Blog', BlogSchema);









// const mongoose = require('mongoose');

// const BlogSchema = new mongoose.Schema({
//   title: String,
//   content: String,
//   image: String, // Cloudinary URL
//   imageData: Buffer, // Raw image binary
//   imageContentType: String, // MIME type like "image/jpeg"
//   createdAt: { type: Date, default: Date.now },

//   authorName: {
//     type: String,
//     default: 'Bharat'  
//   },
//   authorImage: {
//     type: String,
//     default: 'https://res.cloudinary.com/dok1a0vcc/image/upload/v1750056915/blog-images/qfapmrmhdxrekp6sg6l2.png'  
//   }
// });

// module.exports = mongoose.model('Blog', BlogSchema);
