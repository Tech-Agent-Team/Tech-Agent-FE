
import React, { useState, useEffect } from 'react';
import Header from '../components/HeaderTec';
import axios from 'axios'; // Import axios
import { useAuth } from "@/context/auth"
import useResource from '@/Hooks/useResource3';


const acceptedorder = () => {
  const {response} = useResource()

  return (
<div>
  <Header />
  <div className="flex flex-wrap gap-5">
    {response.map(order => (
      <div key={order.id} className="w-1/3 p-4 border">
        <img src={order.image} alt={order.description} className="w-full mb-2" />
        <h3 className="text-lg font-semibold">{order.description}</h3>
        <p>Technician Type: {order.technician_type}</p>
        {order.eta_arrival_time && (
          <p>Estimated Arrival Time: {order.eta_arrival_time}</p>
        )}

        {/* Input field for comments */}
        <input
          type="text"
          placeholder="Add your message"
          className="w-full p-2 mt-3 border"
        />

        {/* Send button */}
        <button className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-md">
          Send
        </button>
      </div>
    ))}
  </div>
</div>

  );
};

export default acceptedorder;
