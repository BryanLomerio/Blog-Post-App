import React, { useState, useEffect } from 'react';

const BlogPostForm = ({ postToEdit, onSave }) => {
  const [title, setTitle] = useState(postToEdit ? postToEdit.title : '');
  const [content, setContent] = useState(postToEdit ? postToEdit.content : '');
  const [image, setImage] = useState(postToEdit ? postToEdit.image_url : '');
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      content,
      image,
    };
    onSave(newPost);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-gray-700">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-gray-700">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="image" className="block text-gray-700">Image</label>
        <input
          id="image"
          type="file"
          onChange={handleImageChange}
          className="w-full px-4 py-2 border rounded-md"
        />
        {previewImage && (
          <div className="mt-4">
            <img src={previewImage} alt="Image preview" className="max-w-full h-48 object-cover" />
          </div>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Save Post
      </button>
    </form>
  );
};

export default BlogPostForm;
