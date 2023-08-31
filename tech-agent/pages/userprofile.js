import React, { useEffect } from 'react';
import Header from "@/components/HeaderUser";
import useResource from '@/Hooks/useResource5';

const UserProfile = () => {
  const { response, isLoading } = useResource();

  useEffect(() => {
      console.log('Response:', response);
  }, [response]);

  return (
      <div>
          <Header />
          {isLoading ? <p>Loading...</p> : <h1>hi</h1>}
      </div>
  );
};

export default UserProfile;

