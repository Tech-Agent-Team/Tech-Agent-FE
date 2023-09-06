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
            backgroundImage: 'url("https://img.freepik.com/free-photo/close-up-tools-workshop_23-2148836011.jpg?size=626&ext=jpg&ga=GA1.1.1442964426.1687759231")',
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
              backgroundColor: 'rgb(174, 125, 91,0.7)', // Brown color with opacity
              width: '50%',
              height: '600px',
              padding: '30px', // Add padding to create space from all sides
              justifyContent: 'space-around',
              alignItems: 'center', // Center content vertically
              margin: '140px', // Add margin to create space around the inner div
              borderRadius: '10%',
              flexDirection: 'column'
            }}>

              <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', }}>
                <div style={{ display: 'flex', justifyContent: 'center' , height:'90%',fontSize:'140%'}}>

                  <img src="/images/default_user.png" style={{ width: '50%' ,}} />
                  <div style={{ marginTop:'10%' ,display: 'flex',flexDirection: 'column',alignItems:'baseline'}}>
                    <h1 className="mb-4 text-4xl font-bold text-center text-orange-400">{data1.username}</h1>
                    <p className="mb-4 text-center text-white">Email: {data1.email}</p>
                    <p className="mb-4 text-center text-white">Phone: {data1.phone}</p>
                    <p className="mb-4 text-center text-white">Location: {data1.location}</p>
                    <p className="text-center text-white">Number of Orders: {data1.num_orders}</p>
                  </div>

                </div>
                <div style={{margin:'auto',width:'40%',marginTop:'10%'}}>
                  <Link href="/UpdateTechnicianProfile">
                    <button className={`${styles.button} text-black cursor-pointer`}>Edit Profile</button>
                  </Link>

                </div>

              </div>



            </div>
          )}

        </div>
        <div>  <Footer style={{ flexShrink: 0 }} /></div>
      </>
    );
  }







};

export default UserProfile;




