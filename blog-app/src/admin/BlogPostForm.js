import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { createBlogPost, updateBlogPost } from '../api';

const BlogPostForm = ({ postToEdit, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(''); 
  const [isLoading, setIsLoading] = useState(false); 
  const [message, setMessage] = useState(''); 

  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
      setCurrentImageUrl(postToEdit.image_url); 
    }
  }, [postToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const result = await Swal.fire({
      title: postToEdit ? 'Are you sure you want to update this post?' : 'Are you sure you want to create this post?',
      text: postToEdit ? "You can update the post after saving." : "You can edit it later.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: postToEdit ? 'Yes, update it!' : 'Yes, create it!',
    });
  
    if (result.isConfirmed) {
      try {
        const newPost = { title, content, image: image || currentImageUrl }; 

        if (postToEdit) {
          // Update post
          await updateBlogPost(postToEdit.id, newPost.title, newPost.content, newPost.image);
          setMessage('Post updated successfully!');
        } else {
          // Create new post
          await createBlogPost(newPost.title, newPost.content, newPost.image);
          setMessage('Post created successfully!');
        }
  
        onSave(newPost);
      } catch (error) {
        setMessage('Error saving post. Please try again.');
      } finally {
        setIsLoading(false);
      }
  
      Swal.fire(
        postToEdit ? 'Updated!' : 'Created!',
        postToEdit ? 'Your post has been updated.' : 'Your post has been created.',
        'success'
      );
    } else {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">{postToEdit ? 'Edit Post' : 'Create Post'}</h2>
      
      {message && (
        <div className="text-sm text-center font-medium py-2 px-4 rounded-md bg-green-100 text-green-800">
          {message}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title"
          required
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your content here..."
          required
          rows="4"
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
        {postToEdit && currentImageUrl && (
  <div className="mb-4">
    <img
      src={`http://localhost:5000${currentImageUrl}`} 
      alt="Current post displayed"
      className="w-32 h-32 object-cover mb-2"
    />
    <p className="text-sm text-gray-600">Current image</p>
  </div>
)}

        <input
          id="image"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full text-gray-700"
        />
      </div>
      
      <button
        type="submit"
        disabled={isLoading} 
        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        {isLoading ? (
          <span>Saving...</span>
        ) : (
          <span>{postToEdit ? 'Update Post' : 'Save Post'}</span>
        )}
      </button>
    </form>
  );
};

export default BlogPostForm;
