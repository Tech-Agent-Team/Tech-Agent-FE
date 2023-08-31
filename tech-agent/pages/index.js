import React, { useState, useEffect } from 'react';
import Header from '../components/baseheader';
import Footer from '../components/Footer';
import styles from '../styles/styles.module.css';

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    'https://th.bing.com/th/id/OIP.9QYlHI6VK7Siqu87uwkFYAHaEK?pid=ImgDet&rs=1',
    'https://th.bing.com/th/id/OIP.SaAawkADm-Yi95vM4Dzi3AHaE8?pid=ImgDet&rs=1',
    'https://www.homehow.co.uk/images/13plasterremoval.jpg',

  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const currentImage = images[activeIndex];

  const backgroundImageStyle = {
    position: 'relative',
    width: '100%',
    height: '100vh',
    backgroundImage: `url('${currentImage}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
    backdropFilter: 'blur(5px)', // Apply a blur effect to the overlay
  };

  return (
    <div>
      <div className={styles.container}>
        <Header />

        <div style={backgroundImageStyle}>
          <div style={overlayStyle}></div>
          <div className={styles.content}>
            <h1 className={styles.heading}>Tech Agent</h1>
            <p className={styles.paragraph}>
              Welcome to Tech Agent, your source for the latest technology news and trends. 
              We provide in-depth articles, reviews, and insights on a wide range of topics including 
              gadgets, software, AI, and much more. Stay informed and inspired in the world of technology!
            </p>
          </div>
        </div>

        <div className="container p-10 mx-auto">
          {/* Your additional content here */}
        </div>

        <div style={{ flex: 1 }}>{/* Your main content here */}</div>
        <Footer style={{ flexShrink: 0 }} />
      </div>
    </div>
  );
};

export default Home;