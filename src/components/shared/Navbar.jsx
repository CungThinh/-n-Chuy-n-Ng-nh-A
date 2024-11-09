/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { FaPhoneAlt, FaUserCircle } from "react-icons/fa";
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
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleLogoClick = () => {
    router.push("/"); // Điều hướng về trang chủ khi logo được click
  };

  const handleBookingSearchClick = () => {
    router.push("booking-search");
  };

  const handleLogout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/", // Chuyển hướng đến trang chủ sau khi đăng xuất
    });
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
    if (pathname === "/") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (pathname === "/") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [pathname]);

  // Xác định trạng thái của navbar
  const isHomePage = pathname === "/";
  const navbarBgColor = isHomePage
    ? isScrolled
      ? "bg-[#00264e]"
      : "bg-transparent" // Ở trang index, navbar trong suốt khi ở trên đầu, và đổi màu khi scroll
    : "bg-[#00264e]"; // Ở các trang khác, luôn luôn có màu xanh

  return (
    <nav
      className={`fixed z-50 w-full transition-all duration-500 ${navbarBgColor} px-6 py-4 text-white`}
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
          {/* <button
            className="flex items-center space-x-2"
            onClick={handleBookingSearchClick}
          >
            <FaSearch className="text-xl" />
            <span className="text-sm">Tra cứu vé</span>
          </button> */}

          {session ? (
            <div className="flex items-center space-x-2">
              <Dropdown css={{ color: "white " }}>
                <DropdownTrigger>
                  <Button variant="light">
                    {session.user.image ? (
                      <>
                        <img
                          src={session.user.image}
                          alt="User Avatar"
                          className="size-8 rounded-full"
                        />
                      </>
                    ) : (
                      <>
                        <FaUserCircle className="text-2xl text-white" />
                      </>
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
                    Tài khoản
                  </DropdownItem>
                  <DropdownItem
                    key="bookings"
                    onClick={() => router.push("/my-bookings")}
                  >
                    Lịch sử đặt vé
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    onClick={handleLogout}
                  >
                    Đăng xuất
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
