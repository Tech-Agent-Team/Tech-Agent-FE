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
              'url("https://img.freepik.com/free-photo/close-up-tools-workshop_23-2148836011.jpg?size=626&ext=jpg&ga=GA1.1.1442964426.1687759231")',
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
              className={`flex  ${styles.profileContainer}`}
              style={{
                backgroundColor: 'rgba(174, 125, 91,0.6)',
                width: '50%',
                height: '600px',
                padding: '30px',
                justifyContent: 'space-around',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '120px',
                borderRadius: '10%',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center' , height:'90%',fontSize:'140%',marginTop:'5%'}} >
              <div style={{marginRight:'4%'}}>
                <img
                  src={imageurl + data1.image}
                  alt="User Avatar"
                  className="w-32 h-32 mx-auto mb-4 rounded-full"
                  style={{
                    width: '300px',
                    height: '300px',
                    transform: `perspective(600px) rotateY(${isHovered ? '30deg' : '0deg'})`,
                    transition: 'transform 0.3s ease-in-out',
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
              <div style={{  display: 'flex', flexDirection: 'column', alignItems: 'baseline' }}>

                <h1 className="mb-4 text-4xl font-semibold text-center text-orange-400">{data1.user.username}</h1>
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
                <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto', justifyContent: 'space-between' }}>
                  <div style={{ margin: 'auto', width: '120%', marginTop: '10%'}}>
                    <button

                      className={`${styles.button} text-black cursor-pointer`}
                      onClick={openProfessionsModal}
                    >
                      {isProfessionsVisible ? '-' : '+'} Professions
                    </button>

                  </div>
                  <div style={{ margin: 'auto', width: '120%', marginTop: '10%' }}>
                    <button
                      className={`${styles.button} text-black cursor-pointer`} // Apply the same style here
                      onClick={openFeedbackModal}
                    >
                      {isFeedbackModalOpen ? '-' : '+'} Feedback {/* Using the same icon style as Professions */}
                    </button>

                  </div>
                </div>
              </div>
                
              </div>
              <div style={{ margin: '0px', width: '50%' }}>
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
        <Footer style={{ flexShrink: 0 }} />
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