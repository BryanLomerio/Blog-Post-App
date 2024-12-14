import React, { useState } from 'react';
import BlogList from './components/BlogList';
import BlogPostForm from './components/BlogPostForm';

const App = () => {
  const [editingPost, setEditingPost] = useState(null);

  const handleEdit = (post) => {
    setEditingPost(post);
  };

  const handleSave = () => {
    setEditingPost(null);
  };

  return (
    <div>
      <h1>Blog App</h1>
      <BlogPostForm postToEdit={editingPost} onSave={handleSave} />
      <BlogList onEdit={handleEdit} />
    </div>
  );
};

export default App;
