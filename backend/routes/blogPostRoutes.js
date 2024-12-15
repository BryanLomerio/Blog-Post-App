const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const blogPostModel = require('../models/blogPostModel');

const router = express.Router();

const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set up file upload storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
}).single('image'); 

// Fetch all blog posts
router.get('/', async (req, res) => {
  try {
    const blogPosts = await blogPostModel.getAllBlogPosts();
    res.json(blogPosts);
  } catch (err) {
    console.error('Error fetching blog posts:', err); 
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
});

// Create a new blog post
router.post('/', (req, res) => {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.error('Multer error:', err.message); 
        return res.status(400).json({ error: 'File upload failed', details: err.message });
      } else if (err) {
        console.error('Unknown error:', err.message); 
        return res.status(500).json({ error: 'Internal server error', details: err.message });
      }
  
      const { title, content } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  
      try {
        const result = await blogPostModel.createBlogPost(title, content, imageUrl);
        res.status(201).json(result);
      } catch (err) {
        console.error('Error creating blog post:', err); 
        res.status(500).json({ error: 'Internal Server Error', details: err.message }); 
      }
    });
  });
  

  router.get('/:id', async (req, res) => {
    console.log('Received request to fetch post with ID:', req.params.id);  
    try {
      const post = await blogPostModel.getBlogPostById(req.params.id);
      if (!post) {
        console.log('Post not found');  
        return res.status(404).send({ message: 'Post not found' });
      }
      console.log('Post found:', post);  
      res.json(post);
    } catch (err) {
      console.error('Error fetching post details:', err);
      res.status(500).send({ message: 'Error fetching post details' });
    }
  });
  ;
  

// Edit a blog post
router.put('/:id', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('File upload error:', err.message); 
      return res.status(400).json({ error: 'File upload failed', details: err.message });
    }

    const { id } = req.params;
    const { title, content } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
      const result = await blogPostModel.updateBlogPost(id, title, content, imageUrl);
      res.json(result);
    } catch (err) {
      console.error('Error updating blog post:', err); 
      res.status(500).json({ error: 'Internal Server Error' }); 
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
    console.error('Error deleting blog post:', err); 
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
});

module.exports = router;
