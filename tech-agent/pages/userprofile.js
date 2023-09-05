import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from "js-cookie";
import Header from '../components/Header';
import useResource from '@/Hooks/useResource';
import { useAuth } from '@/context/auth';
import Footer from '@/components/Footer';
import styles from "../styles/techprofile.module.css"; // Import the styles used in TechProfile


const UserProfile = () => {
  const { user, setToken } = useAuth();
  const urlenv = process.env.NEXT_PUBLIC_URL;
  const router = useRouter(); // Initialize the router object
  const url = user ? urlenv + `/api/customer/profile/${user.username}/` : null;
  const { response: data1, error: error1, isLoading } = useResource(url);

  useEffect(() => {
    const tokenFromCookie = Cookies.get("token");
    const initializeAuthStateFromCookies = async () => {
      if (tokenFromCookie) {
        await setToken(tokenFromCookie);
      }
    };
    if (tokenFromCookie && !user) {
      initializeAuthStateFromCookies()
    }
    if (user) {
      if (user.is_technician) {
        router.push('./techprofile'); // Redirect to the technician's home
      }
    }
    else if (!tokenFromCookie && !user) {
      router.push('../');
    }
  }, [user, router]);

  if (user && !user.is_technician) {
    return (
      <>
        <div
          style={{
            backgroundImage: 'url("https://img.freepik.com/free-photo/high-angle-tools-table-arrangement_23-2149916247.jpg?w=996&t=st=1693910421~exp=1693911021~hmac=dd8aeae8fc4bcfa6c3deaea9227d506b3fb9228430368582e987ce2669adefd3")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            // height: '100vh', // Use viewport height to cover the entire viewport
            display: 'flex',
            flexDirection: 'column', // Ensure inner content stacks vertically
            alignItems: 'center', // Center content horizontally
          }}
        // className={styles.loginsection}
        >
          <Header />
          {data1 && (
            <div className={`flex  ${styles.profileContainer}`} style={{
              backgroundColor: 'rgba(139, 69, 19, 0.4)', // Brown color with opacity
              width: '50%',
              height: '600px',
              padding: '30px', // Add padding to create space from all sides
              justifyContent: 'space-around',
              alignItems: 'center', // Center content vertically
              margin: '120px', // Add margin to create space around the inner div
              borderRadius: '10%',
              flexDirection: 'column'
            }}>
              <h1 className="mb-2 text-2xl font-semibold text-center text-orange-400">{data1.username}</h1>
              <p className="mb-4 text-center text-white">Email: {data1.email}</p>
              <p className="mb-4 text-center text-white">Phone: {data1.phone}</p>
              <p className="mb-4 text-center text-white">Location: {data1.location}</p>
              <p className="mb-4 text-center text-white">Is Customer: {data1.is_customer ? "Yes" : "No"}</p>
              <p className="text-center text-white">Number of Orders: {data1.num_orders}</p>
              <Link href="/UpdateTechnicianProfile">
                <button className={`${styles.button} text-black cursor-pointer`}>Edit Profile</button>
              </Link>
            </div>
          )}

        </div>
        <div><Footer /></div>
      </>
    );
  }







};

export default UserProfile;




{/* <div className="min-h-screen bg-gray-100">
<Header />

<div className="max-w-2xl p-6 mx-auto">
  {data1 && (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="mb-2 text-2xl font-semibold text-center">{data1.username}</h1>
      <p className="mb-4 text-center text-gray-600">Email: {data1.email}</p>
      <p className="mb-4 text-center text-gray-600">Phone: {data1.phone}</p>
      <p className="mb-4 text-center text-gray-600">Location: {data1.location}</p>
      <p className="mb-4 text-center text-gray-600">Is Customer: {data1.is_customer ? "Yes" : "No"}</p>
      <p className="text-center text-gray-600">Number of Orders: {data1.num_orders}</p>
      <Link href="/UpdateCustomerProfile">
              <button className="text-black cursor-pointer">Edit Profie</button>
            </Link>
    </div>
  )}
</div>
</div>
);
}  */}