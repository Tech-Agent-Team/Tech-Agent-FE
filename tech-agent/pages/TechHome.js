import React from 'react';
import UserOrderForm from '../components/ElectricianImage';
import ElectricianImage from '../components/UserOrderForm';
import Header from '../components/Header';
const TechHome = () => {
  return (
    <div>
    <Header />

   <div className="flex items-center justify-center min-h-screen">
             

      <div className="flex w-full max-w-screen-xl p-8 mx-auto">
     
         
        <UserOrderForm />
        <ElectricianImage />
      </div>
    </div>
    </div>
  );
};

export default TechHome;
