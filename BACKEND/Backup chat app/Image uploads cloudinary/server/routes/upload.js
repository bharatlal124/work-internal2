const express = require('express');
const upload = require('../middleware/upload');
const router = express.Router();

router.post('/upload', upload.single('image'), (req, res) => {
  console.log("REQ FILE:", req.file); // 🧪 Must not be undefined

  if (!req.file || !req.file.path) {
    return res.status(400).json({ error: 'Image upload failed' });
  }

  return res.status(200).json({ imageUrl: req.file.path });
});

module.exports = router;
