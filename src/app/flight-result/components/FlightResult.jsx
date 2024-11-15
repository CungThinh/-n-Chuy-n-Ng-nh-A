import React, { useState, useEffect } from "react";

import FlightCard from "./FlightCard";
import FlightFilter from "./FlightFilter";
import FlightSortBar from "./FlightSortBar";

const FlightList = ({
  flights,
  onSelectFlight,
  leg,
  totalFlightsFound,
  onSortChange,
  selectedSort,
  travelClass,
}) => {
  // Đặt tên cho các hạng ghế để hiển thị dễ hiểu hơn
  const travelClassLabel = {
    1: "Economy",
    2: "Premium Economy",
    3: "Business",
    4: "First",
  };

  // Quản lý trạng thái chuyến bay đã được sắp xếp
  const [sortedFlights, setSortedFlights] = useState(flights);

  useEffect(() => {
    setSortedFlights(flights);
  }, [flights]);

  // Hàm xử lý sắp xếp
  const handleSort = (sortedFlights) => {
    setSortedFlights(sortedFlights);
  };

  return (
    <div className="mx-auto -mt-2 flex max-w-7xl flex-col space-y-4 pb-10 max-sm:px-0 sm:mt-0 sm:space-y-6">
      <div className="relative mt-10 flex gap-x-6">
        <FlightFilter />
        <div className="flex min-h-[80vh] max-w-full grow flex-col space-y-4 md:max-w-[calc(100%_-_282px-24px)]">
          <div className="mb-4 flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {leg === "outbound"
                  ? "Chọn chuyến bay đi"
                  : "Chọn chuyến bay về"}
              </h2>
              <span className="font-medium text-black">
                Tổng vé bay: {totalFlightsFound} / Hạng ghế:{" "}
                {travelClassLabel[travelClass]}
              </span>
            </div>
          </div>

          {/* FlightSortBar nằm trên đầu danh sách các chuyến bay */}
          <FlightSortBar flights={sortedFlights} onSort={handleSort} />

          <div className="infinite-scroll-component relative divide-y md:space-y-1.5 md:divide-y-0">
            <div className="min-h-[200px] space-y-2">
              {sortedFlights.map((flight, index) => (
                <FlightCard
                  key={index}
                  flight={flight}
                  onSelect={() => onSelectFlight(flight)}
                  leg={leg}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightList;
