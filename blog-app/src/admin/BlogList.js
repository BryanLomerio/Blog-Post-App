import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getBlogPosts, deleteBlogPost, createBlogPost, updateBlogPost } from '../api';
import BlogPostForm from './BlogPostForm';

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState([]); 
  const [isCreating, setIsCreating] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);
  const [postsLimit] = useState(6);
  const [isSubmitting, setIsSubmitting] = useState(false); 

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const posts = await getBlogPosts();
        setBlogPosts(posts || []); 
      } catch (error) {
        console.error('Failed to fetch blog posts', error);
        setBlogPosts([]);  
      }
    };
    fetchBlogPosts();
  }, []);
  

  const handleDelete = async (postId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      await deleteBlogPost(postId);
      setBlogPosts(blogPosts.filter(post => post.id !== postId));
      Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
    }
  };

  const handleCreateNewBlog = () => {
    setIsCreating(true);
    setPostToEdit(null);
  };

  const handleEditBlog = (post) => {
    setPostToEdit(post);
    setIsCreating(true);
  };

  const handleSave = async (newPost) => {
    if (isSubmitting) return;
    setIsSubmitting(true); 

    if (postToEdit) {
      await updateBlogPost(postToEdit.id, newPost.title, newPost.content, newPost.image);
      setBlogPosts(blogPosts.map(post => (post.id === postToEdit.id ? { ...post, ...newPost } : post)));
      Swal.fire('Updated!', 'Your post has been updated.', 'success');
    } else {
      const createdPost = await createBlogPost(newPost.title, newPost.content, newPost.image);
      setBlogPosts([createdPost, ...blogPosts]);
      Swal.fire('Created!', 'Your post has been created.', 'success');
    }

    setIsSubmitting(false); 
  };

  const handleBackToAdmin = () => {
    setIsCreating(false);
    setPostToEdit(null); 
  };

  return (
    <div className="flex justify-center items-center py-8">
      <div className="w-full max-w-4xl px-4">
        {!isCreating && (
          <>
            <h2 className="text-2xl font-bold mb-4">Blog Posts</h2>
            <div className="mb-4">
              <button
                onClick={handleCreateNewBlog}
                className="px-4 py-1.5 text-sm border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition duration-200"
              >
                Create New Blog
              </button>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(blogPosts) && blogPosts.slice(0, postsLimit).map(post => (
  <li key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
    {post.image_url && (
      <img 
        src={`http://localhost:5000${post.image_url}`} 
        alt="Blog post" 
        className="w-full h-48 object-cover" 
      />
    )}
    <div className="p-4">
      <h3 className="font-semibold text-xl">{post.title}</h3>
      <p className="text-gray-600 mt-2">
        {post.content.length > 100 ? `${post.content.slice(0, 100)}...` : post.content}
      </p>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => handleEditBlog(post)}
          className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md hover:bg-blue-600 transition duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(post.id)}
          className="bg-red-500 text-white px-3 py-1 text-sm rounded-md hover:bg-red-600 transition duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  </li>
))}

            </ul>
          </>
        )}

        {(isCreating || postToEdit) && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">{postToEdit ? 'Edit Post' : 'Create a New Blog'}</h2>
            <BlogPostForm postToEdit={postToEdit} onSave={handleSave} />
 
            <button
              onClick={handleBackToAdmin} 
              className="mt-4 px-4 py-2 text-sm border border-gray-500 text-gray-500 rounded-lg hover:bg-gray-500 hover:text-white transition duration-200"
            >
              Back to Admin
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
