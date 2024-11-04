/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { FaPhoneAlt, FaUserCircle, FaSearch } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname(); // Lấy đường dẫn hiện tại
  const [isScrolled, setIsScrolled] = useState(false); // Theo dõi khi cuộn xuống
  const [isNavVisible, setIsNavVisible] = useState(false); // Hiển thị nav khi cuộn xuống

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleBookingSearchClick = () => {
    router.push("/booking-search"); // Điều hướng đến trang tra cứu vé
  };

  const handleLogoClick = () => {
    router.push("/"); // Điều hướng về trang chủ khi logo được click
  };

  const handleLogout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/", // Chuyển hướng đến trang chủ sau khi đăng xuất
    });
  };

  // Event listener để thay đổi trạng thái navbar khi cuộn, chỉ áp dụng ở trang index
  useEffect(() => {
    const handleScroll = () => {
      if (pathname === "/") {
        const currentScrollTop = window.scrollY;

        // Kiểm tra khi cuộn quá 50px để sổ nav ra
        if (currentScrollTop > 50) {
          setIsNavVisible(true); // Hiển thị khi cuộn xuống
          setIsScrolled(true); // Khi cuộn xuống hơn 50px
        } else {
          setIsNavVisible(false); // Ẩn khi ở đầu trang
          setIsScrolled(false); // Khi ở đầu trang
        }
      }
    };

    // Thêm sự kiện cuộn chỉ cho trang chủ
    if (pathname === "/") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  // Xác định trạng thái của navbar
  const isHomePage = pathname === "/";

  // Thiết lập lớp nền của navbar dựa trên trạng thái cuộn, chỉ áp dụng ở trang index
  const navbarBgColor = isHomePage
    ? isScrolled
      ? "bg-[#00264e] bg-opacity-90 shadow-lg" // Khi cuộn, có màu xanh và bóng
      : "bg-transparent" // Ở trên cùng thì trong suốt
    : "bg-[#00264e]"; // Ở các trang khác thì luôn có màu xanh

  // Hiệu ứng của navbar khi cuộn xuống, chỉ áp dụng ở trang index
  const navTransitionClasses =
    isHomePage && isNavVisible
      ? "translate-y-0 opacity-100" // Hiển thị khi cuộn xuống ở trang index
      : isHomePage
        ? "-translate-y-full opacity-0" // Ẩn khi ở đầu trang (chỉ trang index)
        : "translate-y-0 opacity-100"; // Luôn hiển thị ở các trang khác

  return (
    <nav
      className={`fixed z-50 w-full ${navbarBgColor} ${navTransitionClasses} px-6 py-4 text-white transition-transform duration-500 ease-in-out`}
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

        <div className="hidden space-x-6 lg:flex">
          <div className="flex items-center space-x-2">
            <FaPhoneAlt />
            <span className="text-sm">0932 126 988</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaPhoneAlt />
            <span className="text-sm">(028) 38 256 256</span>
          </div>
        </div>

        <div className="flex items-center space-x-10">
          <button
            className="flex items-center space-x-2"
            onClick={handleBookingSearchClick}
          >
            <FaSearch className="text-xl" />
            <span className="text-sm">Tra cứu vé</span>
          </button>
          {session ? (
            <div className="flex items-center space-x-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="light"
                    className="flex items-center space-x-2"
                  >
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt="User Avatar"
                        className="size-8 rounded-full"
                      />
                    ) : (
                      <FaUserCircle className="text-2xl text-white" />
                    )}
                    <span className="text-sm text-white">
                      {session.user.email}
                    </span>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                  <DropdownItem
                    key="profile"
                    onClick={() => router.push("/profile")}
                  >
                    Profile
                  </DropdownItem>
                  <DropdownItem
                    key="bookings"
                    onClick={() => router.push("/bookings")}
                  >
                    My Bookings
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    onClick={handleLogout}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : (
            <button
              className="flex items-center space-x-2"
              onClick={handleLoginClick}
            >
              <FaUserCircle className="text-2xl" />
              <span className="text-sm">Đăng nhập / Đăng ký</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
