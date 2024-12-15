import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BlogPostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/blogposts/${id}`);
          console.log('Fetched post:', response.data); // Add this log to check the data
          setPost(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching the post:', error);
          setError('Failed to load blog post');
          setLoading(false);
        }
      };
      
    fetchPost();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <p className="text-gray-500 text-sm mt-2">Created on: {post.created_at}</p>
      {post.image_url && (
        <img src={`http://localhost:5000${post.image_url}`} alt={post.title} className="w-full h-48 object-cover mt-4" />
      )}
      <p className="mt-4">{post.content}</p>
    </div>
  );
}

export default BlogPostDetail;
