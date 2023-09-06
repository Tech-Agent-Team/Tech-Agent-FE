import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/styles.module.css';
import { useAuth } from '@/context/auth';
import AboutPagetext from '@/components/AboutPagetext';
import HeaderWithVideo from '@/components/video';
import { useRouter } from 'next/router'; // Import the useRouter hook
// import AboutPage from '@/pages/aboutpage';

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false); // State to control text visibility
  const { user } = useAuth();
  const router = useRouter();
  const [textIndex, setTextIndex] = useState(0);



  const images = [
    // 'https://img.freepik.com/premium-photo/minimal-construction-creative-concept-with-miniatures_950002-147515.jpg?w=1060',
    'https://img.freepik.com/premium-photo/great-workers_553012-18220.jpg?w=1060',
    'https://img.freepik.com/free-photo/minimalist-hallways-background_23-2149745362.jpg?t=st=1694026571~exp=1694027171~hmac=668e25f370a5ee1cf42db893c876ee88a3159e342afa4ee3b0a5cb22aa83da93',
    // 'https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1605125626499-e2c7efbd1ab3%3Fcrop%3Dfaces%252Cedges%26cs%3Dtinysrgb%26fit%3Dcrop%26fm%3Djpg%26ixid%3DM3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjkzOTk1NDE1fA%26ixlib%3Drb-4.0.3%26q%3D60%26w%3D1200%26auto%3Dformat%26h%3D630%26mark-w%3D64%26mark-align%3Dtop%252Cleft%26mark-pad%3D50%26blend-mode%3Dnormal%26blend-alpha%3D10%26blend-w%3D1%26mark%3Dhttps%253A%252F%252Fimages.unsplash.com%252Fopengraph%252Flogo.png%26blend%3D000000',
    // 'https://5.imimg.com/data5/SELLER/Default/2023/2/YB/TD/OG/24358266/hotel-interior-designing-services-500x500.jpg',
    // 'https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1469289759076-d1484757abc3%3Fcrop%3Dfaces%252Cedges%26cs%3Dtinysrgb%26fit%3Dcrop%26fm%3Djpg%26ixid%3DM3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjkzOTk1MDk5fA%26ixlib%3Drb-4.0.3%26q%3D60%26w%3D1200%26auto%3Dformat%26h%3D630%26mark-w%3D64%26mark-align%3Dtop%252Cleft%26mark-pad%3D50%26blend-mode%3Dnormal%26blend-alpha%3D10%26blend-w%3D1%26mark%3Dhttps%253A%252F%252Fimages.unsplash.com%252Fopengraph%252Flogo.png%26blend%3D000000',
    'https://media5.architecturemedia.net/site_media/media/cache/f0/76/f076564d8ddf1c6980257094135ca3c8.jpg',
    'https://xo3d.co.uk/wp-content/uploads/2019/10/bathroom-3d-render-high-resolution.jpg',
    'https://images-ext-2.discordapp.net/external/8m0RVq909JGwZOZOf-7Q37hZtVM-IAkH2iE3lTql8tM/%3Fw%3D1060/https/img.freepik.com/premium-photo/carpenter-shop-background-photo-carpenter-male-worker_982005-5253.jpg?width=1170&height=669',
    'https://th.bing.com/th/id/OIP.9QYlHI6VK7Siqu87uwkFYAHaEK?pid=ImgDet&rs=1'

  ];

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
    backdropFilter: 'blur(2px)', // Apply a blur effect to the overlay
  };
  const currentImage = images[activeIndex];
  const backgroundImageStyle = {
    position: 'relative',
    width: '100%',
    height: '100vh',
    backgroundImage: `url('${currentImage}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transformStyle: 'preserve-3d', // Add 3D effect
    perspective: '1000px', // Adjust the perspective value as needed
    transition: 'transform 0.5s',
    zIndex: 0, // Ensure that other content is displayed above the background
  };
  const dynamicText = [
    {
      title: 'Welcome to Tech Agent',
      description: `Your source for the latest technology news, trends, and innovations. Stay updated with the latest happenings in the tech world, from cutting-edge gadgets to breakthrough software.`,
    },
    {
      title: 'Stay Informed and Inspired',
      description: `Dive deep into the world of technology with our in-depth articles, comprehensive reviews, and insightful analysis. Discover how technology is shaping our lives, from AI and automation to the Internet of Things.`,
    },
    {
      title: 'Explore the World ',
      description: `Embark on a journey to explore the future of innovation with Tech Agent. Join us as we unravel the possibilities of tomorrow's tech landscape, where imagination knows no bounds.`,
    },
  ];
  

  const splitTextIntoRows = (text) => {
    const words = text.split(" ");
    const rows = [];
    for (let i = 0; i < words.length; i += 6) {
      rows.push(words.slice(i, i + 5).join(" "));
    }
    return rows;
  };




  useEffect(() => {
    // Check if the user is authenticated and their role
    if (user) {
      if (user.is_technician) {
        router.push('./TechHome'); // Redirect to the technician's home
      } else {
        router.push('./userHome'); // Redirect to the user's home
      }
    } else {
      // When the component mounts, set a delay to make the text appear
      const delay = setTimeout(() => {
        setIsVisible(true);
      }, 1000); // Adjust the delay as needed

      // Cycle through the dynamic text every 3 seconds (faster transition)
      const textInterval = setInterval(() => {
        setTextIndex((prevIndex) => (prevIndex + 1) % dynamicText.length);
      }, 3000); // Adjust the interval duration as needed for faster transition

      return () => {
        clearTimeout(delay); // Cleanup the timeout on unmount
        clearInterval(textInterval); // Cleanup the interval on unmount
      };
    }
  }, [user, router]);
  if (!user) {
    const currentText = dynamicText[textIndex];
    return (
      <div >
        <div className={styles.container} >
          <Header />

          {/* Create a parent container with a consistent width */}
          <div className="container" style={{ width: '100%' }}>
            {/* First div */}
            <div style={backgroundImageStyle}>
              <div style={overlayStyle}></div>
              <div className={styles.content}>
                <h1 className={`text-4xl font-bold text-white font-dmserif ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[-100%] opacity-0 transition-all duration-500'}`}>
                  {currentText.title}
                </h1>
                <p className={` text-2xl  text-white ${isVisible ? 'opacity-100' : 'opacity-0 transition-opacity duration-500'} ${styles.text}`}>
                  {splitTextIntoRows(currentText.description).map((row, index) => (
                    <span key={index}>{row}<br /></span>
                  ))}
                </p>

              </div>
            </div>

            {/* Second div */}
            <div className="container p-0 m-0">
              <AboutPagetext />
            </div>
            {/* <div style={{ border: '2px solid black' }}></div> */}


            <div className="container p-0 m-0">
              <HeaderWithVideo />
            </div>
            {/* <div style={{ border: '10px solid black' }}></div> */}


            {/* <div className="container p-0 m-0">
              <AboutPage />
            </div> */}
          </div>

          <div id='footer' style={{ flex: 1 }}>{/* Your main content here */}</div>
          <Footer style={{ flexShrink: 0 }} />
        </div>
      </div>
    );
  };
}

export default Home;
