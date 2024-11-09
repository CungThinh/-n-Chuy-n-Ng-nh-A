"use client";
import React, { useState } from "react";
import Slider from "rc-slider";

import "rc-slider/assets/index.css";
import { getMinMaxPrice, getUniqueAirlineNames } from "../../../utils";
import sampleApiResponse from "../../../data/sampleApiResponse.json";

const FlightFilter = () => {
  const { minPrice, maxPrice } = getMinMaxPrice(sampleApiResponse);
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [flightDuration, setFlightDuration] = useState([165, 1405]);
  const uniqueAirlineNames = getUniqueAirlineNames(sampleApiResponse);
  const [selectedAirlines, setSelectedAirlines] = useState({});
  const [stopPoints, setStopPoints] = useState({
    direct: false,
    oneStop: false,
    multipleStops: false,
  });

  const handlePriceChange = (value) => setPriceRange(value);
  const handleFlightDurationChange = (value) => setFlightDuration(value);

  const handleCheckboxChange = (airline) => {
    setSelectedAirlines({
      ...selectedAirlines,
      [airline]: !selectedAirlines[airline],
    });
  };

  return (
    <div className="sticky top-4 h-screen basis-[282px] overflow-y-auto">
      <form noValidate>
        <div
          id="filter-flight-ctn"
          className="filter-flight-ctn flex flex-col space-y-3 pr-3"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 py-3">
            <span className="text-lg font-semibold">Bộ lọc</span>
            <span className="cursor-pointer text-sm text-primary">
              Xóa tất cả
            </span>
          </div>

          {/* Bộ lọc điểm dừng */}
          <div>
            <div className="py-3">
              <span className="font-semibold">Điểm dừng</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={stopPoints.direct}
                  onChange={() =>
                    setStopPoints((prev) => ({ ...prev, direct: !prev.direct }))
                  }
                />
                <label>Bay thẳng</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={stopPoints.oneStop}
                  onChange={() =>
                    setStopPoints((prev) => ({
                      ...prev,
                      oneStop: !prev.oneStop,
                    }))
                  }
                />
                <label>1 điểm dừng</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={stopPoints.multipleStops}
                  onChange={() =>
                    setStopPoints((prev) => ({
                      ...prev,
                      multipleStops: !prev.multipleStops,
                    }))
                  }
                />
                <label>Nhiều điểm dừng</label>
              </div>
            </div>
          </div>

          {/* Bộ lọc giá tiền */}
          <div className="border-t-2">
            <div className="py-3">
              <span className="font-semibold">Giá tiền</span>
            </div>
            <div className="p-3">
              <Slider
                range
                min={minPrice}
                max={maxPrice}
                defaultValue={priceRange}
                onChange={handlePriceChange}
              />
              <div className="text-neutral flex justify-between">
                <span>{priceRange[0].toLocaleString("vi-VN")} ₫</span>
                <span>{priceRange[1].toLocaleString("vi-VN")} ₫</span>
              </div>
            </div>
          </div>

          {/* Bộ lọc thời gian bay */}
          <div className="border-t">
            <div className="py-3">
              <span className="font-semibold">Thời gian bay</span>
            </div>
            <div className="p-3">
              <Slider
                range
                min={165}
                max={1405}
                defaultValue={flightDuration}
                onChange={handleFlightDurationChange}
              />
              <div className="text-neutral flex justify-between">
                <span>{flightDuration[0]} phút</span>
                <span>{flightDuration[1]} phút</span>
              </div>
            </div>
          </div>

          {/* Bộ lọc hãng bay */}
          <div className="border-t">
            <div className="py-3">
              <span className="font-semibold">Hãng bay</span>
            </div>
            {uniqueAirlineNames.map((airline, index) => (
              <div className="flex items-center space-x-2 py-2" key={index}>
                <input
                  type="checkbox"
                  checked={selectedAirlines[airline] || false}
                  onChange={() => handleCheckboxChange(airline)}
                />
                <label>{airline}</label>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default FlightFilter;
