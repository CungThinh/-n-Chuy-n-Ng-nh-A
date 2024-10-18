"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import FlightList from "./components/FlightResult";
import LoadingComponent from "./components/LoadingSpinner";
import FlightCard from "./components/FlightCard";  // Thêm dòng import này vào đầu file FlightSearchResult.jsx

const FlightSearchResult = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [step, setStep] = useState("outbound");  // Bước hiện tại: outbound hoặc return
  const [outboundFlights, setOutboundFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);  // Dữ liệu cho chuyến bay về
  const [multiLegFlights, setMultiLegFlights] = useState([]);  // Chuyến bay nhiều chặng
  const [selectedOutboundFlight, setSelectedOutboundFlight] = useState(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);  // Khai báo state cho chuyến bay về
  const [loading, setLoading] = useState(true);  // Trạng thái loading

  // Hàm fetch chuyến bay
  const fetchFlights = async (params, isReturn = false) => {
    setLoading(true);  // Hiển thị trạng thái loading khi gọi API
    console.log("Fetching flights with params:", params);  // Log params để kiểm tra
    try {
      const response = await axios.get("/api/flights", { params });
      const { other_flights, multi_leg_flights } = response.data;

      // Kiểm tra bước hiện tại (outbound hoặc return)
      if (!isReturn) {
        setOutboundFlights(other_flights || []);  // Dữ liệu chiều đi
      } else {
        setReturnFlights(other_flights || []);  // Dữ liệu chiều về
      }
      setMultiLegFlights(multi_leg_flights || []);
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setLoading(false);  // Tắt trạng thái loading
    }
  };

  // Khi ứng dụng khởi tạo, gọi API lần đầu tiên để tìm chuyến bay
  useEffect(() => {
    const engine = searchParams.get("engine");
    const departure_id = searchParams.get("departure_id");
    const arrival_id = searchParams.get("arrival_id");
    const outbound_date = searchParams.get("outbound_date");
    const return_date = searchParams.get("return_date");
    const currency = searchParams.get("currency");
    const hl = searchParams.get("hl");
    const gl = searchParams.get("gl") || "vn";
    const api_key = searchParams.get("api_key");
    const type = searchParams.get("type") || "1";  // Mặc định là 1: khứ hồi (round trip)

    if (engine && departure_id && arrival_id && outbound_date && api_key) {
      // Gọi API chuyến bay đi lần đầu tiên
      fetchFlights({
        engine,
        departure_id,
        arrival_id,
        outbound_date,
        return_date,  // Giữ nguyên return_date nếu có
        currency,
        hl,
        gl,
        api_key,
        type,
      });
    }
  }, [searchParams]);

  // Hàm xử lý khi chọn chuyến bay đi
  const handleSelectOutboundFlight = (flight) => {
    console.log("Selected outbound flight:", flight);
    const departureToken = flight.departure_token;

    setSelectedOutboundFlight(flight); 

    const engine = searchParams.get("engine");
    const departure_id = searchParams.get("departure_id");
    const arrival_id = searchParams.get("arrival_id");
    const outbound_date = searchParams.get("outbound_date");
    const return_date = searchParams.get("return_date");
    const currency = searchParams.get("currency");
    const hl = searchParams.get("hl");
    const gl = searchParams.get("gl") || "vn";
    const api_key = searchParams.get("api_key");
    const type = searchParams.get("type") || "1";  // Kiểm tra loại vé (1: khứ hồi, 2: một chiều)

    if (type === "2") {
      // Vé một chiều (one-way), lưu thông tin và chuyển trực tiếp đến trang booking details
      localStorage.setItem("selectedOutboundFlight", JSON.stringify(flight));
      localStorage.setItem("totalPrice", JSON.stringify(flight.price)); // Lưu giá cho chuyến bay đi
      router.push("/booking-details");
    } else if (type === "1") {
      // Vé khứ hồi (round-trip), chuyển sang bước chọn chuyến về
      setStep("return");

      // Gọi lại API chuyến bay chiều về với `departure_token`
      fetchFlights({
        engine,
        departure_id,
        arrival_id,
        outbound_date,
        return_date,
        currency,
        hl,
        gl,
        api_key,
        type: "1", 
        departure_token: departureToken,
      }, true);
    }
};

const handleSelectReturnFlight = (flight) => {
    setSelectedReturnFlight(flight);  // Lưu chuyến bay chiều về đã chọn
    localStorage.setItem("selectedOutboundFlight", JSON.stringify(selectedOutboundFlight));
    localStorage.setItem("selectedReturnFlight", JSON.stringify(flight));

    const outboundPrice = selectedOutboundFlight ? selectedOutboundFlight.price : 0;
    const returnPrice = flight.price;

    const totalPrice = outboundPrice + returnPrice; // Tổng giá vé chiều đi và chiều về
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice)); // Lưu tổng giá

    router.push("/booking-details");
};


  // Hàm xử lý khi người dùng muốn chọn lại chuyến bay đi
  const handleReSelectOutboundFlight = () => {
    setSelectedOutboundFlight(null);  // Xóa chuyến bay đi đã chọn
    setStep("outbound");  // Quay lại bước chọn chuyến bay đi
  };

  if (loading) {
    return <LoadingComponent />;  // Hiển thị trạng thái loading
  }

  return (
    <div style={{ paddingTop: "80px" }} className="container mx-auto max-w-[1440px] px-4">
      {/* Hiển thị chuyến bay đi đã chọn nếu người dùng đã chọn */}
      {selectedOutboundFlight && step === "return" && (
        <div className="mb-4 border rounded-lg p-4 bg-gray-100">
          <h3 className="text-lg font-bold mb-2">Chuyến bay bạn đã lựa chọn</h3>
          <FlightCard
            flight={selectedOutboundFlight}
            onSelect={handleReSelectOutboundFlight}  // Nút "Chọn lại"
            leg="outbound"
            isSelectedFlight={true}  // Đánh dấu là chuyến bay đã chọn
          />
        </div>
      )}
      {step === "outbound" ? (
        <FlightList
          flights={outboundFlights}
          onSelectFlight={handleSelectOutboundFlight}
          leg="outbound"
        />
      ) : (
        <FlightList
          flights={returnFlights}  // Hiển thị danh sách chuyến bay về
          onSelectFlight={handleSelectReturnFlight}
          leg="return"
        />
      )}
    </div>
  );
};

export default FlightSearchResult;
