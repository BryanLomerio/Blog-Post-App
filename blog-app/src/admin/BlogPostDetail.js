import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BlogPostDetail() {
  const BASE_URL = 'http://localhost:5000'; 
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!id || hasFetched.current) return;

    const fetchPost = async () => {
      console.log('Fetching post with ID:', id);

      try {
        const response = await axios.get(`${BASE_URL}/api/blogposts/${id}`);
        console.log('API response:', response);
        setPost(response.data);
        setLoading(false);
        hasFetched.current = true;
      } catch (err) {
        console.error('Error fetching post details:', err);
        setError('Failed to load post details. Please try again later.');
        setLoading(false);
      }
    };

    fetchPost();

    hasFetched.current = false;
  }, [id]);

  if (loading) {
    return <div className="text-center text-xl font-bold mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 font-bold mt-10">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
      {post.image_url && (
        <img
          src={`${BASE_URL}${post.image_url}`}
          alt={post.title}
          className="w-full max-h-96 object-cover rounded-lg mb-6"
        />
      )}
      <div className="text-gray-600 text-lg leading-relaxed space-y-4">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-4 pb-20">
        Created on: {new Date(post.created_at).toLocaleDateString()}
      </p>
    </div>
  );
}

export default BlogPostDetail;
