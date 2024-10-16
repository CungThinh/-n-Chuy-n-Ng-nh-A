import React from "react";
import { FaAngleDown, FaMale } from "react-icons/fa";
import { useState } from "react";

const BookingDetails = () => {
    const [isFlightDetailVisible, setIsFlightDetailVisible] = useState(false);
    const handleToggleFlightDetail = () => {
        setIsFlightDetailVisible(!isFlightDetailVisible);
    };
    const booking = {
        "id": 2,
        "contactCustomerId": 1,
        "isRoundTrip": true,
        "createdAt": "2024-10-09T16:00:57.713Z",
        "updatedAt": "2024-10-09T16:00:57.713Z",
        "contactCustomer": {
            "id": 1,
            "firstName": "Mạc",
            "lastName": "Cung",
            "phone": "Thịnh",
            "email": "macthinh22@gmail.com"
        },
        "tickets": [
            {
                "id": 1,
                "bookingId": 2,
                "flightNumber": "A",
                "airline": "A",
                "departureAirport": "A",
                "arrivalAirport": "A",
                "departureTime": "2024-10-13T16:13:00.000Z",
                "arrivalTime": "2024-10-27T16:13:00.000Z",
                "travelClass": "Economy",
                "total_duration": 123,
                "price": 123,
                "legroom": "no",
                "customerId": 4,
                "passportNumber": "2222222222",
                "customer": {
                    "id": 4,
                    "firstName": "Mạc",
                    "middleName": "Cung",
                    "lastName": "Thịnh",
                    "dateOfBirth": "2024-10-19T00:00:00.000Z",
                    "gender": "Nam",
                    "nationality": "Việt Nam",
                    "passportNumber": "2222222222",
                    "passportExpiry": "2024-10-03T00:00:00.000Z",
                    "passportIssuedAt": "Việt Nam"
                }
            },
            {
                "id": 2,
                "bookingId": 2,
                "flightNumber": "AAA",
                "airline": "A",
                "departureAirport": "AAA",
                "arrivalAirport": "AAA",
                "departureTime": "2024-10-17T03:14:00.000Z",
                "arrivalTime": "2024-10-20T03:14:00.000Z",
                "travelClass": "Business",
                "total_duration": 111,
                "price": 111,
                "legroom": "no",
                "customerId": 4,
                "passportNumber": "2222222222",
                "customer": {
                    "id": 4,
                    "firstName": "Mạc",
                    "middleName": "Cung",
                    "lastName": "Thịnh",
                    "dateOfBirth": "2024-10-19T00:00:00.000Z",
                    "gender": "Nam",
                    "nationality": "Việt Nam",
                    "passportNumber": "2222222222",
                    "passportExpiry": "2024-10-03T00:00:00.000Z",
                    "passportIssuedAt": "Việt Nam"
                }
            }
        ],
        "payment": null
    }
    return (
        <div className="max-w-4xl bg-white p-6">
            <div className="flex justify-between">
                <div className="font-medium"> Mã đặt chỗ: {booking.id}</div>
                <div className="font-medium"> Trạng thái: Chưa thanh toán</div>
                <div className="font-medium"> Ngày đặt: {new Date(booking.createdAt).toLocaleDateString('vi-VN')}</div>
            </div>
            <div className="border-b-3 mt-2"></div>
            <h3 className="text-xl font-bold text-black mt-2">Thông tin chuyến bay</h3>
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="bg-yellow-300 text-white px-2 py-1 rounded font-semibold">Chiều đi</span>
                        <p className="text-sm mt-2" style={{ color: '#000000' }}>Sân bay Tân Sơn Nhất - Sân bay Nội Bài</p>
                    </div>
                    <button onClick={handleToggleFlightDetail} className="text-sm text-gray-500 flex items-center">
                        Chi tiết <FaAngleDown className={isFlightDetailVisible ? 'transform rotate-180 ml-1' : 'ml-1'} />
                    </button>
                </div>
                <div className="flex items-center justify-around mt-4 relative">
                    <div className="flex flex-col items-center">
                        <p className="text-xl font-bold" style={{ color: '#000000', marginBottom: '4px' }}>06:00</p>
                        <p className="text-sm text-gray-600">SGN</p>
                    </div>
                    <div className="flex flex-col items-center mx-4">
                        <span className="text-sm text-gray-600">2g 10p</span>
                        <div className="border-t border-gray-400 w-16 mt-1 mb-1"></div>
                        <p className="text-xs text-gray-500">Bay thẳng</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-xl font-bold" style={{ color: '#000000', marginBottom: '4px' }}>08:10</p>
                        <p className="text-sm text-gray-600">HAN</p>
                    </div>
                </div>
                {isFlightDetailVisible && (
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg" style={{ zIndex: 10, position: 'relative' }}>
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-left">
                                <p className="text-sm text-gray-500 mb-2">Ngày: T2, 07/10/2024</p>
                                <div className="flex items-center">
                                    <p className="text-lg font-semibold text-gray-800 mr-4">14:25</p>
                                    <div className="border-l border-gray-400 h-12 mx-2"></div>
                                    <p className="text-sm text-gray-500">Sân bay Tân Sơn Nhất (SGN)</p>
                                </div>
                                <div className="flex items-center mt-4">
                                    <p className="text-lg font-semibold text-gray-800 mr-4">16:30</p>
                                    <div className="border-l border-gray-400 h-12 mx-2"></div>
                                    <p className="text-sm text-gray-500">Sân bay Nội Bài (HAN)</p>
                                </div>
                            </div>
                            <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
                                {/* Header của card */}
                                <div className="flex items-center bg-gray-200 p-3 justify-start"> {/* Thêm justify-start để căn trái */}
                                    <FaMale className="text-xl m-0 mr-2" />
                                    <span className="text-gray-800 font-medium">Hành khách 1</span>
                                </div>

                                {/* Nội dung của card */}
                                <div className="p-4">
                                    <p className="text-gray-600">Họ và tên: Mạc Cung Thịnh</p>
                                    <p className="text-gray-600 mt-2">Quốc tịch: Việt Nam</p>
                                    <p className="text-gray-600 mt-2">Ngày sinh: 24/02/2003</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-gray-800">Hãng hàng không: Vietjet Air - VJ120</p>
                                <p className="text-sm text-gray-800">Loại máy bay: Airbus A321</p>
                            </div>
                            <div className="text-right">
                                <span className="text-gray-800 font-semibold">Hạng ghế: 321B</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="border-b-3 mt-2"></div>
            <h3 className="text-xl font-bold text-black mt-2">Thông tin Vé</h3>
            <div className="space-y-4 mt-2">
                <div className="flex items-center">
                    <p className="font-medium w-40">Tên người liên hệ:</p>
                    <p>Nguyễn Văn A</p>
                </div>
                <div className="flex items-center">
                    <p className="font-medium w-40">Email:</p>
                    <p>macthinh22@gmail.com</p>
                </div>
                <div className="flex items-center">
                    <p className="font-medium w-40">Số hành khách:</p>
                    <p>1</p>
                </div>
                <div className="flex items-center">
                    <p className="font-medium w-40">Loại vé:</p>
                    <p>Khứ hồi</p>
                </div>
                <div className="flex items-center">
                    <p className="font-medium w-40">Hạng vé:</p>
                    <p>Economy</p>
                </div>
                <div className="flex items-center text-rose-700">
                    <p className="font-medium w-40">Tổng tiền:</p>
                    <p className="font-medium">12.000.000 VND</p>
                </div>
            </div>
        </div>
    );
};

export default BookingDetails;