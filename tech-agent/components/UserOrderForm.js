import React, { useState } from 'react';

const UserOrderForm = () => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [technicianType, setTechnicianType] = useState('');
  const [image, setImage] = useState('');
  const [address, setAddress] = useState('');

  const handleOrderSubmit = () => {
    // Handle order submission logic here
    console.log('Order details:', {
      description,
      location,
      technicianType,
      image,
      address,
    });
  };

  return (
    <form className="w-1/2 p-4 border-r">
      <div className="mb-4">
        <label className="block mb-1 text-gray-600 font-semibold">Description</label>
        <input
          className="w-full p-2 border rounded-md"
          type="text"
          placeholder="Enter order description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-600 font-semibold">Location</label>
        <input
          className="w-full p-2 border rounded-md"
          type="text"
          placeholder="Enter order location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-600 font-semibold">Technician Type</label>
        <input
          className="w-full p-2 border rounded-md"
          type="text"
          placeholder="Enter technician type"
          value={technicianType}
          onChange={(e) => setTechnicianType(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-600 font-semibold">Image</label>
        <input
          className="w-full p-2 border rounded-md"
          type="text"
          placeholder="Enter image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-600 font-semibold">Address</label>
        <input
          className="w-full p-2 border rounded-md"
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <button
        onClick={handleOrderSubmit}
        className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none"
      >
        Create Order
      </button>
    </form>
  );
};

export default UserOrderForm;
