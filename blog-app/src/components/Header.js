import React, { useState, useEffect } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa'; 

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
          <>
            <div className="relative flex items-center">
              <button
                onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                className="bg-[#A69080] text-white px-4 py-2 rounded-md hover:bg-[#3E362E] transition duration-200 flex items-center space-x-2"
              >
                <span>Admin</span>
                <FaChevronDown 
                  className={`text-white transition-transform ${isAdminDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isAdminDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white text-[#3E362E] rounded-lg shadow-lg p-2 z-50">
                  <Link
                    to="/upload-image"
                    className="block px-4 py-2 text-sm hover:bg-gray-200 rounded"
                  >
                    Upload Image Gallery
                  </Link>
                  <Link
                    to="/admin/blog-posts"
                    className="block px-4 py-2 text-sm hover:bg-gray-200 rounded"
                  >
                    Upload Blog
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200 rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
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
