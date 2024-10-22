import { useState } from "react";
import { FaAngleDown, FaMale } from "react-icons/fa";

const BookingDetails = ({ booking }) => {
  const [isFlightDetailVisible, setIsFlightDetailVisible] = useState(false);
  const handleToggleFlightDetail = () => {
    setIsFlightDetailVisible(!isFlightDetailVisible);
  };

  const contact = booking.contactCustomer;
  const payment = booking.payment;

  // Kiểm tra trạng thái thanh toán
  const paymentStatus =
    payment.status === "Pending"
      ? "Chưa thanh toán"
      : payment.status === "Failed"
        ? "Đã hủy"
        : "Đã thanh toán";

  return (
    <div className="max-w-4xl bg-white p-6">
      <div className="flex justify-between">
        <div className="font-medium">Mã đặt chỗ: {booking.pnrId}</div>
        <div className="font-medium">Trạng thái: {paymentStatus}</div>
        <div className="font-medium">
          Ngày đặt: {new Date(booking.createdAt).toLocaleDateString("vi-VN")}
        </div>
      </div>
      <div className="mt-2 border-b-3" />

      <h3 className="mt-2 text-xl font-bold text-black">
        Thông tin chuyến bay
      </h3>

      {booking.tickets.map((ticket, index) => (
        <div key={index} className="mb-4 rounded-lg bg-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <span className="rounded bg-yellow-300 px-2 py-1 font-semibold text-white">
                {ticket.tripType === "Outbound" ? "Chiều đi" : "Chiều về"}
              </span>
              <p className="mt-2 text-sm" style={{ color: "#000000" }}>
                Sân bay {ticket.departureAirport} - Sân bay{" "}
                {ticket.arrivalAirport}
              </p>
            </div>
            <button
              className="flex items-center text-sm text-gray-500"
              onClick={handleToggleFlightDetail}
            >
              Chi tiết{" "}
              <FaAngleDown
                className={isFlightDetailVisible ? "ml-1 rotate-180" : "ml-1"}
              />
            </button>
          </div>
          <div className="relative mt-4 flex items-center justify-around">
            <div className="flex flex-col items-center">
              <p
                className="text-xl font-bold"
                style={{ color: "#000000", marginBottom: "4px" }}
              >
                {new Date(ticket.departureTime).toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="text-sm text-gray-600">{ticket.departureAirport}</p>
            </div>
            <div className="mx-4 flex flex-col items-center">
              <span className="text-sm text-gray-600">
                {Math.floor(ticket.total_duration / 60)}g{" "}
                {ticket.total_duration % 60}p
              </span>
              <div className="my-1 w-16 border-t border-gray-400" />
              <p className="text-xs text-gray-500">Bay thẳng</p>
            </div>
            <div className="flex flex-col items-center">
              <p
                className="text-xl font-bold"
                style={{ color: "#000000", marginBottom: "4px" }}
              >
                {new Date(ticket.arrivalTime).toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="text-sm text-gray-600">{ticket.arrivalAirport}</p>
            </div>
          </div>
          {isFlightDetailVisible && (
            <div
              className="mt-4 rounded-lg bg-gray-100 p-4"
              style={{ zIndex: 10, position: "relative" }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="text-left">
                  <p className="mb-2 text-sm text-gray-500">
                    Ngày:{" "}
                    {new Date(ticket.departureTime).toLocaleDateString("vi-VN")}
                  </p>
                  <div className="flex items-center">
                    <p className="mr-4 text-lg font-semibold text-gray-800">
                      {new Date(ticket.departureTime).toLocaleTimeString(
                        "vi-VN",
                        { hour: "2-digit", minute: "2-digit" },
                      )}
                    </p>
                    <div className="mx-2 h-12 border-l border-gray-400" />
                    <p className="text-sm text-gray-500">
                      Sân bay {ticket.departureAirport}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center">
                    <p className="mr-4 text-lg font-semibold text-gray-800">
                      {new Date(ticket.arrivalTime).toLocaleTimeString(
                        "vi-VN",
                        { hour: "2-digit", minute: "2-digit" },
                      )}
                    </p>
                    <div className="mx-2 h-12 border-l border-gray-400" />
                    <p className="text-sm text-gray-500">
                      Sân bay {ticket.arrivalAirport}
                    </p>
                  </div>
                </div>
                <div className="max-w-sm overflow-hidden rounded-lg bg-white shadow-md">
                  <div className="flex items-center justify-start bg-gray-200 p-3">
                    <FaMale className="m-0 mr-2 text-xl" />
                    <span className="font-medium text-gray-800">
                      Hành khách {index + 1}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600">
                      Họ và tên: {contact.firstName} {contact.lastName}
                    </p>
                    <p className="mt-2 text-gray-600">Quốc tịch: Việt Nam</p>
                    <p className="mt-2 text-gray-600">
                      Số điện thoại: {contact.phone}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">
                    Hãng hàng không: {ticket.airline} - {ticket.flightNumber}
                  </p>
                  <p className="text-sm text-gray-800">
                    Loại máy bay: Airbus A321
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-gray-800">
                    Hạng ghế: {ticket.seatNumber}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="mt-2 border-b-3" />
      <h3 className="mt-2 text-xl font-bold text-black">Thông tin Vé</h3>
      <div className="mt-2 space-y-4">
        <div className="flex items-center">
          <p className="w-60 font-medium">Tên người liên hệ:</p>
          <p>
            {contact.firstName} {contact.lastName}
          </p>
        </div>
        <div className="flex items-center">
          <p className="w-60 font-medium">Email:</p>
          <p>{contact.email}</p>
        </div>
        <div className="flex items-center">
          <p className="w-60 font-medium">Số hành khách:</p>
          <p>{booking.tickets.length}</p>
        </div>
        <div className="flex items-center">
          <p className="w-60 font-medium">Loại vé:</p>
          <p>{booking.isRoundTrip ? "Khứ hồi" : "Một chiều"}</p>
        </div>
        <div className="flex items-center">
          <p className="w-60 font-medium">Phương thức thanh toán:</p>
          <p>{payment.paymentMethod}</p>
        </div>
        <div className="flex items-center text-rose-700">
          <p className="w-60 font-medium">Tổng tiền:</p>
          <p className="font-medium">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(payment.amount)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
