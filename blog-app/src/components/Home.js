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
      <h1 className="text-3xl font-bold mb-6 text-center">Latest Blog</h1>
      {latestPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 justify-center">
          {latestPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden max-w-xs mx-auto text-center">
              {post.image_url && (
                <img
                  src={`http://localhost:5000${post.image_url}`}
                  alt={post.title}
                  className="w-full h-40 object-cover"
                />
              )}
            <div className="p-4">
  <h3 className="font-semibold text-xl">{post.title}</h3>
  <p className="text-gray-600 mt-2">{post.content.slice(0, 80)}...</p>
  <p className="text-sm text-gray-500 mb-4 text-left mt-2"> 
    Created on: {moment(post.created_at).format('MMM D, YYYY')}
  </p>
  <Link
    to={`/post/${post.id}`}
    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 w-full"
  >
    Read
  </Link>
</div>


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
            <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden max-w-xs mx-auto text-center">
            {post.image_url && (
              <img
                src={`http://localhost:5000${post.image_url}`}
                alt={post.title}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-semibold text-xl">{post.title}</h3>
              <p className="text-gray-600 mt-2">{post.content.slice(0, 80)}...</p>
              <p className="text-sm text-gray-500 mt-4">
                Created on: {moment(post.created_at).format('MMM D, YYYY')}
              </p>
              <div className="mt-4 mb-4"> {/* Added margin-bottom to create space between the button and text */}
                <Link
                  to={`/post/${post.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 w-full" // Ensures button takes full width
                >
                  Read
                </Link>
              </div>
            </div>
          </div>
          
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No older blog posts available.</p>
      )}
    </div>
  );
}

export default Home;
