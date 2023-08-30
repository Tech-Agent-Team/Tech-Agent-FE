import React from 'react';
import Header from '../components/HeaderTec';
import useResource from '@/Hooks/useResource';

const TechHome = () => {
  const { createResource3, response } = useResource();

  const handleSubmit = async (event, id) => {
    event.preventDefault();
    const arrivalTime = {
      eta_arrival_time: event.target.eta_arrival_time.value,

    };
    console.log(arrivalTime.eta_arrival_time)
    createResource3(arrivalTime, id);
    alert("hi")
  };
  return (
    <div>
      <Header />
      <div className="gap-5 flex-c"> {/* Flex container with gap */}
        {response.map(order => (
          <div key={order.id} className="w-1/3 p-4 border"> {/* Card styling */}
            <img src={order.image} alt={order.description} className="w-full mb-2" /> {/* Image styling */}
            <h2 className="text-lg font-semibold">{order.description}</h2>
            <p>Technician Type: {order.technician_type}</p>
            {order.eta_arrival_time && (
              <p>ETA Arrival Time: {order.eta_arrival_time}</p>
            )}

            <form onSubmit={event => handleSubmit(event, order.id)}>
              <input
                type="datetime-local"
                placeholder="Arrival Time"
                className="w-full p-2 mt-2 border rounded-md"
                name="eta_arrival_time"
              />
              <button className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-md" type="submit">
                Accept
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>




  );
};

export default TechHome;