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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? 'text' : 'password'} 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(prevState => !prevState)} 
              className="absolute right-3 text-gray-500 mt-5"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />} 
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading} 
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-sm text-center">{error}</p>}

        <div className="mt-6 text-center">
          <button
            onClick={handleRegisterRedirect}
            className="text-blue-600 hover:text-blue-800 focus:outline-none"
          >
            Don't have an account? Register here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
