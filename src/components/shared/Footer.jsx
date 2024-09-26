'use client'

'use client';

// src/app/(auth)/footer/footer.jsx

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-10">
      <div className="container mx-auto px-4">
        {/* Hotline and Information Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
          {/* Hotline */}
          <div>
            <h3 className="text-xl font-bold text-orange-500 mb-4">Hotline</h3>
            <p className="text-2xl font-semibold mb-4">0932 126 988</p>
            <h3 className="text-xl font-bold text-orange-500 mb-4">Điện thoại</h3>
            <p className="text-2xl font-semibold mb-4">(028) 38 256 256</p>
          </div>

          {/* Vé máy bay theo thành phố */}
          <div>
            <h3 className="text-lg font-bold text-orange-500 mb-4">Vé máy bay theo thành phố</h3>
            <ul className="space-y-2">
              <li>vé máy bay đi đà nẵng</li>
              <li>vé máy bay đi đà lạt</li>
              <li>vé máy bay đi huế</li>
            </ul>
          </div>

          {/* Vé máy bay theo quốc gia */}
          <div>
            <h3 className="text-lg font-bold text-orange-500 mb-4">Vé máy bay theo quốc gia</h3>
            <ul className="space-y-2">
              <li>vé máy bay đi hà nội</li>
              <li>vé máy bay đi vinh</li>
              <li>vé máy bay đi buôn ma thuột</li>
            </ul>
          </div>

          {/* Vé máy bay theo hãng hàng không */}
          <div>
            <h3 className="text-lg font-bold text-orange-500 mb-4">Vé máy bay theo hãng hàng không</h3>
            <ul className="space-y-2">
              <li>vé máy bay đi phú quốc</li>
              <li>vé máy bay đi hải phòng</li>
            </ul>
          </div>

          {/* Các khách sạn hàng đầu */}
          <div>
            <h3 className="text-lg font-bold text-orange-500 mb-4">Các khách sạn hàng đầu</h3>
            <ul className="space-y-2">
              <li>vé máy bay đi tp.hcm (sài gòn)</li>
              <li>vé máy bay đi nha trang</li>
            </ul>
          </div>
        </div>

        {/* Extra Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Thông tin thêm */}
          <div>
            <h3 className="text-lg font-bold text-orange-500 mb-4">Thông tin thêm</h3>
            <ul className="space-y-2">
              <li>Điều khoản sử dụng</li>
              <li>Chính sách bảo mật</li>
              <li>Hướng dẫn đặt vé</li>
              <li>Thanh toán tại các Cửa Hàng Tiện Lợi 24/7</li>
              <li>Hướng dẫn thanh toán và giao nhận</li>
            </ul>
          </div>

          {/* Về chúng tôi */}
          <div>
            <h3 className="text-lg font-bold text-orange-500 mb-4">Về chúng tôi</h3>
            <ul className="space-y-2">
              <li>Giới thiệu về vemaybay.vn</li>
              <li>news.air.tickets</li>
              <li>Khách hàng nói về chúng tôi</li>
              <li>Giải thưởng</li>
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div>
            <h3 className="text-lg font-bold text-orange-500 mb-4">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li>Phản hồi</li>
              <li>Câu hỏi thường gặp</li>
              <li>Tư vấn hỗ trợ đặt vé</li>
            </ul>
          </div>

          {/* Trụ sở */}
          <div>
            <h3 className="text-lg font-bold text-orange-500 mb-4">Trụ sở</h3>
            <ul className="space-y-2">
              <li>Văn phòng chính: 185 -187 Lê Thánh Tôn, P. Bến Thành, Quận 1, Tp. Hồ Chí Minh</li>
              <li>Chi Nhánh: 43 Thủ Khoa Huân, Quận 1, Tp. Hồ Chí Minh</li>
              <li>Chi Nhánh Hà Nội: 23D Hàng Long, Q. Hoàn Kiếm</li>
              <li>Chi Nhánh Đà Nẵng: 06 Duy Tân, Q. Hải Châu, Đà Nẵng</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <div className="mb-4">
            <img src="/images/Logo.png" alt="vemaybay.vn logo" className="mx-auto h-8" />
          </div>
          <p className="text-gray-400">
            Công Ty TNHH VEMAYBAY VN - 181/4 Lê Thánh Tôn, P. Bến Thành, Q1, TP HCM | MÃ SỐ DOANH NGHIỆP: 0312830694 DO SỞ KẾ HOẠCH VÀ ĐẦU TƯ TP HCM CẤP NGÀY 24/06/2014 - Vận hành bởi CÔNG TY CỔ PHẦN THƯƠNG MẠI DỊCH VỤ CÔNG NGHỆ BIZITRIP (BiziTrip.vn)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
