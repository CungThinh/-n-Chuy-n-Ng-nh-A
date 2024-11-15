"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

import FlightList from "./components/FlightResult";
import ChangeSearchBar from "./components/FlightChangeSearchBar";
import FlightCard from "./components/FlightCard";
import ProgressBar from "./components/ProgressBar"; // Import thanh tiến trình mới

const FlightSearchResult = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [tripOption, setTripOption] = useState("One way");
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [step, setStep] = useState("outbound");
  const [outboundFlights, setOutboundFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [multiLegFlights, setMultiLegFlights] = useState([]);
  const [selectedOutboundFlight, setSelectedOutboundFlight] = useState(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0); // Thêm state cho progress
  const [totalFlightsFound, setTotalFlightsFound] = useState(0);

  // Thêm biến `travelClass` để lưu hạng ghế được chọn từ URL
  const travelClass = searchParams.get("travel_class") || "1"; // Mặc định là "Economy"

  // State cho các điểm dừng
  const [stopPoints, setStopPoints] = useState({
    direct: false,
    oneStop: false,
    multipleStops: false,
  });

  const [filteredOutboundFlights, setFilteredOutboundFlights] = useState([]);
  const [filteredReturnFlights, setFilteredReturnFlights] = useState([]);
  const [noResultsMessage, setNoResultsMessage] = useState("");

  // Hàm fetch chuyến bay và tạo số ghế ngẫu nhiên (giới hạn số ghế trống từ 1 đến 20)
  const fetchFlights = async (params, isReturn = false) => {
    setLoading(true);
    setProgress(0); // Đặt lại tiến trình khi bắt đầu tải dữ liệu
    try {
      const response = await axios.get("/api/flights", { params });

      console.log("API Response:", response.data);
      const { other_flights, multi_leg_flights } = response.data;

      // Giới hạn số ghế tối đa là 60
      const totalSeats = 60;

      // Tạo số ghế ngẫu nhiên cho mỗi chuyến bay, giới hạn từ 1 đến 20 ghế trống
      const flightsWithSeats = (other_flights || []).map((flight) => {
        const availableSeats = Math.floor(Math.random() * 20) + 1; // Random từ 1 đến 20 ghế trống

        return {
          ...flight,
          availableSeats: Math.min(availableSeats, totalSeats), // Đảm bảo số ghế trống không vượt quá 60
        };
      });

      const totalFlights = flightsWithSeats.length;

      setTotalFlightsFound(totalFlights);

      if (!isReturn) {
        setOutboundFlights(flightsWithSeats); // Dữ liệu chiều đi với số ghế ngẫu nhiên
      } else {
        setReturnFlights(flightsWithSeats); // Dữ liệu chiều về với số ghế ngẫu nhiên
      }

      setMultiLegFlights(multi_leg_flights || []);
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm cập nhật progress bar trong khi loading
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 300);

      return () => clearInterval(interval);
    } else {
      setProgress(100); // Hoàn thành progress khi dừng loading
    }
  }, [loading]);

  // Hàm lọc chuyến bay
  const filterFlights = (flights, stopPoints) => {
    let filteredFlights = flights;

    if (stopPoints.direct) {
      filteredFlights = filteredFlights.filter((flight) => !flight.layovers);
    }
    if (stopPoints.oneStop) {
      filteredFlights = filteredFlights.filter(
        (flight) => flight.layovers === 1,
      );
    }
    if (stopPoints.multipleStops) {
      filteredFlights = filteredFlights.filter((flight) => flight.layovers > 1);
    }

    return filteredFlights;
  };

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
    const type = searchParams.get("type") || "1";

    if (engine && departure_id && arrival_id && outbound_date && api_key) {
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
        type,
      });
    }
  }, [searchParams]);

  useEffect(() => {
    setFilteredOutboundFlights(filterFlights(outboundFlights, stopPoints));
    setFilteredReturnFlights(filterFlights(returnFlights, stopPoints));

    // Hiển thị thông báo khi không có chuyến bay
    if (
      filteredOutboundFlights.length === 0 &&
      step === "outbound" &&
      (stopPoints.direct || stopPoints.oneStop || stopPoints.multipleStops)
    ) {
      setNoResultsMessage(
        "Không có chuyến bay phù hợp với tiêu chí lọc của bạn.",
      );
    } else if (
      filteredReturnFlights.length === 0 &&
      step === "return" &&
      (stopPoints.direct || stopPoints.oneStop || stopPoints.multipleStops)
    ) {
      setNoResultsMessage(
        "Không có chuyến bay phù hợp với tiêu chí lọc của bạn.",
      );
    } else {
      setNoResultsMessage("");
    }
  }, [outboundFlights, returnFlights, stopPoints, step]);

  // Hàm xử lý thay đổi bộ lọc
  const handleFilterChange = (filters) => {
    const { priceRange, flightDuration, selectedAirlines, stopPoints } =
      filters;

    // Cập nhật state và áp dụng bộ lọc
    setStopPoints(stopPoints);
    setFilteredOutboundFlights(filterFlights(outboundFlights, stopPoints));
    setFilteredReturnFlights(filterFlights(returnFlights, stopPoints));
  };

  const handleSelectOutboundFlight = (flight) => {
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
    const type = searchParams.get("type") || "1";

    if (type === "2") {
      localStorage.setItem("selectedOutboundFlight", JSON.stringify(flight));
      localStorage.setItem("totalPrice", JSON.stringify(flight.price));
      router.push("/booking-details");
    } else if (type === "1") {
      setStep("return");
      fetchFlights(
        {
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
        },
        true,
      );
    }
  };

  const handleReSelectOutboundFlight = () => {
    // Hàm để chọn lại chuyến bay đi
    setStep("outbound");
    setSelectedOutboundFlight(null);
  };

  const handleSelectReturnFlight = (flight) => {
    setSelectedReturnFlight(flight);

    // Lưu thông tin vé chiều đi và chiều về vào localStorage
    localStorage.setItem(
      "selectedOutboundFlight",
      JSON.stringify(selectedOutboundFlight),
    );
    localStorage.setItem("selectedReturnFlight", JSON.stringify(flight));

    // Tính toán tổng giá vé
    const outboundPrice = selectedOutboundFlight
      ? selectedOutboundFlight.price
      : 0;
    const returnPrice = flight.price;
    const totalPrice = outboundPrice + returnPrice;

    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));

    // Chuyển hướng đến trang booking details
    router.push("/booking-details");
  };

  const handleSortFlights = (sortedFlights) => {
    if (step === "outbound") {
      setFilteredOutboundFlights(sortedFlights);
    } else {
      setFilteredReturnFlights(sortedFlights);
    }
  };

  // JSX cho giao diện hiển thị và thanh progress
  return (
    <div className="mx-auto max-w-7xl px-4" style={{ paddingTop: "80px" }}>
      {loading && <ProgressBar progress={progress} />}{" "}
      {/* Hiển thị thanh tiến trình */}
      <ChangeSearchBar
        from={from}
        to={to}
        departureDate={departureDate}
        returnDate={returnDate}
        passengers={passengers}
        tripOption={tripOption}
        classType="Economy"
        onSearch={() => {}}
      />
      {selectedOutboundFlight && step === "return" && (
        <div className="mb-4 rounded-lg border bg-gray-100 p-4">
          <h3 className="mb-2 text-lg font-bold">Chuyến bay bạn đã lựa chọn</h3>
          <FlightCard
            flight={selectedOutboundFlight}
            onSelect={() => {}}
            leg="outbound"
            isSelectedFlight={true}
            onChangeFlight={() => setSelectedOutboundFlight(null)}
          />
        </div>
      )}
      {noResultsMessage && (
        <div className="text-red-500">{noResultsMessage}</div>
      )}
      {step === "outbound" ? (
        <FlightList
          flights={filteredOutboundFlights}
          onSelectFlight={handleSelectOutboundFlight}
          leg="outbound"
          totalFlightsFound={filteredOutboundFlights.length}
          travelClass={travelClass} // Truyền hạng ghế vào FlightList
        />
      ) : (
        <FlightList
          flights={filteredReturnFlights}
          onSelectFlight={handleSelectReturnFlight}
          leg="return"
          totalFlightsFound={filteredReturnFlights.length}
          travelClass={travelClass} // Truyền hạng ghế vào FlightList
        />
      )}
    </div>
  );
};

export default FlightSearchResult;
