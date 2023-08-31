import React from 'react';
import Header from '../components/HeaderUser';
import useResource from '@/Hooks/useResource2';
import { useState } from 'react'
const customerOrder = () => {
  const { response, deleteResource, updateResource } = useResource();
  const handleDeleteOrder = (orderId) => {
    deleteResource(orderId);
  };
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateClick = async (orderId) => {
    console.log(2222222,orderId)
    try {
      // Prepare the updated data from the form
      const updatedData = {
        description: formData.description,
        location: formData.location,
        technician_type: formData.technician_type,
        image: formData.image,
        address: formData.address,
      };
      
      // Call the updateResource function with the orderId
      await updateResource(orderId, updatedData);

      // If the update is successful, you can close the popup
      setShowModal(false);
    } catch (error) {
      console.error("Error updating resource:", error);
    }
  };

  return (
    <div className="relative">
      <Header />
      {showModal ? (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <label className="block mb-2">
              Description:
              <input
                type="text"
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                className="block w-full border border-gray-300 p-2 rounded-md"
              />
            </label>
            <label className="block mb-2">
              Location:
              <input
                type="text"
                name="location"
                value={formData.location || ''}
                onChange={handleInputChange}
                className="block w-full border border-gray-300 p-2 rounded-md"
              />
            </label>
            <label className="block mb-2">
              Technician Type:
              <input
                type="text"
                name="technician_type"
                value={formData.technician_type || ''}
                onChange={handleInputChange}
                className="block w-full border border-gray-300 p-2 rounded-md"
              />
            </label>
            <label className="block mb-2">
              Image:
              <input
                type="text"
                name="image"
                value={formData.image || ''}
                onChange={handleInputChange}
                className="block w-full border border-gray-300 p-2 rounded-md"
              />
            </label>
            <label className="block mb-2">
              Address:
              <input
                type="text"
                name="address"
                value={formData.address || ''}
                onChange={handleInputChange}
                className="block w-full border border-gray-300 p-2 rounded-md"
              />
            </label>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="px-4 py-2 text-white bg-blue-500 rounded-md"
                onClick={() => handleUpdateClick(order.id)} // Pass the order.id here
              >
                Update
              </button>
              <button
                className="px-4 py-2 text-white bg-red-500 rounded-md"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div className="bg-red">
        <div className="pb-2 mb-8 border-b">Accepted Orders</div> {/* Category title */}
        <div className="flex flex-wrap gap-5">
          {response.map(order => (
            order.state_is_ongoing && (
              <div key={order.id} className="w-1/3 p-4 border">
                {/* Card content */}
                <img src={order.image} alt={order.description} className="w-full mb-2" />
                <h3 className="text-lg font-semibold">{order.description}</h3>
                <p>Technician Type: {order.technician_type}</p>
                <p>Address: {order.address}</p>
                <p>Creation Timestamp: {order.created_at}</p>
                {order.eta_arrival_time && (
                  <p>Estimated Arrival Time: {order.eta_arrival_time}</p>
                )}
                <div className="flex justify-between mt-4">
                  <button onClick={() => handleDeleteOrder(order.id)} className="px-4 py-2 text-white bg-red-500 rounded-md">Delete</button>
                  <button onClick={() => handleRateOrder(order.id)} className="px-4 py-2 text-white bg-green-500 rounded-md">Done</button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
      <div className="mt-8 bg-red">
        <div className="pb-2 mb-8 border-b">Panding order</div> {/* Category title */}
        <div className="flex flex-wrap gap-5">
          {response.map(order => (
            !order.state_is_ongoing && (
              <div key={order.id} className="w-1/3 p-4 border">
                {/* Card content */}
                <img src={order.image} alt={order.description} className="w-full mb-2" />
                <h3 className="text-lg font-semibold">{order.description}</h3>
                <p>Technician Type: {order.technician_type}</p>
                <p>Address: {order.address}</p>
                <p>Creation Timestamp: {order.created_at}</p>
                {order.eta_arrival_time && (
                  <p>Estimated Arrival Time: {order.eta_arrival_time}</p>
                )}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="px-4 py-2 text-white bg-red-500 rounded-md"
                  >
                    Delete
                  </button>
                  <div>
                    <button
                      type="button"
                      className="px-4 py-2 text-white bg-blue-500 rounded-md"
                      onClick={() => setShowModal(true)}
                    >
                      Update
                    </button>
                  </div>
                </div>

              </div>
            )
          ))}

        </div>
      </div>
    </div>
  )
};


export default customerOrder;