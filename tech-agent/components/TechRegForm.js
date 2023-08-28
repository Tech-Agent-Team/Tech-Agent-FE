import React, { useState } from 'react';

const TechRegForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [profession, setProfession] = useState('');
  const [expertise, setExpertise] = useState('');
  const [tailoring, setTailoring] = useState(false);

  const handleRegister = () => {
    // Simulate registration logic here
    console.log('Registering technician:', {
      username,
      email,
      location,
      phone,
      password,
      password2,
      profession,
      expertise,
      tailoring,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Register as Technician</h2>
      <input
        className="w-full p-2 mb-2 border rounded-md"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="w-full p-2 mb-2 border rounded-md"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full p-2 mb-2 border rounded-md"
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        className="w-full p-2 mb-2 border rounded-md"
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        className="w-full p-2 mb-2 border rounded-md"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="w-full p-2 mb-2 border rounded-md"
        type="password"
        placeholder="Confirm Password"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
      />
      <input
        className="w-full p-2 mb-2 border rounded-md"
        type="text"
        placeholder="Profession"
        value={profession}
        onChange={(e) => setProfession(e.target.value)}
      />
      <input
        className="w-full p-2 mb-2 border rounded-md"
        type="text"
        placeholder="Expertise"
        value={expertise}
        onChange={(e) => setExpertise(e.target.value)}
      />
     
      <button
        onClick={handleRegister}
        className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none"
      >
        Register
      </button>
    </div>
  );
};

export default TechRegForm;
