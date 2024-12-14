import React, { useState, useEffect } from 'react';
import { createBlogPost, updateBlogPost } from './../api';

const BlogPostForm = ({ postToEdit, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
    }
  }, [postToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (postToEdit) {
      await updateBlogPost(postToEdit.id, title, content, image);
    } else {
      await createBlogPost(title, content, image);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Title" 
        required 
      />
      <textarea 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        placeholder="Content" 
        required 
      />
      <input 
        type="file" 
        onChange={(e) => setImage(e.target.files[0])} 
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default BlogPostForm;
