import React, { useState, useEffect } from "react";
import {
  FaPlane,
  FaChevronDown,
  FaChevronUp,
  FaClock,
  FaSuitcase,
  FaExchangeAlt,
} from "react-icons/fa";

import SeatSelection from "./FlightSeatSelection"; // Import SeatSelection component

import { formatDuration } from "@/utils";

export default function FlightCard({
  flight,
  onSelect,
  leg,
  isSelectedFlight,
  onChangeFlight,
}) {
  const [showMore, setShowMore] = useState(false);
  const [showSeatSelection, setShowSeatSelection] = useState(false); // State to manage seat selection modal visibility
  const [selectedSeat, setSelectedSeat] = useState(null); // Store the selected seat

  // Lấy thông tin ghế đã chọn từ localStorage (nếu có)
  useEffect(() => {
    const savedSeat =
      leg === "outbound"
        ? localStorage.getItem("selectedOutboundSeat")
        : localStorage.getItem("selectedReturnSeat");

    setSelectedSeat(savedSeat);
  }, [leg]);

  const toggleShowMore = () => setShowMore(!showMore);

  // Handle seat selection and close the modal
  const handleSelectSeat = (seat) => {
    setSelectedSeat(seat);
    setShowSeatSelection(false);

    if (leg === "outbound") {
      localStorage.setItem("selectedOutboundSeat", seat); // Lưu ghế chiều đi
    } else if (leg === "return") {
      localStorage.setItem("selectedReturnSeat", seat); // Lưu ghế chiều về
    }

    onSelect(); // Tiếp tục các bước tiếp theo
  };

  const mainFlight = flight.flights[0];

  // Handle flight selection logic
  const handleFlightSelection = () => {
    if (!isSelectedFlight) {
      setShowSeatSelection(true); // Open seat selection modal only for new flight selection
    } else {
      // Call the onChangeFlight function to allow changing the flight
      if (onChangeFlight) {
        onChangeFlight(); // Call the provided function to reset flight
      }
    }
  };

  return (
    <div className="mx-auto mb-6 w-full max-w-6xl overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 to-white shadow-lg">
      <div className="p-6">
        <div className="flex flex-col items-center justify-between space-y-4 lg:flex-row lg:space-x-6 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-white p-2 shadow-md">
              <img
                className="size-12 object-contain"
                src={mainFlight.airline_logo}
                alt={`${mainFlight.airline} logo`}
              />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-800">
                {mainFlight.airline}
              </p>
              <p className="text-sm text-gray-500">
                {mainFlight.flight_number}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">
                {mainFlight.departure_airport.time.split(" ")[1]}
              </p>
              <p className="text-lg font-medium text-gray-600">
                {mainFlight.departure_airport.id}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <p className="mb-2 text-sm text-gray-500">
                {formatDuration(mainFlight.duration)}
              </p>
              <div className="relative mb-2 h-0.5 w-40 bg-gray-300">
                <FaPlane className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 text-blue-700" />
              </div>
              <p className="text-xs text-gray-500">
                {flight.layovers ? "Layover" : "Direct"}
              </p>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">
                {mainFlight.arrival_airport.time.split(" ")[1]}
              </p>
              <p className="text-lg font-medium text-gray-600">
                {mainFlight.arrival_airport.id}
              </p>
            </div>
          </div>
          {/* Đường gạch đứt dọc trước phần giá */}
          <div className="mx-4 hidden h-32 border-r border-dashed border-gray-300 lg:block"></div>
          <div className="text-center lg:text-right">
            <p className="text-black-600 text-2xl font-bold">
              {flight.price
                ? flight.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })
                : "Price unavailable"}
            </p>
            <p className="mb-1 text-sm text-gray-500">
              {leg === "outbound" ? "Outbound" : "Return"}
            </p>
            <p className="mb-3 text-sm text-gray-500">
              Available seats: {flight.availableSeats}
            </p>

            {/* Hiển thị ghế đã chọn nếu có và nếu flight đã được chọn */}
            {isSelectedFlight && selectedSeat && (
              <p className="mb-3 text-sm text-blue-500">
                Selected Seat: {selectedSeat}
              </p>
            )}

            {/* The "Select Flight" button now triggers seat selection or flight change based on the condition */}
            <button
              onClick={handleFlightSelection} // Conditional logic for flight selection or change
              className={`rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300 ${
                isSelectedFlight
                  ? "border-2 border-blue-600 bg-white text-blue-600 hover:bg-blue-50"
                  : "bg-yellow-500 text-white hover:bg-black"
              }`}
            >
              {isSelectedFlight ? "Change Selection" : "Select Flight"}
            </button>

            {/* Add the new "Select Seat Again" button */}
            {isSelectedFlight && (
              <button
                onClick={() => setShowSeatSelection(true)} // Show the seat selection modal
                className="mt-2 rounded-full bg-blue-500 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Select Seat Again
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Seat Selection Modal */}
      {showSeatSelection && (
        <SeatSelection
          totalSeats={flight.availableSeats} // Pass available seats
          bookedSeats={flight.bookedSeats || []} // Pass the list of booked seats
          onClose={() => setShowSeatSelection(false)} // Close seat selection
          onSelectSeat={handleSelectSeat} // Select a seat and proceed to the next step
          leg={leg} // Truyền biến leg vào SeatSelection
        />
      )}

      {showMore && (
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-start space-x-3">
              <FaClock className="mt-1 size-5 text-blue-500" />
              <div>
                <h5 className="mb-2 font-semibold text-gray-700">
                  Flight Details
                </h5>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">
                    {mainFlight.departure_airport.id}
                  </span>{" "}
                  {mainFlight.departure_airport.time} -
                  <span className="font-medium">
                    {" "}
                    {mainFlight.arrival_airport.id}
                  </span>{" "}
                  {mainFlight.arrival_airport.time}
                </p>
                <p className="text-sm text-gray-500">
                  {mainFlight.departure_airport.name}
                </p>
                <p className="text-sm text-gray-500">
                  {mainFlight.aircraft_type}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <FaExchangeAlt className="mt-1 size-5 text-blue-500" />
              <div>
                <h5 className="mb-2 font-semibold text-gray-700">
                  Refund Policy
                </h5>
                <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                  <li>Subject to airline policies</li>
                  <li>Refund = Charge + convenience fee</li>
                  <li>Date change = Fee + convenience fee</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <FaSuitcase className="mt-1 size-5 text-blue-500" />
              <div>
                <h5 className="mb-2 font-semibold text-gray-700">
                  Baggage Allowance
                </h5>
                <p className="text-sm text-gray-600">
                  {mainFlight.departure_airport.id}-
                  {mainFlight.arrival_airport.id}: 20KG / person
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 flex justify-center bg-gray-100 px-6 py-3">
        <button
          className="flex items-center font-medium text-gray-500 transition-colors duration-300 hover:text-blue-800"
          onClick={toggleShowMore}
        >
          {showMore ? "Hide details" : "Show more details"}
          {showMore ? (
            <FaChevronUp className="ml-2 size-3" />
          ) : (
            <FaChevronDown className="ml-2 size-3" />
          )}
        </button>
      </div>
    </div>
  );
}
