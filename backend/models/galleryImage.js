  const db = require('../models/db'); 

  const saveImage = async (imageUrl) => {
    const relativeImageUrl = imageUrl.replace(/\\/g, '/').replace('uploads/', '');
    const query = 'INSERT INTO gallery_images (image_url) VALUES (?)';
    try {
      const [result] = await db.execute(query, [relativeImageUrl]); 
      return result;
    } catch (err) {
      console.error('Error saving image:', err);
      throw err;
    }
  };
  
    

  // Fetch all gallery images
  const getAllImages = async () => {
    const query = 'SELECT * FROM gallery_images ORDER BY created_at DESC';
    try {
      const [rows] = await db.execute(query); 
      return rows; 
    } catch (err) {
      console.error('Error fetching images:', err); 
      throw err;
    }
  };

  module.exports = { saveImage, getAllImages };
