import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { uploadImagesToGallery, getGalleryImages, deleteGalleryImage } from '../api/api';
import { FaTrashAlt } from 'react-icons/fa'; 

const GalleryUpload = () => {
  const [galleryImages, setGalleryImages] = useState([]);  
  const [newImages, setNewImages] = useState([]); 

  // Fetch gallery images
  const fetchGalleryImages = async () => {
    try {
      const images = await getGalleryImages();
      console.log(images); 
      setGalleryImages(images || []);
    } catch (error) {
      console.error('Failed to fetch gallery images', error);
      setGalleryImages([]);
    }
  };
  
  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImages([...newImages, ...files]);  
  };

  const handleUploadImages = async () => {
    if (newImages.length === 0) return;
  
    const formData = new FormData();
    newImages.forEach((image) => {
      formData.append('images', image);
    });
  
    try {
      await uploadImagesToGallery(newImages);
      fetchGalleryImages();
      setNewImages([]);
      Swal.fire('Success!', 'Images uploaded successfully.', 'success');
    } catch (error) {
      console.error('Failed to upload images', error);
      Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
    }
  };

  const handleDeleteImage = async (imageId) => {
    console.log('Deleting image with ID:', imageId); 
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This will permanently delete the image.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      });
  
      if (result.isConfirmed) {
        await deleteGalleryImage(imageId); 
        fetchGalleryImages();
        Swal.fire('Deleted!', 'Image deleted successfully.', 'success');
      }
    } catch (error) {
      console.error('Failed to delete image:', error);
      Swal.fire('Error!', 'Failed to delete the image. Please try again.', 'error');
    }
  };

  useEffect(() => {
    fetchGalleryImages();  
  }, []);

  return (
    <div className="mt-8 px-4 flex flex-col items-center">  
      <h3 className="text-xl font-bold mb-4">Upload Images to Gallery</h3>
      
      <div className="mb-4 flex justify-center items-center space-x-4"> 
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="block mb-4"
        />
        <button
          onClick={handleUploadImages}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Upload Images
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">  
        {galleryImages.map((image, index) => (
        <div key={index} className="border p-2 rounded-lg relative flex justify-center items-center">
          <img
            src={image.imageUrl} 
            alt={`Image ${index + 1}`}
            className="w-32 h-32 object-cover rounded-md"
          />
          <div className="absolute top-2 right-2">
            <button
              onClick={() => handleDeleteImage(image.id)}
              className="text-red-600 hover:text-red-800"
            >
              <FaTrashAlt size={16} />
            </button>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryUpload;
