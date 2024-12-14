const db = require('../models/db');

const getAllBlogPosts = async () => {
  const [rows] = await db.query('SELECT * FROM blog_posts');
  return rows;
};

const createBlogPost = async (title, content, imageUrl) => {
  const [result] = await db.query('INSERT INTO blog_posts (title, content, image_url) VALUES (?, ?, ?)', [title, content, imageUrl]);
  return result;
};

const updateBlogPost = async (id, title, content, imageUrl) => {
  const [result] = await db.query('UPDATE blog_posts SET title = ?, content = ?, image_url = ? WHERE id = ?', [title, content, imageUrl, id]);
  return result;
};

const deleteBlogPost = async (id) => {
  const [result] = await db.query('DELETE FROM blog_posts WHERE id = ?', [id]);
  return result;
};

module.exports = { getAllBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost };
