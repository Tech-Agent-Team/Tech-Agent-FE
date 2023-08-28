import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <Header />
      <h1>Welcome to My App</h1>
      <Link href="/" legacyBehavior>
        <a>Login</a>
      </Link>
      <Footer />
    </div>
  );
};

export default Home;
