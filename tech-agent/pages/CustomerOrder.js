
import React, { useState, useEffect } from 'react';
import Header from '../components/HeaderUser';
import axios from 'axios'; // Import axios
import { useAuth } from "@/context/auth"
import useResource from '@/Hooks/useResource2';


const customerOrder = () => {
  const {response} = useResource()


  return (
<div>
  <Header />

  <div className="flex flex-wrap gap-5"> {/* Flex container with gap */}
    {response.map(order => (
      <div key={order.id} className="w-1/3 p-4 border"> {/* Card styling */}
        <img src={order.image} alt={order.description} className="w-full mb-2" /> {/* Image styling */}
        <h3 className="text-lg font-semibold">{order.description}</h3>
        <p>Technician Type: {order.technician_type}</p>
        <p>Address: {order.address}</p>
        <p>Creation Timestamp: {order.created_at}</p>
        {order.eta_arrival_time && (
          <p>Estimated Arrival Time: {order.eta_arrival_time}</p>
        )}
      </div>
    ))}
  </div>
</div>


  );
};

export default customerOrder;
