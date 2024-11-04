import React from "react";

import FlightCard from "./FlightCard";
import FlightFilter from "./FlightFilter";

const FlightList = ({ flights, onSelectFlight, leg, totalFlightsFound }) => {
  // Thêm totalFlightsFound vào props
  return (
    <div className="container mx-auto -mt-2 flex max-w-[min(100%,1440px)] flex-col space-y-4 pb-10 max-sm:px-0 sm:mt-0 sm:space-y-6">
      <div className="relative mt-10 flex gap-x-6">
        <FlightFilter />
        <div className="flex min-h-[80vh] max-w-full grow flex-col space-y-2 md:max-w-[calc(100%_-_282px-24px)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">
              {leg === "outbound" ? "Chọn chuyến bay đi" : "Chọn chuyến bay về"}
            </h2>
            <span className="font-medium text-black">
              Tours Found: {totalFlightsFound}
            </span>
          </div>
          <div className="infinite-scroll-component relative divide-y md:space-y-1.5 md:divide-y-0">
            <div className="min-h-[200px] space-y-2">
              {flights.map((flight, index) => (
                <FlightCard
                  flight={flight}
                  key={index}
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
