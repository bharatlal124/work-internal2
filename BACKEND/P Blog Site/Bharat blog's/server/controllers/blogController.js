const Blog = require('../models/Blog');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');

// Create Blog
exports.createBlog = async (req, res) => {
  const { title, content, category, excerpt, status, metaTitle, metaDescription, tags } = req.body;  

  try {
    let imageUrl = req.body.image;
    
    // If a file is uploaded via form-data
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
      // Remove the temporary file
      fs.unlinkSync(req.file.path);
    }

    const blog = new Blog({
      title,
      content,
      category,
      excerpt,
      image: imageUrl,
      status,
      publishedAt: status === 'published' ? new Date() : null,
      metaTitle,
      metaDescription,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get All Blogs (with optional filtering)
exports.getAllBlogs = async (req, res) => {
  try {
    const { status, limit, sort } = req.query;
    const query = {};
    
    if (status) query.status = status;
    
    const options = {
      sort: { createdAt: -1 } // Default sort by newest
    };
    
    if (sort) {
      options.sort = sort.split(',').join(' ');
    }
    
    if (limit) {
      options.limit = parseInt(limit);
    }
    
    const blogs = await Blog.find(query, null, options);
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get Single Blog
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update Blog
exports.updateBlog = async (req, res) => {
  const { title, content, category, excerpt, status, metaTitle, metaDescription, tags } = req.body;
  
  try {
    let updateData = {
      title,
      content,
      category,
      excerpt,
      status,
      metaTitle,
      metaDescription,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      updatedAt: new Date()
    };

    // Handle image upload if present
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.image = result.secure_url;
      fs.unlinkSync(req.file.path);
    } else if (req.body.image) {
      updateData.image = req.body.image;
    }

    // Update publishedAt if status changed to published
    if (status === 'published') {
      const blog = await Blog.findById(req.params.id);
      if (blog.status !== 'published') {
        updateData.publishedAt = new Date();
      }
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json(updatedBlog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    // Optional: Delete image from Cloudinary
    if (blog.image) {
      const publicId = blog.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`blog-images/${publicId}`);
    }
    
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};










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
// =============================Corrected=============================
// const Blog = require('../models/Blog');
// const fs = require('fs');
// const result = require('./uploadImageController');

// exports.createBlog = async (req, res) => {
//   const { title, content, image } = req.body;  

//   try {
//     let imageData = null;
//     let imageContentType = null;
//     let imageUrl = image; // default to image URL from body

//     // If a file is uploaded via form-data (e.g., from Postman or frontend)
//     if (req.file) {
//       const fileBuffer = fs.readFileSync(req.file.path);
//       imageData = fileBuffer;
//       imageContentType = req.file.mimetype;
//       imageUrl = req.file.path; // optionally store local path or replace with Cloudinary URL
//     }

//     const blog = new Blog({
//       title,
//       content,
//       image: imageUrl,
//     //   image: result.secure_url,
//       imageData,
//       imageContentType,
//       authorName: 'Bharat',
//       authorImage: 'https://res.cloudinary.com/dok1a0vcc/image/upload/v1750056915/blog-images/qfapmrmhdxrekp6sg6l2.png'
//     });

//     await blog.save();
//     res.status(201).json(blog);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// exports.getAllBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.find().sort({ createdAt: -1 });
//     res.status(200).json(blogs);
//   } catch (err) {
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// exports.getBlogById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const blog = await Blog.findById(id); // ✅ Correct method to find by ID

//     if (!blog) {
//       return res.status(404).json({ error: 'Blog not found' });
//     }

//     res.status(200).json(blog);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };
