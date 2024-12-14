import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogPostForm from './components/BlogPostForm';
import Home from './components/Home';
import Header from './components/Header';
import About from './components/About'; // Import About component
import News from './components/News';   // Import News component

const App = () => {
  const [editingPost, setEditingPost] = useState(null);

  const handleEdit = (post) => {
    setEditingPost(post);
  };

  const handleSave = () => {
    setEditingPost(null);
  };

  return (
    <Router>
      <Header />
      <Routes>
        {/* Route for Home */}
        <Route path="/" element={<Home />} />

        {/* Route for About */}
        <Route path="/about" element={<About />} />

        {/* Route for News and Articles */}
        <Route path="/news" element={<News />} />

        {/* Route for Admin Panel */}
        <Route
          path="/admin"
          element={
            <div>
              <h1>Admin</h1>
              <BlogPostForm postToEdit={editingPost} onSave={handleSave} />
              <BlogList onEdit={handleEdit} />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
