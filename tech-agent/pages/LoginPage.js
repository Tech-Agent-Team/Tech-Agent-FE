import React from 'react';
import Header from '../components/HeaderTec';
import LoginForm from '../components/LoginForm';
import Link from 'next/link';
import { useAuth } from '@/context/auth';
import TechHome from './TechHome';
import UserHome from './userHome';

// const CustomLink = ({ href, children }) => (
//   <Link href={href}>
//     <div>{children}</div>
//   </Link>
// );

const LoginPage = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoginForm />;
  } else if (user.is_technician) {
    return <TechHome />;
  } else {
    
    return <UserHome />;
  }
};

export default LoginPage;
