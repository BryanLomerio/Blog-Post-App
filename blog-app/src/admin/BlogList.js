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
                className=" bg-[#A69080] px-4 py-1.5 text-sm border text-white rounded-lg hover:bg-[#3E362E] hover:text-white transition duration-200"
              >
                Create New Blog
              </button>
            </div>

                      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(blogPosts) && blogPosts.slice(0, postsLimit).map(post => (
            <li
            key={post.id}
            className="bg-[#865D36] bg-opacity-50 text-white rounded-lg shadow-lg overflow-hidden relative transition duration-300 hover:bg-opacity-80 hover:backdrop-blur-lg hover:bg-[#865D36]/60"
          >
            {post.image_url && (
              <img
                src={`http://localhost:5000${post.image_url}`}
                alt="Blog post"
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4 relative z-10">
              <h3 className="font-semibold text-xl">{post.title}</h3>
              <p className="text-white mt-2">
                {post.content.length > 100 ? `${post.content.slice(0, 100)}...` : post.content}
              </p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleEditBlog(post)}
                  className="bg-[#A69080] text-white px-3 py-1 text-sm rounded-md hover:bg-[#3E362E] transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-[#A69080] text-white px-3 py-1 text-sm rounded-md hover:bg-[#3E362E] transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 hover:opacity-100 transition-all duration-300"></div>
          </li>
          
            ))}
          </ul>

          </>
        )}

        {(isCreating || postToEdit) && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 bg-[#A69080]">{postToEdit ? 'Edit Post' : 'Create a New Blog'}</h2>
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
