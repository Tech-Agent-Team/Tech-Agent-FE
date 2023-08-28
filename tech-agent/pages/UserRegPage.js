import React from 'react';
import { useRouter } from 'next/router';
import UserRegForm from   '../components/UserRegForm'
import Header  from '@/components/Header';
const UserRegPage = () => {
  const router = useRouter();

  const handleRegistrationComplete = () => {
    // This function will be called when registration is successfully completed
    // Redirect to User Home page
    router.push('/userHome'); // Redirect to the userHome page
  };

  return (
    <div>
      <Header />
      <h1>Register as User</h1>
      <UserRegForm onRegistrationComplete={handleRegistrationComplete} />
      <button
        onClick={() => router.push('/userHome')}
        className="text-white cursor-pointer"
      >
        Go to User Home
      </button>
    </div>
  );
};

export default UserRegPage;
