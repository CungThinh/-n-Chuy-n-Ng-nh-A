import Navbar from '@/components/shared/Navbar'; // Navbar của bạn
import Footer from '@/components/shared/Footer'; // Footer nếu có

const BookingDetailLayout = ({ children }) => {
  return (
      <div className="pt-16 h-[800px]"> {/* Thêm khoảng trống phía trên */}
        {children}
      </div>
  );
};

export default BookingDetailLayout;