import axios from 'axios';

const API_URL = 'http://localhost:5000/api/blogposts';

export const getBlogPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createBlogPost = async (title, content, image) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  if (image) formData.append('image', image);

  const response = await axios.post(API_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const updateBlogPost = async (id, title, content, image) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  if (image) formData.append('image', image);

  const response = await axios.put(`${API_URL}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteBlogPost = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
