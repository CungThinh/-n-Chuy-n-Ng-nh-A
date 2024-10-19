"use client";

import React, { useState } from "react";
import { FaPlane, FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { encryptPNR } from "@/utils";

const BookingSearchPage = () => {
    const [pnrId, setPnrId] = useState("")
    const router = useRouter();
    const [error, setError] = useState(null)

    const handleSearch = async () => {
        if (!pnrId) {
            setError("Vui lòng nhập số mã hồ sơ đặt chỗ");
            return;
        }
        router.push(`/booking-search/result?pnr_id=${encryptPNR(pnrId)}`)

    }

    return (
        <div className="relative flex justify-center items-center h-[800px]" style={{ backgroundImage: `url('/images/bg1.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div>
                <div className="mb-2 text-center">
                    <h1 className="text-white text-4xl font-bold">Tra cứu vé máy bay</h1>
                </div>
                <div className="bg-[#fff] p-10 shadow-lg" style={{ borderRadius: '20px' }}>
                    <div className="flex-col">
                        {error && <p className="text-red-500 mb-2">{error}</p>}
                        <div className="flex justify-between gap-3">
                            <div className="relative">
                                <FaPlane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                <input
                                    type="text"
                                    value={pnrId}
                                    onChange={(e) => setPnrId(e.target.value)}
                                    placeholder="Mã hồ sơ đặt chỗ"
                                    className="pl-10 p-3 w-full rounded-lg bg-[#fff] focus:outline-none focus:ring-2 focus:ring-orange-400 text-black text-xl border"
                                />
                            </div>
                            <button className="bg-orange-500 text-white text-xl px-6 py-3 rounded-lg flex items-center justify-center h-[55px]" onClick={handleSearch}>
                                <FaSearch className="mr-2" /> Tìm kiếm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingSearchPage; 