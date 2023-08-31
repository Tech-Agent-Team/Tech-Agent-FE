import React, { useState, useEffect } from 'react';
import Header from '../components/HeaderTec';

import useResource from '@/Hooks/useResource';


const acceptedorder = () => {
  const urlenv = process.env.NEXT_PUBLIC_URL

  const url = urlenv+'/api/technician/techacceptedlist/';
  const { response: data1, error: error1, createResource4 } = useResource(url);
  const handleSubmit = async (event, id) => {
    event.preventDefault();
    const message = {
      comments: event.target.message.value,

    };

    createResource4(message, id);
    alert("hi")
    event.target.reset();
  };

  return (
    <div>
      <Header />
      <div className="flex flex-wrap gap-5">
        {data1.map(order => (
          <div key={order.id} className="w-1/3 p-4 border">
            <img src={order.image} alt={order.description} className="w-full mb-2" />
            <h3 className="text-lg font-semibold">{order.description}</h3>
            <div>
              {order.comments && order.comments.map(comment => (
                <div key={comment.id}>
                  <h3 className="text-lg font-semibold">{`${comment.sender}: ${comment.body}`}</h3>
                  {/* Render other comment properties as needed */}
                </div>
              ))}

            </div>
            <p>Technician Type: {order.technician_type}</p>
            {order.eta_arrival_time && (
              <p>Estimated Arrival Time: {order.eta_arrival_time}</p>
            )}

            <form onSubmit={event => handleSubmit(event, order.id)}>
              <input
                type="text"
                placeholder="Add your message"
                className="w-full p-2 mt-2 border rounded-md"
                name="message"
              />
              <button className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-md" type="submit">
                Send
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default acceptedorder;
