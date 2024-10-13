'use client';

import { useState, useEffect } from 'react';
import { FaPhoneAlt, FaUserCircle } from 'react-icons/fa';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname(); // Lấy đường dẫn hiện tại
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleLogoClick = () => {
    router.push('/'); // Điều hướng về trang chủ khi logo được click
  };

  // Event listener để thay đổi màu navbar khi scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Nếu ở trang index (home), chúng ta mới thêm listener cho việc scroll
    if (pathname === '/') {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (pathname === '/') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [pathname]);

  // Xác định trạng thái của navbar
  const isHomePage = pathname === '/';
  const navbarBgColor = isHomePage
    ? (isScrolled ? 'bg-[#00264e]' : 'bg-transparent')  // Ở trang index, navbar trong suốt khi ở trên đầu, và đổi màu khi scroll
    : 'bg-[#00264e]';  // Ở các trang khác, luôn luôn có màu xanh

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${navbarBgColor} text-white py-4 px-6`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="/images/Logo.png"
            alt="vemaybay.vn logo"
            className="h-10 w-auto cursor-pointer"
            onClick={handleLogoClick} // Thêm sự kiện click cho logo
          />
        </div>

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

        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2" onClick={handleLoginClick}>
            <FaUserCircle className="text-2xl" />
            <span className="text-sm">Đăng nhập / Đăng ký</span>
          </button>

          <button
            className="lg:hidden text-2xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            &#9776;
          </button>
        </div>
      </div>

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
