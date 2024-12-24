import axios from 'axios';

const API_URL = 'http://localhost:5000/api/blogposts';
const USER_API_URL = 'http://localhost:5000/api/users'; 
const GALLERY_API_URL = 'http://localhost:5000/api/gallery';  

// Fetch all blog posts
export const getBlogPosts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw new Error('Failed to fetch blog posts');
  }
};

// Fetch a single blog post by ID
export const getBlogPostById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    console.log('API response for ID:', id, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog post by ID:', error.message || error);
    throw new Error('Failed to fetch blog post');
  }
};

// Create a new blog post
export const createBlogPost = async (title, content, image) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    const response = await axios.post(API_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw new Error('Failed to create blog post');
  }
};

// Update an existing blog post
export const updateBlogPost = async (id, title, content, image) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw new Error('Failed to update blog post');
  }
};

// Delete a blog post
export const deleteBlogPost = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw new Error('Failed to delete blog post');
  }
};

// User Registration API
export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${USER_API_URL}/register`, { username, email, password });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('Failed to register user');
  }
};

// User Login API
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${USER_API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw new Error('Failed to login user');
  }
};

// Upload multiple images to the gallery
export const uploadImagesToGallery = async (images) => {
  try {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });

    const response = await axios.post(`${GALLERY_API_URL}/upload-image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading images to gallery:', error);
    throw new Error('Failed to upload images');
  }
};

export const getGalleryImages = async () => {
  try {
    const response = await axios.get(`${GALLERY_API_URL}/gallery-images`);
    return response.data.map(image => ({
      ...image,
      imageUrl: `http://localhost:5000/uploads/${image.image_url.replace(/\\/g, '/')}`,
    }));
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    throw new Error('Failed to fetch gallery images');
  }
};





const convertToBase64 = (arrayBuffer) => {
  return new Promise((resolve, reject) => {
    const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
    const reader = new FileReader();
    
    reader.onloadend = () => {
      resolve(reader.result);
    };
    
    reader.onerror = reject;
    
    reader.readAsDataURL(blob);
  });
};

// Fetch gallery images
export const fetchGalleryImages = async () => {
  try {
    const response = await axios.get('/api/gallery-images');
    return response.data; 
  } catch (error) {
    console.error('Error fetching gallery images:', error.message);
    throw new Error('Failed to fetch gallery images');
  }
};

export const deleteGalleryImage = async (id) => {
  try {
    const response = await axios.delete(`/api/delete-image/${id}`);
    if (response.status === 200) {
      console.log('Image deleted successfully');
    } else {
      console.error('Error deleting image:', response);
    }
  } catch (error) {
    console.error('Failed to delete image:', error);
  }
};




