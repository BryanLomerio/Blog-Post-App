const db = require('../models/db');

const getAllBlogPosts = async () => {
  const [rows] = await db.query('SELECT * FROM blog_posts WHERE remark = 1');
  return rows;
};


const createBlogPost = async (title, content, imageUrl) => {
  const [result] = await db.query('INSERT INTO blog_posts (title, content, image_url, remark) VALUES (?, ?, ?, ?)', [title, content, imageUrl, 1]);
  return result;
};

const updateBlogPost = async (id, title, content, imageUrl) => {
  const [result] = await db.query('UPDATE blog_posts SET title = ?, content = ?, image_url = ? WHERE id = ?', [title, content, imageUrl, id]);
  return result;
};
 0
const deleteBlogPost = async (id) => {
  const [result] = await db.query('UPDATE blog_posts SET remark = 0 WHERE id = ?', [id]);
  return result;
};


const getBlogPostById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM blog_posts WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      if (results.length === 0) {
        return resolve(null); 
      }
      resolve(results[0]); 
    });
  });
};
module.exports = { getAllBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost, getBlogPostById };
