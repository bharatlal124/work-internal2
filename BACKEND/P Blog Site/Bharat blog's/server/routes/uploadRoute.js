// routes/uploadRoute.js
const express = require('express');
const router = express.Router();
const { uploadImageOnly } = require('../controllers/uploadImageController');

router.post('/upload-image', uploadImageOnly);

module.exports = router;
