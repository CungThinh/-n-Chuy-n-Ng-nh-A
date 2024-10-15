"use client";

import React, { useState } from "react";
import { FaPlane, FaSearch } from "react-icons/fa";
import LoadingComponent from "../flight-result/components/LoadingSpinner";
import axios from "axios";
import BookingDetails from "./components/BookingDetails";

const TicketSearchResult = () => {
    const [passportId, setPassportId] = useState("")
    const [loading, setLoading] = useState(false)
    const [tickets, setTickets] = useState([])
    const [error, setError] = useState(null); // State để lưu lỗi

    const handleTicketSearch = async () => {
        if (!passportId) {
            alert("Vui lòng nhập số passport");
            return;
        }
        setLoading(true)
        try {
            const response = await axios.get(`api/tickets/passportNumber/${passportId}`)
            console.log(response)
            if (response.status === 200) {
                setTickets(response.data)
            }
            else {
                setError("Không tìm thấy vé với số passport này"); // Nếu không tìm thấy, hiển thị thông báo lỗi
            }
        }
        catch {
            setError("Đã xảy ra lỗi khi tìm kiếm vé. Vui lòng thử lại sau.");
        }
        finally {
            setLoading(false)
        }

    }
    if (loading) {
        return <LoadingComponent />
    }
    return (
        <>
            <BookingDetails/>
        </>
        // <div className="relative flex justify-center items-center h-[800px]" style={{ backgroundImage: `url('/images/bg1.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        //     {/* <div>
        //         <div className="mb-2 text-center">
        //             <h1 className="text-white text-4xl font-bold">Tra cứu vé máy bay</h1>
        //         </div>
        //         <div className="bg-[#fff] p-10 shadow-lg" style={{ borderRadius: '20px' }}>
        //             <div className="flex-col">
        //                 {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        //                 <div className="flex justify-between gap-3">
        //                     <div className="relative">
        //                         <FaPlane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        //                         <input
        //                             type="text"
        //                             value={passportId}
        //                             onChange={(e) => setPassportId(e.target.value)}
        //                             placeholder="Số passport"
        //                             className="pl-10 p-3 w-full rounded-lg bg-[#fff] focus:outline-none focus:ring-2 focus:ring-orange-400 text-black text-xl border"
        //                         />
        //                     </div>
        //                     <button className="bg-orange-500 text-white text-xl px-6 py-3 rounded-lg flex items-center justify-center h-[55px]" onClick={handleTicketSearch}>
        //                         <FaSearch className="mr-2" /> Tìm kiếm
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div> */}
        // </div>
    );
};

export default TicketSearchResult;