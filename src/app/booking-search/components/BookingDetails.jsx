import React, { useState } from "react";
import { FaAngleDown, FaMale } from "react-icons/fa";

const BookingDetails = ({ booking }) => {
    const [isFlightDetailVisible, setIsFlightDetailVisible] = useState(false);
    const handleToggleFlightDetail = () => {
        setIsFlightDetailVisible(!isFlightDetailVisible);
    };

    const contact = booking.contactCustomer;
    const payment = booking.payment; 

    // Kiểm tra trạng thái thanh toán
    const paymentStatus = payment.status === "Pending" ? "Chưa thanh toán" : 
                          payment.status === "Failed" ? "Đã hủy" : "Đã thanh toán";

    return (
        <div className="max-w-4xl bg-white p-6">
            <div className="flex justify-between">
                <div className="font-medium">Mã đặt chỗ: {booking.pnr_id}</div>
                <div className="font-medium">Trạng thái: {paymentStatus}</div>
                <div className="font-medium">Ngày đặt: {new Date(booking.createdAt).toLocaleDateString('vi-VN')}</div>
            </div>
            <div className="border-b-3 mt-2"></div>

            <h3 className="text-xl font-bold text-black mt-2">Thông tin chuyến bay</h3>

            {booking.tickets.map((ticket, index) => (
                <div className="bg-white p-4 rounded-lg shadow-md mb-4" key={index}>
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="bg-yellow-300 text-white px-2 py-1 rounded font-semibold">
                                {ticket.tripType === "Outbound" ? "Chiều đi" : "Chiều về"}
                            </span>
                            <p className="text-sm mt-2" style={{ color: '#000000' }}>
                                Sân bay {ticket.departureAirport} - Sân bay {ticket.arrivalAirport}
                            </p>
                        </div>
                        <button onClick={handleToggleFlightDetail} className="text-sm text-gray-500 flex items-center">
                            Chi tiết <FaAngleDown className={isFlightDetailVisible ? 'transform rotate-180 ml-1' : 'ml-1'} />
                        </button>
                    </div>
                    <div className="flex items-center justify-around mt-4 relative">
                        <div className="flex flex-col items-center">
                            <p className="text-xl font-bold" style={{ color: '#000000', marginBottom: '4px' }}>
                                {new Date(ticket.departureTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            <p className="text-sm text-gray-600">{ticket.departureAirport}</p>
                        </div>
                        <div className="flex flex-col items-center mx-4">
                            <span className="text-sm text-gray-600">{Math.floor(ticket.total_duration / 60)}g {ticket.total_duration % 60}p</span>
                            <div className="border-t border-gray-400 w-16 mt-1 mb-1"></div>
                            <p className="text-xs text-gray-500">Bay thẳng</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-xl font-bold" style={{ color: '#000000', marginBottom: '4px' }}>
                                {new Date(ticket.arrivalTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            <p className="text-sm text-gray-600">{ticket.arrivalAirport}</p>
                        </div>
                    </div>
                    {isFlightDetailVisible && (
                        <div className="mt-4 bg-gray-100 p-4 rounded-lg" style={{ zIndex: 10, position: 'relative' }}>
                            <div className="flex justify-between items-center mb-4">
                                <div className="text-left">
                                    <p className="text-sm text-gray-500 mb-2">Ngày: {new Date(ticket.departureTime).toLocaleDateString('vi-VN')}</p>
                                    <div className="flex items-center">
                                        <p className="text-lg font-semibold text-gray-800 mr-4">
                                            {new Date(ticket.departureTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                        <div className="border-l border-gray-400 h-12 mx-2"></div>
                                        <p className="text-sm text-gray-500">Sân bay {ticket.departureAirport}</p>
                                    </div>
                                    <div className="flex items-center mt-4">
                                        <p className="text-lg font-semibold text-gray-800 mr-4">
                                            {new Date(ticket.arrivalTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                        <div className="border-l border-gray-400 h-12 mx-2"></div>
                                        <p className="text-sm text-gray-500">Sân bay {ticket.arrivalAirport}</p>
                                    </div>
                                </div>
                                <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="flex items-center bg-gray-200 p-3 justify-start">
                                        <FaMale className="text-xl m-0 mr-2" />
                                        <span className="text-gray-800 font-medium">Hành khách {index + 1}</span>
                                    </div>
                                    <div className="p-4">
                                        <p className="text-gray-600">Họ và tên: {contact.firstName} {contact.lastName}</p>
                                        <p className="text-gray-600 mt-2">Quốc tịch: Việt Nam</p>
                                        <p className="text-gray-600 mt-2">Số điện thoại: {contact.phone}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-gray-800">Hãng hàng không: {ticket.airline} - {ticket.flightNumber}</p>
                                    <p className="text-sm text-gray-800">Loại máy bay: Airbus A321</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-gray-800 font-semibold">Hạng ghế: {ticket.seatNumber}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            <div className="border-b-3 mt-2"></div>
            <h3 className="text-xl font-bold text-black mt-2">Thông tin Vé</h3>
            <div className="space-y-4 mt-2">
                <div className="flex items-center">
                    <p className="font-medium w-60">Tên người liên hệ:</p>
                    <p>{contact.firstName} {contact.lastName}</p>
                </div>
                <div className="flex items-center">
                    <p className="font-medium w-60">Email:</p>
                    <p>{contact.email}</p>
                </div>
                <div className="flex items-center">
                    <p className="font-medium w-60">Số hành khách:</p>
                    <p>{booking.tickets.length}</p>
                </div>
                <div className="flex items-center">
                    <p className="font-medium w-60">Loại vé:</p>
                    <p>{booking.isRoundTrip ? 'Khứ hồi' : 'Một chiều'}</p>
                </div>
                <div className="flex items-center">
                    <p className="font-medium w-60">Phương thức thanh toán:</p>
                    <p>{payment.paymentMethod}</p>
                </div>
                <div className="flex items-center text-rose-700">
                    <p className="font-medium w-60">Tổng tiền:</p>
                    <p className="font-medium">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(payment.amount)}</p>
                </div>
            </div>
        </div>
    );
};

export default BookingDetails;
