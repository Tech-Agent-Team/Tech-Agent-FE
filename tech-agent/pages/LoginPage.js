import React from 'react';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import Link from 'next/link';

const CustomLink = ({ href, children }) => (
  <Link href={href}>
    <div>{children}</div>
  </Link>
);

const LoginPage = () => {
  return (
    <div>
      <Header />
      <h1>Login Page</h1>
      <LoginForm />

      {/* Add links to technician and user registration pages */}
   


    </div>
  );
};

export default LoginPage;
