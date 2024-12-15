import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa'; 

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();  

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    if (token) {
      const userData = {
        username: 'Bryan',
        profileImage: 'https://via.placeholder.com/40',
      };
      setUser(userData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsLoggedIn(false);
    setUser(null);
    navigate('/login');  
  };

  return (
    <div className="bg-[#93785B] p-4 flex justify-between items-center"> 
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

      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>

            {user && (
              <div className="relative flex items-center space-x-2">
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}  
                />
                <span className="text-white font-semibold">{user.username}</span>
                <FaChevronDown 
                  className={`text-white ml-2 cursor-pointer transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}  
                />

                {isDropdownOpen && (
                 <div className="absolute right-0 top-full mt-2 w-48 bg-white text-[#3E362E] rounded-lg shadow-lg p-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-200 rounded"
                    >
                      Profile Settings
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
            )}

            <Link
              to="/admin"
              className="bg-[#A69080] text-white px-4 py-2 rounded-md hover:bg-[#3E362E] transition duration-200"  
            >
              Admin
            </Link>
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
