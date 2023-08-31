import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth';

const Header = () => {
  const { logout } = useAuth(); 
  return (
    <header className="bg-gray-900 sticky top-0 z-50">
      <nav className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center h-16">
          <li>
            <Link href="/">
              <span className="text-lg font-semibold text-white cursor-pointer">Home</span>
            </Link>
          </li>

          <li className="ml-auto">
            <Link href="/AcceptedOrder">
              <button className="text-white cursor-pointer mr-2">Accepted Orders</button>
            </Link>
          </li>
          <li className="ml-auto">
            <Link href="/LoginPage">
              <button className="text-white cursor-pointer mr-2">About</button>
            </Link>
          </li>
          <li className="ml-auto">
            <Link href="/LoginPage">
              <button className="text-white cursor-pointer mr-2">Login</button>
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
