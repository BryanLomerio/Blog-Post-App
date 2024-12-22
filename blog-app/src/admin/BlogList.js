import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getBlogPosts, deleteBlogPost, createBlogPost, updateBlogPost } from '../api/api';
import BlogPostForm from './BlogPostForm';

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);
  const [postsLimit] = useState(6);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const imageBaseURL = 'http://localhost:5000';
  const fetchBlogPosts = async () => {
    setIsLoading(true);
    try {
      const posts = await getBlogPosts();
      setBlogPosts(posts || []);
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
      setBlogPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const handleDelete = async (postId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteBlogPost(postId);
        await fetchBlogPosts();
        Swal.fire('Deleted!', 'The post has been deleted.', 'success');
      } catch (error) {
        console.error('Failed to delete the post:', error);
        Swal.fire('Error!', 'Could not delete the post. Please try again.', 'error');
      }
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

    try {
      if (postToEdit) {
        await updateBlogPost(postToEdit.id, newPost.title, newPost.content, newPost.image);
        Swal.fire('Updated!', 'Your post has been updated.', 'success');
      } else {
        await createBlogPost(newPost.title, newPost.content, newPost.image);
        Swal.fire('Created!', 'Your post has been created.', 'success');
      }

      await fetchBlogPosts();
      handleBackToAdmin();
    } catch (error) {
      console.error('Failed to save the post:', error);
      Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToAdmin = () => {
    setIsCreating(false);
    setPostToEdit(null);
  };

  return (
    <div className="flex justify-center items-center py-8">
      <div className="w-full max-w-5xl px-4">
        {!isCreating && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white">Blog Posts</h2>
              <button
                onClick={handleCreateNewBlog}
                className="bg-brown-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-brown-700 hover:ring-2 hover:ring-brown-300 transition duration-300 ease-in-out"
              >
                Create New Blog
              </button>
            </div>

            {isLoading ? (
              <p className="text-center text-white">Loading posts...</p>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(blogPosts) &&
                  blogPosts.slice(0, postsLimit).map((post) => (
                    <li
                      key={post.id}
                      className="bg-[#865D36] transform hover:scale-105 rounded-lg shadow-lg overflow-hidden transition duration-300 ease-in-out"
                    >
                      
                      <img
                        src={post.image_url ? `${imageBaseURL}${post.image_url}` : '/path/to/default-image.jpg'}
                        alt="Blog post"
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-white mb-3">{post.title}</h3>
                        <div className="mt-3 flex justify-between items-center">
                          <button
                            onClick={() => handleEditBlog(post)}
                            className="bg-brown-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-brown-600 hover:ring-2 hover:ring-brown-300 transition duration-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 hover:ring-2 hover:ring-red-300 transition duration-300"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </>
        )}

        {(isCreating || postToEdit) && (
          <>
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleBackToAdmin}
                className="bg-brown-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-brown-700 hover:ring-2 hover:ring-brown-300 transition duration-300"
              >
                Back to Admin
              </button>
              <h2 className="text-2xl font-bold text-white mx-auto">
                {postToEdit ? 'Edit Post' : 'Create a New Blog'}
              </h2>
            </div>
            <BlogPostForm postToEdit={postToEdit} onSave={handleSave} />
          </>
        )}
      </div>
    </div>
  );
};

export default BlogList;
