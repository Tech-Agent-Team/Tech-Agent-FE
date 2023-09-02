import Header from '../components/Header';
import useResource from '@/Hooks/useResource';
import { useAuth } from '@/context/auth';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router'; // Import the useRouter hook
import Link from 'next/link'; // Import Link

const TechProfile = () => {
  const { user } = useAuth();
  const urlenv = process.env.NEXT_PUBLIC_URL;
  const url = `${urlenv}/api/technician/profile/${user.username}/`;
  const { response: data1, error: error1 } = useResource(url);
  const router = useRouter(); // Initialize the router object

  useEffect(() => {
    // Check if the user is authenticated and their role
    if (user) {
      if (!user.is_technician) {
        router.push('./userprofile'); // Redirect to the technician's home
      }
    } else {
      router.push('../');
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      {/* {console.log(data1,user.username)} */}
      <div>
        {data1?.user?.username === user.username ? (
          <div className="max-w-2xl p-6 mx-auto">
            {data1 && data1.user && (
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <img
                  src={data1.image}
                  alt="User Avatar"
                  className="w-32 h-32 mx-auto mb-4 rounded-full"
                />
                <h1 className="mb-2 text-2xl font-semibold text-center">{data1.user.username}</h1>
                <p className="mb-4 text-center text-gray-600">Profession: {data1.profession}</p>
                <p className="mb-4 text-gray-600">Description: {data1.description}</p>
                <p className="text-gray-600">Average Rating: {data1.average_rating}</p>
                <Link href="/UpdateTechnicianProfile">
                  <button className="text-black cursor-pointer">Edit Profile</button>
                </Link>
              </div>
            )}

            {error1 && (
              <div className="text-red-500">Error loading profile data: {error1.message}</div>
            )}
          </div>
        ) : (
          <div className="max-w-2xl p-6 mx-auto">
            {data1 && data1.user && (
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <img
                  src={data1.image}
                  alt="User Avatar"
                  className="w-32 h-32 mx-auto mb-4 rounded-full"
                />
                <h1 className="mb-2 text-2xl font-semibold text-center">{data1.user.username}</h1>
                <p className="mb-4 text-center text-gray-600">Profession: {data1.profession}</p>
                <p className="mb-4 text-gray-600">Description: {data1.description}</p>
                <p className="text-gray-600">Average Rating: {data1.average_rating}</p>
              </div>
            )}

            {error1 && (
              <div className="text-red-500">Error loading profile data: {error1.message}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TechProfile;
