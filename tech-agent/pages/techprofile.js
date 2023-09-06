import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '@/components/Footer';
import styles from '../styles/techprofile.module.css';
import useResource from '@/Hooks/useResource';
import { useAuth } from '@/context/auth';
import ProfessionsModal from '../components/ProfessionsModal'; // Adjust the import path as needed
import FeedbackModal from '../components/FeedbackModal';

// Import your star rating images or icons here

const TechProfile = () => {
  const [isProfessionsModalOpen, setIsProfessionsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const { user, setToken } = useAuth();
  const imageurl = 'http://res.cloudinary.com/dt0dx45wy/';
  const urlenv = process.env.NEXT_PUBLIC_URL;
  const url = user ? `${urlenv}/api/technician/profile/${user.username}/` : null;
  const { response: data1, error: error1 } = useResource(url);
  const router = useRouter();

  const [isHovered, setIsHovered] = useState(false);
  const [isProfessionsVisible, setIsProfessionsVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const openProfessionsModal = () => {
    setIsProfessionsModalOpen(true);
  };

  const closeProfessionsModal = () => {
    setIsProfessionsModalOpen(false);
  };
  const openFeedbackModal = () => {
    setIsFeedbackModalOpen(true);
  };

  // Function to close the feedback modal
  const closeFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
  };

  const getStarImage = (averageRating) => {
    if (averageRating >= 8) {
      return '/images/5.png'; // Replace with your actual absolute path
    } else if (averageRating >= 6) {
      return '/images/4.png'; // Replace with your actual absolute path
    } else if (averageRating >= 4) {
      return '/images/3.png'; // Replace with your actual absolute path
    } else if (averageRating >= 2) {
      return '/images/2.png'; // Replace with your actual absolute path
    } else {
      return '/images/1.png'; // Replace with your actual absolute path
    }
  };

  useEffect(() => {
    const tokenFromCookie = Cookies.get('token');
    const initializeAuthStateFromCookies = async () => {
      if (tokenFromCookie) {
        await setToken(tokenFromCookie);
      }
    };
    if (tokenFromCookie && !user) {
      initializeAuthStateFromCookies();
    }
    if (user) {
      if (user && !user.is_technician) {
        router.push('./userprofile');
      }
    } else if (!tokenFromCookie && !user) {
      router.push('../');
    }
  }, [user, router]);

  if (user && user.is_technician) {
    return (
      <>
        {console.log(data1)}
        <div
          style={{
            backgroundImage:
              'url("https://img.freepik.com/free-photo/high-angle-tools-table-arrangement_23-2149916247.jpg?w=996&t=st=1693910421~exp=1693911021~hmac=dd8aeae8fc4bcfa6c3deaea9227d506b3fb9228430368582e987ce2669adefd3")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Header />
          {data1 && data1.user && (
            <div
              className={`flex gap-20 ${styles.profileContainer}`}
              style={{
                backgroundColor: 'rgba(139, 69, 19, 0.4)',
                width: '60%',
                height: '600px',
                padding: '30px',
                justifyContent: 'space-around',
                alignItems: 'center',
                margin: '120px',
                borderRadius: '10%',
              }}
            >
              <div>
                <img
                  src={imageurl + data1.image}
                  alt="User Avatar"
                  className="w-32 h-32 mx-auto mb-4 rounded-full"
                  style={{
                    width: '400px',
                    height: '400px',
                    transform: `perspective(600px) rotateY(${isHovered ? '30deg' : '0deg'})`,
                    transition: 'transform 0.3s ease-in-out',
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
              <div>
                
                <h1 className="mb-2 text-2xl font-semibold text-orange-700">{data1.user.username}</h1>
                <div className={`${styles.rating}`}>
                  <p className='mb-1 text-white '>Rating:</p>
                  <img
                    src={getStarImage(data1.average_rating)}
                    alt="Star Rating"
                    className={`${styles.starImage} mx-auto mb-4`} // Apply the custom class
                  />
                </div>
                <h1 className="mb-4 text-white">Description: {data1.description}</h1>
                <h1 className="mb-4 text-white">Phone Number: {data1.user.phone}</h1>
                <div>
                  <button
                    className={`${styles.button} text-black cursor-pointer`}
                    onClick={openProfessionsModal}
                  >
                    {isProfessionsVisible ? '-' : '+'} Professions
                  </button>
                </div>
                <button
                  className={`${styles.button} text-black cursor-pointer`} // Apply the same style here
                  onClick={openFeedbackModal}
                >
                  {isFeedbackModalOpen ? '-' : '+'} Feedback {/* Using the same icon style as Professions */}
                </button>
                <FeedbackModal isOpen={isFeedbackModalOpen} onClose={closeFeedbackModal} feedbackList={data1.feedback_list} />


                
                <Link href="/UpdateTechnicianProfile">
                  <button className={`${styles.button} text-black cursor-pointer`}>Edit Profile</button>
                </Link>
              </div>
            </div>
          )}

          {error1 && <div className="text-red-500">Error loading profile data: {error1.message}</div>}
        </div>
        <div>
          <Footer />
        </div>

        <ProfessionsModal
          isOpen={isProfessionsModalOpen}
          onClose={closeProfessionsModal}
          professions={data1.professions}
        />
      </>
    );

  } else {
    return null;
  }
};

export default TechProfile;
