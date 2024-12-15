import React, { useEffect, useState } from 'react';
import { getGalleryImages } from '../api';

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await getGalleryImages();
        setGalleryImages(images); 
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold mb-6 text-center">Gallery</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {galleryImages.length === 0 ? (
          <p>No images found</p>
        ) : (
          galleryImages.map((image, index) => (
            <div key={index} className="overflow-hidden rounded-md shadow-md">
             <img
        src={image.imageUrl}
        alt={`Gallery image ${index + 1}`}  
        className="w-full h-32 object-cover"
        style={{ aspectRatio: '1' }} 
      />

                  </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Gallery;
