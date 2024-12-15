const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const blogPostRoutes = require('./routes/blogPostRoutes');
const userRoutes = require('./routes/userRoutes');
const galleryRoutes = require('./routes/galleryRoutes'); 

const app = express();

// CORS setup with custom options
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));  

app.use(bodyParser.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/users', userRoutes); 
app.use('/api/blogposts', blogPostRoutes)
app.use('/api/gallery', galleryRoutes);  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
