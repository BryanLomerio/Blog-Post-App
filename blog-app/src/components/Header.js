import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token is present in localStorage
    const token = localStorage.getItem('token'); 
    setIsLoggedIn(!!token);  // If token exists, user is logged in
  }, []);

  return (
    <div className="bg-blue-600 p-4 flex justify-between items-center">
      <ul className="flex space-x-6">
        <li>
          <Link to="/" className="text-white hover:text-blue-300 transition duration-300">Home</Link>
        </li>
        <li>
          <Link to="/about" className="text-white hover:text-blue-300 transition duration-300">About Me</Link>
        </li>
        <li>
          <Link to="/news" className="text-white hover:text-blue-300 transition duration-300">News and Articles</Link>
        </li>
      </ul>

      <div>
        {isLoggedIn ? (
          <Link
            to="/admin"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Admin
          </Link>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
