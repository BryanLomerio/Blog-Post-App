import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { ImBlog } from 'react-icons/im';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleNavigation = (path) => {
    setIsAdminDropdownOpen(false);
    navigate(path);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsAdminDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[#4A403A] p-5 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <nav>
          <ul className="flex space-x-8">
            {[ 
              { name: 'Home', path: '/' },
              { name: 'About Me', path: '/about' },
              { name: 'Gallery', path: '/news' },
            ].map(({ name, path }) => (
              <li key={name}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-white bg-[#7A6F64] px-3 py-2 rounded-md shadow hover:bg-[#7A6F64] hover:scale-105 transition-all'
                      : 'text-gray-300 rounded-md hover:text-white hover:bg-[#7A6F64] px-3 py-2 transition-all hover:scale-105'
                  }
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center space-x-6">
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                className="bg-[#7A6F64] text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-[#635A51] transition duration-300"
              >
                <span>Manage</span>
                <FaChevronDown
                  className={`text-white transform transition-transform ${isAdminDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Admin Dropdown */}
              {isAdminDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white text-[#4A403A] rounded-md shadow-lg overflow-hidden z-50">
                  <ul>
                    <li>
                      <button
                        onClick={() => handleNavigation('/upload-image')}
                        className="flex items-center w-full px-4 py-3 text-sm hover:bg-[#7A6F64] hover:text-white transition-colors space-x-2"
                      >
                        <FaCloudUploadAlt className="text-gray-500" />
                        <span>Gallery Upload</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleNavigation('/admin/blog-posts')}
                        className="flex items-center w-full px-4 py-3 text-sm hover:bg-[#7A6F64] hover:text-white transition-colors space-x-2"
                      >
                        <ImBlog className="text-gray-500" />
                        <span>Manage Blog</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-3 text-sm hover:bg-[#7A6F64] hover:text-white transition-colors space-x-2"
                      >
                        <IoIosLogOut className="text-red-500" />
                        <span>Sign Out</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-[#7A6F64] text-white px-4 py-2 rounded-md hover:bg-[#7A6F64] transition duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
