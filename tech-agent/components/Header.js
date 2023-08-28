import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-900">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center h-16">
          <li>
            <Link href="/">
              <span className="text-white font-semibold text-lg cursor-pointer">Home</span>
            </Link>
          </li>
          <li className="ml-auto">
            <Link href="/LoginPage">
              <button className="text-white cursor-pointer">Login</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
