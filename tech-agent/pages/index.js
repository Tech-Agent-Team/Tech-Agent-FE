import React from 'react';
import Header from '../components/baseheader';
import Footer from '../components/Footer';




const Home = () => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000, // Change this value to control the slide duration
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true, // For a fade effect between slides
  }
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <div className="container p-10 mx-auto " >
        <h1 className="mb-4 text-2xl font-semibold ">Welcome to Our Website</h1>
        
        <div className="flex gap-4">
        <div className="w-full md:w-1/2">
            <p className="p-10 mb-5">
              We offer a wide range of services to meet your needs. Our skilled
              technicians are here to help you with any technical issues you may
              encounter.
            </p>
            <p>
              Contact us today to schedule a service or learn more about how we can
              assist you.
            </p>
    
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="https://media.gettyimages.com/id/178893072/photo/happy-male-mechanic-giving-thumb-up.jpg?s=1024x1024&w=gi&k=20&c=_OH3wbuUkbKNvu63-5x-FUa5knNEUOO3LC0c9jH3DgU="
              alt="Technician at work"
              className="w-full max-w-lg mx-auto mb-4 rounded-lg"
            />
          </div>
          
          
        </div>
      </div>
      <div style={{ flex: 1 }}>{/* Your main content here */}</div>
      <Footer style={{ flexShrink: 0 }}/>
    </div>
  );
};

export default Home;