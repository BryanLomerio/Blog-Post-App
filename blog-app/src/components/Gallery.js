import React, { useEffect, useState } from 'react';
import { getGalleryImages } from '../api';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="w-full px-4 py-4">
      <h1 className="text-2xl font-bold text-center mb-6 mt-10">Gallery</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 w-full">
        {galleryImages.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No images found</p>
        ) : (
          galleryImages.map((image, index) => (
            <div key={index} className="relative w-full h-48">
              <LazyLoadImage
                src={image.imageUrl}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-md cursor-pointer"
                effect="blur"
                onClick={() => handleImageClick(image.imageUrl)} // Handle image click
              />
            </div>
          ))
        )}
      </div>

      {/* Modal for Viewing Image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-4xl">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full p-2"
            >
              X
            </button>
            <img src={selectedImage} alt="Selected" className="w-full h-auto" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
