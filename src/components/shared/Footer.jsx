"use client";

import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#001f3f] to-[#00264e] py-16 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <Image
              src="/images/Logo.png"
              alt="vemaybay.vn logo"
              width={150}
              height={50}
              className="mb-4"
            />
            <p className="text-sm text-gray-300">
              Công Ty TNHH VEMAYBAY VN - Chuyên cung cấp dịch vụ đặt vé máy bay
              trực tuyến hàng đầu Việt Nam.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 transition-colors duration-300 hover:text-white"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors duration-300 hover:text-white"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors duration-300 hover:text-white"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors duration-300 hover:text-white"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-orange-400">
              Liên Kết Nhanh
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-orange-400"
                >
                  Vé máy bay đi Đà Nẵng
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-orange-400"
                >
                  Vé máy bay đi Hà Nội
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-orange-400"
                >
                  Vé máy bay đi TP.HCM
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-orange-400"
                >
                  Vé máy bay đi Phú Quốc
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-orange-400"
                >
                  Vé máy bay đi Nha Trang
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-orange-400">Hỗ Trợ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-orange-400"
                >
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-orange-400"
                >
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-orange-400"
                >
                  Hướng dẫn đặt vé
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-orange-400"
                >
                  Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-orange-400"
                >
                  Phản hồi
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-orange-400">Liên Hệ</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center">
                <FaPhone className="mr-2 text-orange-400" />
                <span>Hotline: 0932 126 988</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-orange-400" />
                <span>Email: support@vemaybay.vn</span>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="mr-2 mt-1 text-orange-400" />
                <span>
                  185-187 Lê Thánh Tôn, P. Bến Thành, Quận 1, TP. Hồ Chí Minh
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p className="mb-4">
            © 2024 VEMAYBAY VN. Tất cả các quyền được bảo lưu.
          </p>
          <p>
            Vận hành bởi CÔNG TY CỔ PHẦN THƯƠNG MẠI DỊCH VỤ CÔNG NGHỆ BIZITRIP
            (BiziTrip.vn)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
