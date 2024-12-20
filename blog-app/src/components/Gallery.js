import React, { useEffect, useState } from 'react';
import { getGalleryImages } from '../api';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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
    <div className="w-full px-4 py-4">
      <h1 className="text-2xl font-bold text-center mb-6 mt-10">Gallery</h1>
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-1 w-full">
        {galleryImages.length === 0 ? (
          <p className="text-center text-gray-500">No images found</p>
        ) : (
          galleryImages.map((image, index) => (
            <div key={index} className="relative w-full h-20">
              <LazyLoadImage
                src={image.imageUrl}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-contain"
                effect="blur"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Gallery;
