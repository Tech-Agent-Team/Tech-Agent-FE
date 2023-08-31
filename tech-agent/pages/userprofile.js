import React, { useEffect } from 'react';
import Header from "@/components/HeaderUser";
import useResource from '@/Hooks/useResource';
import { useAuth } from '@/context/auth';
const UserProfile = () => {
  const { token,user} = useAuth()
  const urlenv = process.env.NEXT_PUBLIC_URL

  const url = urlenv+`/api/technician/profile/${user.username}/`;
  const { response: data1, error: error1,isLoading } = useResource(url);
  console.log(data1.email)



  return (
      <div>
          <Header />
          {isLoading ? <p>Loading...</p> : <h1>hi{data1.email}</h1>}
      </div>
  );
};

export default UserProfile;

