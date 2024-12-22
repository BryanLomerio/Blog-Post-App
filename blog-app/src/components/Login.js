import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); 

    // 2-second delay 
    setTimeout(async () => {
      try {
        const data = await loginUser(email, password);
        localStorage.setItem('token', data.token);
        setIsLoading(false); 

        navigate('/'); 
      } catch (error) {
        setIsLoading(false); 
        setError(error.message || 'Something went wrong, please try again.');
      }
    }, 2000); 
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#865D36] bg-opacity-50">
      <div className="w-full max-w-md px-4 py-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#3E362E]">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-[#3E362E]">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-2 px-4 py-3 border border-[#A69080] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3E362E]"
            />
          </div>

          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-sm font-medium text-[#3E362E]">Password</label>
            <input
              type={showPassword ? 'text' : 'password'} 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-2 px-4 py-3 border border-[#A69080] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3E362E]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(prevState => !prevState)} 
              className="absolute right-3 text-[#3E362E] mt-6"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />} 
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-[#A69080] text-white font-semibold rounded-md hover:bg-[#3E362E] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#3E362E]"
            disabled={isLoading} 
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <svg className="animate-spin h-6 w-6 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 8 8 8 8 0 0 1-8-8z"></path>
                </svg>
                Logging in...
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-sm text-center">{error}</p>}

        <div className="mt-6 text-center">
          <button
            onClick={handleRegisterRedirect}
            className="text-[#A69080] hover:text-[#3E362E] focus:outline-none"
          >
            Don't have an account? Register here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
