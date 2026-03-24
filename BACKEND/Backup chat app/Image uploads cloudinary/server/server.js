require('dotenv').config();
const express = require('express');
const cors = require('cors');
const upload = require('./middleware/upload'); // <-- your path to middleware

const app = express();
app.use(cors());
app.use(express.json());
const uploadRoutes = require('./routes/upload'); // Adjust path if needed
app.use(uploadRoutes);

app.post('/upload', upload.single('image'), (req, res) => {
  console.log("REQ FILE:", req.file);

  if (!req.file || !req.file.path) {
    return res.status(400).json({ error: 'Image upload failed' });
  }

  return res.status(200).json({ imageUrl: req.file.path });
});

// app.post('/upload', upload.single('image'), (req, res) => {
//   console.log("REQ FILE:", req.file); // ✅ see what multer received

//   if (!req.file || !req.file.path) {
//     return res.status(400).json({ error: 'Image upload failed' });
//   }

//   return res.status(200).json({ imageUrl: req.file.path });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
