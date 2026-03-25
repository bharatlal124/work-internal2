const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const adminAuth = require('../middleware/adminAuth');
const upload = require('../middleware/upload');

// Public routes
router.get('/all', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);

// Protected routes (require admin authentication)
router.post('/', adminAuth, upload.single('image'), blogController.createBlog);
router.put('/:id', adminAuth, upload.single('image'), blogController.updateBlog);
router.delete('/:id', adminAuth, blogController.deleteBlog);

module.exports = router;

















// const express = require('express');
// const router = express.Router();
// const blogController = require('../controllers/blogController');
// const adminAuth = require('../middleware/adminAuth');
// const upload = require('../middleware/upload');

// router.get('/', blogController.getAllBlogs);
// router.post('/', adminAuth, upload.single('image'), blogController.createBlog); // ✅ with image

// module.exports = router;
// ====================================Corrected code========================
// const express = require('express');
// const router = express.Router();
// const blogController = require('../controllers/blogController');
// const adminAuth = require('../middleware/adminAuth');
// const upload = require('../middleware/upload');
// const { uploadImageOnly } = require('../controllers/uploadImageController');

// // ✅ Blog creation with image upload and admin auth
// router.post('/', adminAuth, upload.single('image'), blogController.createBlog);
// // router.post('/upload-image', uploadImageOnly);
// // ✅ Dummy blog list route (define this in your controller later)
// // router.get('/', (req, res) => {
// //   res.send('All blogs will be fetched here');
// // });

// router.get('/all', blogController.getAllBlogs);
// // ✅ Dummy get by ID
// // router.get('/:id', (req, res) => {
// //   res.send(`Blog with ID ${req.params.id} will be shown here`);
// // });
// router.get('/:id', blogController.getBlogById);
// module.exports = router;
