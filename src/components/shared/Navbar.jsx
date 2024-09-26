// src/app/navbar/navbar.jsx
'use client'

import { useState } from 'react';
import { FaPhoneAlt, FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation'; // Import useRouter

const Navbar = () => {
  const router = useRouter(); // Khởi tạo useRouter
  const [menuOpen, setMenuOpen] = useState(false);

  // Hàm điều hướng đến trang login
  const handleLoginClick = () => {
    router.push('/login'); // Điều hướng đến trang login
  };

  return (
    <nav className="bg-blue-900 text-white py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
       {/* Logo */}
        <div className="flex items-center">
          <img src="/images/Logo.png" alt="vemaybay.vn logo" className="h-10 w-auto" />
        </div>

        {/* Hotline */}
        <div className="hidden lg:flex space-x-6">
          <div className="flex items-center space-x-2">
            <FaPhoneAlt />
            <span className="text-sm">0932 126 988</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaPhoneAlt />
            <span className="text-sm">(028) 38 256 256</span>
          </div>
        </div>

       {/* User Options */}
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2" onClick={handleLoginClick}>
            <FaUserCircle className="text-2xl" />
            <span className="text-sm">Đăng nhập / Đăng ký</span>
          </button>

          {/* Hamburger Menu for Mobile */}
          <button
            className="lg:hidden text-2xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            &#9776;
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden mt-4">
          <ul className="space-y-4">
            <li className="flex items-center space-x-2">
              <FaPhoneAlt />
              <span>0932 126 988</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaPhoneAlt />
              <span>(028) 38 256 256</span>
            </li>
            <li>
              <button className="flex items-center space-x-2">
                <FaUserCircle className="text-xl" />
                <span>Đăng nhập hoặc đăng ký</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
