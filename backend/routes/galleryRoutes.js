const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { saveImage, getAllImages } = require('../models/galleryImage');
const router = express.Router();

const dir = 'uploads/gallery';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Route to upload images to the gallery
router.post('/upload-image', upload.array('images'), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    const uploadedImages = await Promise.all(
      req.files.map(file => {
        return saveImage(file.path);
      })
    );

    res.json({ message: 'Images uploaded successfully', uploadedImages });
  } catch (error) {
    console.error('Failed to upload images:', error.stack);
    res.status(500).json({ message: 'Failed to upload images', error: error.stack });
  }
});

router.get('/gallery-images', async (req, res) => {
  try {
    const images = await getAllImages();
    const formattedImages = images.map(image => ({
      id: image.id,
      image_url: image.image_url
    }));

    res.json(formattedImages);
  } catch (error) {
    console.error('Failed to fetch gallery images:', error.message || error);
    res.status(500).json({
      message: 'Failed to fetch gallery images',
      error: error.message || error.stack
    });
  }
});

router.delete('/delete-image/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const query = 'DELETE FROM gallery_images WHERE id = ?';
    const [result] = await db.execute(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error.message || error.stack);
    res.status(500).json({ message: 'Failed to delete image', error: error.message || error.stack });
  }
});

module.exports = router;
