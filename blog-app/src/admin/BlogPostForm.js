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
    if (isLoading) return; 
    
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
        setMessage(error.message || 'Error saving post. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8 space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">{postToEdit ? 'Edit Post' : 'Create Post'}</h2>
      
      {message && (
        <div className="text-sm text-center font-medium py-3 px-6 rounded-md bg-green-100 text-green-800">
          {message}
        </div>
      )}

      <div className="space-y-3">
        <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title"
          required
          className="w-full border-gray-300 rounded-lg shadow-lg focus:ring-blue-500 focus:border-blue-500 sm:text-lg py-3 px-4"
        />
      </div>
      
      <div className="space-y-3">
        <label htmlFor="content" className="block text-lg font-medium text-gray-700">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your content here..."
          required
          rows="6"
          className="w-full border-gray-300 rounded-lg shadow-lg focus:ring-blue-500 focus:border-blue-500 sm:text-lg py-3 px-4"
        />
      </div>
      
      <div className="space-y-3">
        <label htmlFor="image" className="block text-lg font-medium text-gray-700">Image</label>
        {postToEdit && currentImageUrl && (
          <div className="mb-5">
            <img
              src={`http://localhost:5000${currentImageUrl}`} 
              alt="Current post displayed"
              className="w-64 h-64 object-cover mb-4"
            />
            <p className="text-md text-gray-600">Current image</p>
          </div>
        )}

        <input
          id="image"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full text-gray-700 py-3 px-4 border-gray-300 rounded-lg shadow-lg"
        />
      </div>
      
      <div className="flex justify-end">
  <button
    type="submit"
    disabled={isLoading} 
    className="w-auto bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
  >
    {isLoading ? (
      <span>Saving...</span>
    ) : (
      <span>{postToEdit ? 'Update Post' : 'Save Post'}</span>
    )}
  </button>
</div>

    </form>
  );
};

export default BlogPostForm;
