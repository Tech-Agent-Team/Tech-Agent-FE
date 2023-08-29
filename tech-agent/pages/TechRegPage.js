// pages/TechRegPage.js
import React from 'react';
import Header from '../components/Header';
import TechRegForm from '../components/TechRegForm';


const TechRegPage = () => {
  const handleRegistrationComplete = () => {
    // This function will be called when registration is successfully completed
    // For example, you can redirect the user to a success page
    router.push('/techome'); // Redirect to a registration success page
  };
  return (
    <div>
      <Header />
      <h1>Register as Technician</h1>
      <TechRegForm />
    </div>
  );
};

export default TechRegPage;
