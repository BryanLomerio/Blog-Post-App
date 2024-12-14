import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="bg-blue-600 p-4">
      <ul className="flex space-x-6 justify-center">
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
    </div>
  );
}

export default Header;
