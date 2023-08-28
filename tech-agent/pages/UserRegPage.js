// pages/UserRegPage.js
import React from 'react';
import Header from '../components/Header';
import UserRegForm from '../components/UserRegForm';

const UserRegPage = () => {
  return (
    <div>
      <Header />
      <h1>Register as User</h1>
      <UserRegForm />
    </div>
  );
};

export default UserRegPage;
