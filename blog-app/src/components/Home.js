import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

function Home() {
  const [latestPosts, setLatestPosts] = useState([]);
  const [olderPosts, setOlderPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogposts');
        const posts = response.data;

        const currentDate = moment();
        const latest = [];
        const older = [];

        posts.forEach(post => {
          const createdAt = moment(post.created_at);
          const diffInDays = currentDate.diff(createdAt, 'days');

          if (diffInDays <= 2) {
            latest.push(post);
          } else {
            older.push(post);
          }
        });

        setLatestPosts(latest);
        setOlderPosts(older);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Latest Blog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            {post.image_url && (
              <img
                src={`http://localhost:5000${post.image_url}`}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-semibold text-xl">{post.title}</h3>
              <p className="text-gray-600 mt-2">{post.content.slice(0, 100)}...</p>
              <p className="text-sm text-gray-500">Created on: {moment(post.created_at).format('MMM D, YYYY')}</p>
              <Link to={`/post/${post.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 mt-4">
                View
              </Link>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4">Blog Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {olderPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            {post.image_url && (
              <img
                src={`http://localhost:5000${post.image_url}`}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-semibold text-xl">{post.title}</h3>
              <p className="text-gray-600 mt-2">{post.content.slice(0, 100)}...</p>
              <p className="text-sm text-gray-500">Created on: {moment(post.created_at).format('MMM D, YYYY')}</p>
              <Link to={`/post/${post.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 mt-4">
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
