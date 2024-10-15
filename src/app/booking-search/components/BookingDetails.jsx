import React from "react";
import { FaAngleDown, FaMale } from "react-icons/fa";
import { useState } from "react";

const BookingDetails = () => {
    const [isFlightDetailVisible, setIsFlightDetailVisible] = useState(false);
    const handleToggleFlightDetail = () => {
        setIsFlightDetailVisible(!isFlightDetailVisible);
    };
    return (
        <div className="max-w-4xl bg-white p-6">
            <div className="flex justify-between">
                <div className="font-medium"> Mã đặt chỗ: 4M65PJ</div>
                <div className="font-medium"> Trạng thái: Chưa thanh toán</div>
                <div className="font-medium"> Ngày đặt: 22/10/2024</div>
            </div>
            <div className="border-b-3 mt-2"></div>
            <div className="mb-8 mt-2">
                <h3 className="text-xl font-bold text-black">Thông tin hành khách</h3>
                <div className="gap-5 flex">
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
                        <p className="text-gray-600 mt-2">Dịch vụ miễn phí: Hành lý xách tay 7Kg</p>
                    </div>
                </div>
                <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Header của card */}
                    <div className="flex items-center bg-gray-200 p-3 justify-start"> {/* Thêm justify-start để căn trái */}
                        <FaMale className="text-xl m-0 mr-2" />
                        <span className="text-gray-800 font-medium">Hành khách 2</span>
                    </div>

                    {/* Nội dung của card */}
                    <div className="p-4">
                        <p className="text-gray-600">Họ và tên: Mạc Cung Thịnh</p>
                        <p className="text-gray-600 mt-2">Quốc tịch: Việt Nam</p>
                        <p className="text-gray-600 mt-2">Ngày sinh: 24/02/2003</p>
                        <p className="text-gray-600 mt-2">Dịch vụ miễn phí: Hành lý xách tay 7Kg</p>
                    </div>
                </div>
                </div>
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