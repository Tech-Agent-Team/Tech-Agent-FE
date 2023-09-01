import React, { useEffect } from 'react';

import UserOrderForm from '../components/ElectricianImage';
import ElectricianImage from '../components/UserOrderForm';
import Header from '@/components/HeaderUser';
import { useRouter } from 'next/router'; // Import the useRouter hook
import { useAuth } from '@/context/auth';

const UserHome = () => {
  const { user } = useAuth();

  const router = useRouter(); // Initialize the router object

  useEffect(() => {
    // Check if the user is authenticated and their role
    if (user) {
      if (user.is_technician) {
        router.push('./TechHome'); // Redirect to the technician's home
      }
    }
    else {
      router.push('../');
    }
  }, [user, router]);

  if (user) {
    if (!user.is_technician) {
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
};}}

export default UserHome;