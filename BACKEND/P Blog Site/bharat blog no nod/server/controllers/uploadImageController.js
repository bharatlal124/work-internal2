// controllers/uploadImageController.js
const cloudinary = require('../config/cloudinary');

exports.uploadImageOnly = async (req, res) => {
  const imageUrl = req.body.imageUrl;

  if (!imageUrl) return res.status(400).json({ error: 'Image URL is required' });

  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      // public_id: 'custom_image_name', // optional
       folder: 'blog-images'
    //   categorization: 'google_tagging',
    //   auto_tagging: 0.75,
    });

    res.status(200).json({
      message: 'Image uploaded successfully',
      cloudinaryData: result,
    });
    // return result;
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
};
