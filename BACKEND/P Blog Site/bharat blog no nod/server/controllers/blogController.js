// const Blog = require('../models/Blog');

// exports.createBlog = async (req, res) => {
//   const { title, content } = req.body;
//   const image = req.file?.path; // ✅ Cloudinary URL

//   try {
//     const blog = new Blog({ title, content, image });
//     await blog.save();
//     res.status(201).json(blog);
//   } catch (err) {
//     res.status(500).json({ error: 'Server Error' });
//   }
// };
const Blog = require('../models/Blog');
const fs = require('fs');
const result = require('./uploadImageController');

exports.createBlog = async (req, res) => {
  const { title, content, image } = req.body;  

  try {
    let imageData = null;
    let imageContentType = null;
    let imageUrl = image; // default to image URL from body

    // If a file is uploaded via form-data (e.g., from Postman or frontend)
    if (req.file) {
      const fileBuffer = fs.readFileSync(req.file.path);
      imageData = fileBuffer;
      imageContentType = req.file.mimetype;
      imageUrl = req.file.path; // optionally store local path or replace with Cloudinary URL
    }

    const blog = new Blog({
      title,
      content,
      image: imageUrl,
    //   image: result.secure_url,
      imageData,
      imageContentType,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id); // ✅ Correct method to find by ID

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
