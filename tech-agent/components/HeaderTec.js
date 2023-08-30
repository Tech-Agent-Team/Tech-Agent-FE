import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth';

const Header = () => {
  const { logout } = useAuth(); 
  return (
    <header className="bg-gray-900">
      <nav className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <ul className="flex items-center h-16">
          <li>
            <Link href="/">
              <span className="text-lg font-semibold text-white cursor-pointer">Home</span>
            </Link>
          </li>

          <li className="ml-auto">
            <Link href="/AcceptedOrder">
              <button className="text-white cursor-pointer" >Accepted Orders</button>
            </Link>
          </li>
          <li className="ml-auto">
            <Link href="/LoginPage">
              <button className="text-white cursor-pointer" onClick={""}>About</button>
            </Link>
          </li>
          <li className="ml-auto">
            <Link href="/LoginPage">
              <button className="text-white cursor-pointer">Login</button>
            </Link>
          </li>
          <li className="ml-auto">
            <Link href="/LoginPage">
              <button className="text-white cursor-pointer" onClick={logout}>Logout</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
