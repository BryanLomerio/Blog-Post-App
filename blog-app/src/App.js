import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import BlogList from './admin/BlogList';
import BlogPostForm from './admin/BlogPostForm';
import Home from './components/Home';
import Header from './components/Header';
import About from './components/About';
import News from './components/News';
import BlogPostDetail from './admin/BlogPostDetail';
import Login from './components/Login'; 
import Register from './components/Register'; 

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
        <Route path="/admin" element={
          <div>
            <BlogList
              onEdit={handleEdit}
              isCreating={isCreating}
              setIsCreating={setIsCreating}
            />
            {(isCreating || editingPost) && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">
                  {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h2>
                <BlogPostForm postToEdit={editingPost} onSave={handleSave} />
              </div>
            )}
          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
