import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getBlogPosts, deleteBlogPost } from '../api';
import BlogPostForm from './BlogPostForm';

const BlogList = ({ onEdit }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const posts = await getBlogPosts();
      setBlogPosts(posts);
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
  };

  const handleSave = () => {
    setIsCreating(false);
  };

  return (
    <div>
      {!isCreating && (
        <>
          <h2 className="text-2xl font-bold mb-4">Blog Posts</h2>
          <div className="mb-4">
            <button
              onClick={handleCreateNewBlog}
              className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition duration-200"
            >
              Create New Blog
            </button>
          </div>

          {/* List of blog posts */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map(post => (
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
                  <p className="text-gray-600 mt-2">{post.content}</p>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => onEdit(post)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
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

      {isCreating && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Create a New Blog</h2>
          <BlogPostForm onSave={handleSave} />
        </div>
      )}
    </div>
  );
};

export default BlogList;
