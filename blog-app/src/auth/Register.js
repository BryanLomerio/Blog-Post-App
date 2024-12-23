import React, { useState } from 'react';
import { registerUser } from '../api/api'; 

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(username, email, password);
      setMessage(data.message);
    } catch (error) {
      setError(error.message); 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#865D36] bg-opacity-50">
      <div className="w-full max-w-md px-4 py-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#3E362E]">Create an Account</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium text-[#3E362E]">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full mt-2 px-4 py-3 border border-[#A69080] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3E362E]"
            />
          </div>
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
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-[#3E362E]">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-2 px-4 py-3 border border-[#A69080] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3E362E]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-[#A69080] text-white font-semibold rounded-md hover:bg-[#3E362E] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#3E362E]"
          >
            Register
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-sm text-center">{error}</p>}
        {message && <p className="mt-4 text-green-500 text-sm text-center">{message}</p>}

        <div className="mt-6 text-center">
          <p className="text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-[#A69080] hover:text-[#3E362E]">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
