import React, { useState } from 'react';

import Header from '../components/HeaderUser';
import useResource from '@/Hooks/useResource2';
const customerOrder = () => {
  const { response, deleteResource } = useResource();
  
  const handleDeleteOrder = (orderId) => {
    deleteResource(orderId);
  
  };
  
 
  return (
    <div>
      <Header />
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
      {/* ... (existing code) */}
      <div className="flex justify-between mt-4">
        <button onClick={() => handleDeleteOrder(order.id)} className="px-4 py-2 text-white bg-red-500 rounded-md">Delete</button>
        <button onClick={() => handleUpdateOrder(order.id)} className="px-4 py-2 text-white bg-green-500 rounded-md">Update
       </button>
       
      </div>
    </div>
  )
))}
        </div>
      </div>
    </div>
  );
};
export default customerOrder;