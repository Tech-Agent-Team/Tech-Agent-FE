import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const handleLogin = () => {
    // Simulate login logic here
    console.log('Logging in with:', username, password);
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Log In</h2>
      <input
        className="w-full p-2 mb-2 border rounded-md"
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="w-full p-2 mb-2 border rounded-md"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full p-2 mb-2 border rounded-md"
        type="text"
        placeholder="Enter your location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        className="w-full p-2 mb-2 border rounded-md"
        type="text"
        placeholder="Enter your phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        className="w-full p-2 mb-2 border rounded-md"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="w-full p-2 mb-2 border rounded-md"
        type="password"
        placeholder="Confirm your password"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none"
      >
        Register
      </button>
      
    </div>
  );
};

export default LoginForm;
