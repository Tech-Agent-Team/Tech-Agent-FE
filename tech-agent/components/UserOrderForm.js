import useResource from '@/Hooks/useResource';
import React, { useState } from 'react';

const UserOrderForm = () => {
  const { createResource } = useResource();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleOrderSubmit = async (event) => {
    event.preventDefault();
    const order = {
      description: event.target.description.value,
      location: event.target.location.value,
      technician_type: event.target.TechnicianType.value,
      image: selectedImage,
      address: event.target.address.value,
    };

    try {
      await createResource(order);
      alert("Your order has been accepted");
    } catch (error) {
      alert("Failed to create order. Please try again.");
    }
  };

  return (
    <form className="w-1/2 p-4 border-r" onSubmit={handleOrderSubmit}>
      <div className="mb-4">
        <label className="block mb-1 text-gray-600 font-semibold">Description</label>
        <input
          className="w-full p-2 border rounded-md"
          type="text"
          placeholder="Enter order description"
          name="description"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-600 font-semibold">Location</label>
        <input
          className="w-full p-2 border rounded-md"
          type="text"
          placeholder="Enter order location"
          name="location"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-600 font-semibold">Technician Type</label>
        <input
          className="w-full p-2 border rounded-md"
          type="text"
          placeholder="Enter technician type"
          name="TechnicianType"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-600 font-semibold">Image</label>
        <input
          className="w-full p-2 border rounded-md"
          type="file" // Change the input type to "file"
          accept="image/*" // Allow only image files
          onChange={handleImageChange} // Handle image change
          name="image"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-600 font-semibold">Address</label>
        <input
          className="w-full p-2 border rounded-md"
          type="text"
          placeholder="Enter address"
          name="address"
        />
      </div>
      <button
        type="submit" // Add type attribute as "submit"
        className="w-full p-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none"
      >
        Create Order
      </button>
    </form>
  );
};

export default UserOrderForm;