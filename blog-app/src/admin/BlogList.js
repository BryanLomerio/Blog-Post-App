import React, { useEffect, useState } from 'react';
import { getBlogPosts, deleteBlogPost } from '../api';

const BlogList = ({ onEdit }) => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const posts = await getBlogPosts();
      setBlogPosts(posts);
    };
    fetchBlogPosts();
  }, []);

  const handleDelete = async (id) => {
    await deleteBlogPost(id);
    setBlogPosts(blogPosts.filter(post => post.id !== id));
  };

  return (
    <div>
      <h2>Blog Posts</h2>
      <ul>
        {blogPosts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {post.image_url && <img src={post.image_url} alt="Blog post" width={100} />}
            <button onClick={() => onEdit(post)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
