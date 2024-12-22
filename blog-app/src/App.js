import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import BlogList from './admin/BlogList';
import BlogPostForm from './admin/BlogPostForm';
import Home from './pages/Home';
import Header from './components/Header';
import About from './pages/About';
import News from './pages/Gallery';
import BlogPostDetail from './admin/BlogPostDetail';
import Login from './auth/Login'; 
import Register from './auth/Register';
import GalleryUpload from './admin/GalleryUpload';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);  

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div>
      {!shouldHideHeader && <Header />}
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-text">
            {'A'.split('').map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
            {'n'.split('').map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
            {'i'.split('').map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
            {'n'.split('').map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
            {'o'.split('').map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<BlogPostDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />

          {/* Blog Post Admin */}
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
          <Route path="/upload-image" element={<GalleryUpload />} />

          <Route path="/login" element={<Login setIsLoading={setIsLoading} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
