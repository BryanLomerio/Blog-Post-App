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
    // Log a styled message in the console
    console.log(
      '%cFollow mmy Github: BryanLomerio',
      'font-size: 36px; color: white; background: linear-gradient(to right, #ff7f50, #ff1493); font-weight: bold; padding: 10px; border-radius: 5px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);'
    );
  }, []);
  
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogposts');
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
    <div className="flex justify-center items-center py-8">
      <div className="w-full max-w-4xl px-4">
        <h1 className="text-3xl font-bold mb-6 text-center mt-10">Latest Blog</h1>
        {latestPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {latestPosts.map((post) => (
              <div
                key={post.id}
                className="relative bg-[#865D36] bg-opacity-50 text-white rounded-lg shadow-lg overflow-hidden max-w-xs mx-auto text-center group"
              >
                {post.image_url && (
                  <img
                    src={`http://localhost:5000${post.image_url}`}
                    alt={post.title}
                    className="w-full h-32 object-cover"
                  />
                )}
                <div className="p-3 relative z-10">
                  <h3 className="text-[#3E362E] font-semibold text-lg">{post.title}</h3>
                  <p className="text-white mt-2">
                    {post.content.length > 100 ? `${post.content.slice(0, 100)}...` : post.content}
                  </p>
                  <div className="mt-4 mb-2">
                    <Link
                      to={`/post/${post.id}`}
                      className="bg-[#A69080] text-white px-4 py-2 rounded-md hover:bg-[#3E362E] transition duration-200 w-full"
                    >
                      Read
                    </Link>
                  </div>
                </div>
                <div className="bottom-0 flex justify-between items-center mt-4 px-3 py-2">
                  <div className="flex-1">
                    <p className="bottom-0 text-sm text-[#CDC5BD] bg-[#3E362E] bg-opacity-80 px-2 py-1 rounded-tr-md">
                      Created on: {moment(post.created_at).format('MMM D, YYYY')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic text-center mx-auto">No recent blog posts available.</p>

        )}

        <h2 className="text-2xl font-bold mt-12 mb-4 text-center">Older Blog Posts</h2>
        {olderPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {olderPosts.map((post) => (
              <div
                key={post.id}
                className="relative bg-[#865D36] bg-opacity-50 text-white rounded-lg shadow-lg overflow-hidden max-w-xs mx-auto text-center group"
              >
                {post.image_url && (
                  <img
                    src={`http://localhost:5000${post.image_url}`}
                    alt={post.title}
                    className="w-full h-32 object-cover"
                  />
                )}
                <div className="p-3 relative z-10">
                  <h3 className="text-[#3E362E] font-semibold text-lg">{post.title}</h3>
                  <p className="text-[#CDC5BD] mt-2">
                    {post.content.length > 100 ? `${post.content.slice(0, 100)}...` : post.content}
                  </p>
                  <div className="mt-4 mb-2">
                    <Link
                      to={`/post/${post.id}`}
                      className="bg-[#A69080] text-white px-4 py-2 rounded-md hover:bg-[#3E362E] transition duration-200 w-full"
                    >
                      Read
                    </Link>
                  </div>
                </div>

                <div className="relative bottom-0 left-0 w-full bg-[#3E362E] bg-opacity-80 px-2 py-1 rounded-tr-md">
                  <div className="flex-1">
                    <p className="bottom-0 text-sm text-[#CDC5BD] bg-[#3E362E] bg-opacity-80 px-2 py-1 rounded-tr-md">
                      Created on: {moment(post.created_at).format('MMM D, YYYY')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white italic text-center">No older blog posts available.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
