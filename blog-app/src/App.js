import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import BlogList from './admin/BlogList';
import BlogPostForm from './admin/BlogPostForm';
import Home from './components/Home';
import Header from './components/Header';
import About from './components/About';
import News from './components/Gallery';
import BlogPostDetail from './admin/BlogPostDetail';
import Login from './components/Login'; 
import Register from './components/Register';
import GalleryUpload from './admin/GalleryUpload';  // Import GalleryUpload component

const App = () => {
  const [editingPost, setEditingPost] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleEdit = (post) => {
    setEditingPost(post);
    setIsCreating(false);
  };

  const handleSave = () => {
    setEditingPost(null);
    setIsCreating(false);
  };

  const location = useLocation();

  const shouldHideHeader = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div>
      {!shouldHideHeader && <Header />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<BlogPostDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/news" element={<News />} />
        
        {/* New route for Blog Post Admin */}
        <Route path="/admin/blog-posts" element={
          <BlogList
            onEdit={handleEdit}
            isCreating={isCreating}
            setIsCreating={setIsCreating}
          />
        } />
        
        {/* Route for editing/creating blog posts */}
        <Route path="/admin/blog-posts/create" element={
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Create New Blog Post</h2>
            <BlogPostForm onSave={handleSave} />
          </div>
        } />
        
        <Route path="/admin/blog-posts/edit/:id" element={
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Edit Blog Post</h2>
            <BlogPostForm postToEdit={editingPost} onSave={handleSave} />
          </div>
        } />
        
        {/* Route for Gallery Upload */}
        <Route path="/upload-image" element={<GalleryUpload />} /> {/* Add this route */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
