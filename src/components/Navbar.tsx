'use client';
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { usePathname } from 'next/navigation';
import { useUserContext } from '@/context/UserContext';

export default function Navbar() {
  const { user, logout } = useUserContext();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const handleMouseEnter = () => setIsDropdownOpen(true);
  const handleMouseLeave = () => setTimeout(() => {
    if (!document.querySelector('.dropdown-menu:hover')) {
      setIsDropdownOpen(false);
    }
  }, 100);

  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    // Handle click outside to close dropdowns
    const handleClickOutside = (event: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    logout();
  };

  const handleLogin = async () => {
    router.push('/signin');
  };

  return (
    <nav className="bg-blue-500 bg-opacity-90 text-white shadow-md sticky top-0 z-50" style={{ backdropFilter: 'blur(8px)' }}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setIsOpen(!isOpen)}
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="flex-1 flex items-center justify-center md:items-stretch md:justify-start">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold">
                Prongs Of Wisdom
              </Link>
            </div>
            <div className="hidden md:flex md:ml-6">
              <div className="flex space-x-4">
                <Link href="/" className={`text-gray-300 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${pathname === '/' ? 'bg-blue-700' : ''}`}>
                  Home
                </Link>
                <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <button
                    className={`text-gray-300 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${pathname.startsWith('/blog') || pathname === "/create_blog" ? 'bg-blue-700' : ''}`}
                  >
                    Blog
                  </button>
                  {isDropdownOpen && (
                    <ul className="dropdown-menu absolute bg-gray-700 text-white mt-2 p-2 rounded-md shadow-lg w-48">
                      <li>
                        <Link
                          href="/blogs"
                          className={`block p-2 ${pathname === '/blogs' ? 'bg-blue-700' : ''}`}
                        >
                          All Blogs
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/create_blog"
                          className={`block p-2 ${pathname === '/create_blog' ? 'bg-blue-700' : ''}`}
                        >
                          Create Blog
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
                <Link href="/contact" className={`text-gray-300 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${pathname === '/contact' ? 'bg-blue-700' : ''}`}>
                  Contact
                </Link>
              </div>
            </div>

            {/* User Info and Dropdown */}
            <div
              className="absolute inset-y-0 right-0 items-center space-x-4 hidden md:flex"
              ref={accountRef}>
              {user ? (
                <div className="relative flex items-center group">
                  {/* User Avatar and Info */}
                  <div
                    className="flex items-center space-x-3 cursor-pointer"
                    onClick={() => setIsAccountOpen(!isAccountOpen)}
                  >
                    <Image
                      src={user?.avatar || 'https://via.placeholder.com/40'}
                      alt={user?.name || 'User'}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full border-2 border-gray-300"
                    />
                  </div>

                  {/* Dropdown Menu */}
                  {isAccountOpen && (
                    <ul className="flex flex-col absolute right-0 top-12 bg-gray-800 text-white rounded-lg shadow-lg z-20 min-w-[250px]">
                      <li className="px-4 py-3 flex items-center space-x-3 border-b border-gray-700">
                        <Image
                          src={user?.avatar || 'https://via.placeholder.com/40'}
                          alt={user?.name || 'User'}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex flex-col ml-2">
                          <p className="flex-1 font-medium">{user?.name || 'User'}</p>
                          <p className="flex-1 text-sm text-gray-400">{user?.email}</p>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex items-center bg-gradient-to-r from-blue-200 to-blue-400 text-gray-800 px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out"
                >
                  Log In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/" className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === '/' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-blue-600 hover:text-white'}`}>
            Home
          </Link>
          <Link href="/blogs" className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === '/blogs' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-blue-600 hover:text-white'}`}>
            All Blogs
          </Link>
          <Link href="/create_blog" className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === '/create_blog' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-blue-600 hover:text-white'}`}>
            Create Blog
          </Link>
          <Link href="/contact" className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === '/contact' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-blue-600 hover:text-white'}`}>
            Contact
          </Link>
        </div>
        {user && (
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={handleLogout}
              className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-blue-600 hover:text-white"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
