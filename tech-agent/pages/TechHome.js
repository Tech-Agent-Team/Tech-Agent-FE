import React from 'react';
import Header from '../components/Header';
import useResource from '@/Hooks/useResource';

const UserHome = () => {
  const { response } = useResource();

  return (
    <div>
      <Header />
      <div className="order-cards">
        {response.map(order => (
          <div key={order.id} className="order-card">
            <img src={order.image} alt={order.description} />
            <h2>{order.description}</h2>
            <p>Technician Type: {order.technician_type}</p>
            {order.eta_arrival_time && (
              <p>ETA Arrival Time: {order.eta_arrival_time}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHome;