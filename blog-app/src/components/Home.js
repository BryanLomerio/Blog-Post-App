import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

function Home() {
  const [latestPosts, setLatestPosts] = useState([]);
  const [olderPosts, setOlderPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        console.log('Fetching blog posts...');
        const response = await axios.get('http://localhost:5000/api/blogposts');
        console.log('API response data:', response.data);
        const posts = response.data;
        const currentDate = moment();
        const latest = [];
        const older = [];

        posts.forEach((post) => {
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
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return <div className="text-center text-xl font-bold mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 font-bold mt-10">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center mt-10">Latest Blog</h1>
      {latestPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 justify-center">
          {latestPosts.map((post) => (
            <div
              key={post.id}
              className="bg-[#865D36] bg-opacity-50 text-white rounded-lg shadow-lg overflow-hidden max-w-xs mx-auto text-center relative group"
            >
              {post.image_url && (
                <img
                  src={`http://localhost:5000${post.image_url}`}
                  alt={post.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4 relative z-10">
                <h3 className="font-semibold text-xl">{post.title}</h3>
                <p className="text-white mt-2">
                  {post.content.length > 100 ? `${post.content.slice(0, 100)}...` : post.content}
                </p>
                <p className="text-sm text-white mb-4 text-left mt-2">
                  Created on: {moment(post.created_at).format('MMM D, YYYY')}
                </p>
                <Link
                  to={`/post/${post.id}`}
                  className="bg-[#A69080] text-white px-4 py-2 rounded-md hover:bg-[#3E362E] transition duration-200 w-full"
                >
                  Read
                </Link>
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-0"></div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No recent blog posts available.</p>
      )}

      <h2 className="text-2xl font-bold mt-12 mb-4 text-center">Older Blog Posts</h2>
      {olderPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 justify-center">
          {olderPosts.map((post) => (
            <div
              key={post.id}
              className="bg-[#865D36] text-white rounded-lg shadow-lg overflow-hidden max-w-xs mx-auto text-center relative group"
            >
              {post.image_url && (
                <img
                  src={`http://localhost:5000${post.image_url}`}
                  alt={post.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4 relative z-10">
                <h3 className="font-semibold text-xl">{post.title}</h3>
                <p className="text-white mt-2">
                  {post.content.slice(0, 80)}...
                </p>
                <p className="text-sm text-white mt-4">
                  Created on: {moment(post.created_at).format('MMM D, YYYY')}
                </p>
                <div className="mt-4 mb-4">
                  <Link
                    to={`/post/${post.id}`}
                    className="bg-[#A69080] text-white px-4 py-2 rounded-md hover:bg-[#3E362E] transition duration-200 w-full"
                  >
                    Read
                  </Link>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-0"></div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white italic text-center">No older blog posts available.</p>
      )}
    </div>
  );
}

export default Home;
