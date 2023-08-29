import React, { useState } from 'react';
import Link from 'next/link';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simulate login logic here
    console.log('Logging in with:', username, password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Log In</h2>
        <div className="mb-4">
          <label className="block mb-1 text-gray-600 font-semibold">Username</label>
          <input
            className="w-full p-2 rounded-md border"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-600 font-semibold">Password</label>
          <input
            className="w-full p-2 rounded-md border"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none"
        >
          Login
        </button>
        <p className="text-center mt-4 text-black">Don't have an account?</p>
        <div className="flex justify-between">
          <Link href="/TechRegPage" legacyBehavior>
            <a className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none mr-1 wider whitespace-nowrap">
              Register as Technician
            </a>
          </Link>
          <Link href="/UserRegPage" legacyBehavior>
            <a className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none ml-1 wider whitespace-nowrap">
              Register as customer
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;