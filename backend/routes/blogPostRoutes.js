const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const blogPostModel = require('../models/blogPostModel');

const router = express.Router();

// Ensure the uploads directory exists
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set up file upload storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Set destination folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Ensure unique filenames
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
}).single('image'); // Only allow a single file upload for 'image'

// Fetch all blog posts
router.get('/', async (req, res) => {
  try {
    const blogPosts = await blogPostModel.getAllBlogPosts();
    res.json(blogPosts);
  } catch (err) {
    console.error('Error fetching blog posts:', err); // Log the error
    res.status(500).json({ error: 'Internal Server Error' }); // Return a JSON error
  }
});

// Create a new blog post
router.post('/', (req, res) => {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.error('Multer error:', err.message); // Multer-specific error
        return res.status(400).json({ error: 'File upload failed', details: err.message });
      } else if (err) {
        console.error('Unknown error:', err.message); // Other errors
        return res.status(500).json({ error: 'Internal server error', details: err.message });
      }
  
      const { title, content } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  
      try {
        const result = await blogPostModel.createBlogPost(title, content, imageUrl);
        res.status(201).json(result);
      } catch (err) {
        console.error('Error creating blog post:', err); // Log the error
        res.status(500).json({ error: 'Internal Server Error', details: err.message }); // Return a JSON error
      }
    });
  });
  

// Edit a blog post
router.put('/:id', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('File upload error:', err.message); // Log the upload error
      return res.status(400).json({ error: 'File upload failed', details: err.message });
    }

    const { id } = req.params;
    const { title, content } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
      const result = await blogPostModel.updateBlogPost(id, title, content, imageUrl);
      res.json(result);
    } catch (err) {
      console.error('Error updating blog post:', err); // Log the error
      res.status(500).json({ error: 'Internal Server Error' }); // Return a JSON error
    }
  });
});

// Delete a blog post
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await blogPostModel.deleteBlogPost(id);
    res.json(result);
  } catch (err) {
    console.error('Error deleting blog post:', err); // Log the error
    res.status(500).json({ error: 'Internal Server Error' }); // Return a JSON error
  }
});

module.exports = router;
