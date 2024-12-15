import React, { useState, useEffect } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa'; 
import { IoIosLogOut } from 'react-icons/io'; 
import { FaCloudUploadAlt } from 'react-icons/fa'; 
import { ImBlog } from 'react-icons/im'; 

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false); 
  const navigate = useNavigate();  

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsLoggedIn(false);
    navigate('/login');  
  };

  return (
    <div className="bg-[#93785B] p-4 flex justify-between items-center"> 
      <ul className="flex space-x-6">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => 
              isActive ? 'text-[#3E362E]' : 'text-white hover:text-[#3E362E] transition duration-300'
            }
          >
            Home
          </NavLink> 
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => 
              isActive ? 'text-[#3E362E]' : 'text-white hover:text-[#3E362E] transition duration-300'
            }
          >
            About Me
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/news"
            className={({ isActive }) => 
              isActive ? 'text-[#3E362E]' : 'text-white hover:text-[#3E362E] transition duration-300'
            }
          >
            Gallery
          </NavLink> 
        </li>
      </ul>

      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <div className="relative flex items-center">
            <button
              onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
              className="bg-[#A69080] text-white px-4 py-2 rounded-md hover:bg-[#3E362E] transition duration-200 flex items-center space-x-2"
            >
              <span>Manage</span>
              <FaChevronDown 
                className={`text-white transition-transform ${isAdminDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isAdminDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white text-[#3E362E] rounded-lg shadow-lg p-2 z-50">
                <Link
                  to="/upload-image"
                  className="flex items-center px-4 py-2 text-sm hover:bg-gray-200 rounded space-x-2"
                >
                  <FaCloudUploadAlt className="text-gray-500" />
                  <span>Gallery Upload</span>
                </Link>
                <Link
                  to="/admin/blog-posts"
                  className="flex items-center px-4 py-2 text-sm hover:bg-gray-200 rounded space-x-2"
                >
                  <ImBlog className="text-gray-500" />
                  <span>Blog Upload</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-200 rounded space-x-2"
                >
                  <IoIosLogOut className="text-red-500" />
                  <span>Sign Out </span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-[#A69080] text-[#3E362E] px-4 py-2 rounded-md hover:bg-[#3E362E] transition duration-200"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
