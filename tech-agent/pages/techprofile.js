import Header from '../components/Header';
import useResource from '@/Hooks/useResource';
// import styles from '../styles/login.module.css'; // Import your CSS module

import { useAuth } from '@/context/auth';
import React, { useEffect, useState } from 'react'; // Import useState
import { useRouter } from 'next/router'; // Import the useRouter hook
import Cookies from "js-cookie"; // Import Cookies
import Link from 'next/link'; // Import Link
import Footer from '@/components/Footer';
import styles from "../styles/techprofile.module.css";


const TechProfile = () => {
  const { user, setToken } = useAuth();
  const imageurl = "http://res.cloudinary.com/dt0dx45wy/"
  const urlenv = process.env.NEXT_PUBLIC_URL;
  const url = user ? `${urlenv}/api/technician/profile/${user.username}/` : null;
  const { response: data1, error: error1 } = useResource(url);

  const router = useRouter(); // Initialize the router object


    const [isHovered, setIsHovered] = useState(false);
  
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    }
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
      if (user && !user.is_technician) {
        router.push('./userprofile'); // Redirect to the technician's home
      }
    } else if (!tokenFromCookie && !user) {
      router.push('../');
    }
  }, [user, router]);

  if (user && user.is_technician) {
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
  {data1 && data1.user && (
    <div className={`flex gap-20 ${styles.profileContainer}`} style={{
      backgroundColor: 'rgba(139, 69, 19, 0.4)', // Brown color with opacity
      width: '60%',
      height: '600px',
      padding: '30px', // Add padding to create space from all sides
      justifyContent: 'space-around',
      alignItems: 'center', // Center content vertically
      margin: '120px', // Add margin to create space around the inner div
      borderRadius: '10%',
    }}>
      <div>
      <img
        src={imageurl + data1.image}
        alt="User Avatar"
        className="w-32 h-32 mx-auto mb-4 rounded-full"
        style={{
          width: '400px',
          height: '400px',
          transform: `perspective(600px) rotateY(${isHovered ? '30deg' : '0deg'})`,
          transition: 'transform 0.3s ease-in-out', // Add a smooth transition
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      </div>
      <div>
        <h1 className="mb-2 text-2xl font-semibold text-orange-700">{data1.user.username}</h1>
        <div>
      <p className="mb-4 text-white">Profession:</p>
      <ul className="custom-list"> {/* Apply the custom-list class */}
        {data1.professions.map((profession, index) => (
          <li key={index} className="text-white custom-list-item"> {/* Apply the custom-list-item class */}
            {profession.techProfession}
          </li>
        ))}
      </ul>
    </div>
        <p className="mb-4 text-white">Description: {data1.description}</p>
        <p className="text-white">Average Rating: {data1.average_rating}</p>

        <div>
      <div className="mt-4 feedback-section"> {/* Apply the feedback-section class */}
        <h2 className="text-xl font-semibold text-white">Feedback:</h2>
        <ul className="feedback-list"> {/* Apply the feedback-list class */}
          {data1.feedback_list.map((feedback, index) => (
            <li key={index} className="feedback-item"> {/* Apply the feedback-item class */}
              {feedback}
            </li>
          ))}
        </ul>
      </div>
    </div>
        <Link href="/UpdateTechnicianProfile">
          <button className={`${styles.button} text-black cursor-pointer`}>Edit Profile</button>
        </Link>
      </div>
    </div>
  )}

  {error1 && <div className="text-red-500">Error loading profile data: {error1.message}</div>}

 
</div>
<div><Footer/></div>
</>
    );
  } else {
    return null;
  }
};

export default TechProfile;