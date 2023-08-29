import React from 'react';
import UserOrderForm from '../components/ElectricianImage';
import ElectricianImage from '../components/UserOrderForm';
import UserRegPage from './UserRegPage';
import Header from '../components/Header';
const UserHome = () => {
  return (
    <div>
    <Header />

   <div className="flex justify-center items-center min-h-screen">
             

      <div className="flex w-full max-w-screen-xl mx-auto p-8">
     
         
        <UserOrderForm />
        <ElectricianImage />
      </div>
    </div>
    </div>
  );
};

export default UserHome;
