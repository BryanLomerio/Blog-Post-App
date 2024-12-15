import axios from 'axios';

const API_URL = 'http://localhost:5000/api/blogposts';

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
