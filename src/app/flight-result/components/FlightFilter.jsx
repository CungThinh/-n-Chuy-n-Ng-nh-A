'use client'
import React, { useState } from 'react';
import './styles.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { getMinMaxPrice, getUniqueAirlineNames } from '../../../utils'
import sampleApiResponse from '../../../data/sampleApiResponse.json'

const FlightFilter = () => {
    const { minPrice, maxPrice } = getMinMaxPrice(sampleApiResponse);
    // State cho slider giá tiền
    const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
    // State cho slider thời gian bay
    const [flightDuration, setFlightDuration] = useState([165, 1405]);
    // Hàm xử lý thay đổi cho slider giá tiền
    const handlePriceChange = (value) => {
        setPriceRange(value);
    };

    // Hàm xử lý thay đổi cho slider thời gian bay
    const handleFlightDurationChange = (value) => {
        setFlightDuration(value);
    };

    const uniqueAirlineNames = getUniqueAirlineNames(sampleApiResponse);

    const [selectedAirlines, setSelectedAirlines] = useState({});

    // Hàm xử lý khi người dùng chọn hoặc bỏ chọn checkbox
    const handleCheckboxChange = (airline) => {
        setSelectedAirlines({
            ...selectedAirlines,
            [airline]: !selectedAirlines[airline]
        });
    };

    return (
        <div className="hidden shrink-0 basis-[282px] md:block">
            <form noValidate className="">
                <div
                    id="filter-flight-ctn"
                    className="filter-flight-ctn flex flex-col space-y-3 pr-3 md:h-[68vh] lg:!max-h-[75vh]"
                    style={{ maxHeight: '649px' }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b-2 py-3">
                        <span className="text-lg font-semibold">Bộ lọc</span>
                        <span className="cursor-pointer text-sm text-primary">Xóa tất cả</span>
                    </div>

                    {/* Filter by stop point */}
                    <div>
                        <div className="py-3">
                            <span className="font-semibold">Điểm dừng</span>
                        </div>

                        <div className="py-2">
                            <div className="flex-1 relative flex-col space-y-2">
                                <div className="flex flex-row items-center space-x-2">
                                    <input
                                        id=":raa:"
                                        className="form-checkbox cursor-pointer rounded-md text-primary focus:ring-0 focus:ring-offset-0 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-theme-gray-200 placeholder:font-light placeholder:not-italic placeholder:text-theme-black/30"
                                        type="checkbox"
                                        value="false"
                                        name="stopPoint.0.isSelected"
                                    />
                                    <label htmlFor=":raa:" className="flex-shrink-0 text-black cursor-pointer whitespace-normal flex-1 !text-neutral-black">
                                        Bay thẳng
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="py-2">
                            <div className="flex-1 relative flex-col space-y-2">
                                <div className="flex flex-row items-center space-x-2">
                                    <input
                                        id=":rab:"
                                        className="form-checkbox cursor-pointer rounded-md text-primary focus:ring-0 focus:ring-offset-0 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-theme-gray-200 placeholder:font-light placeholder:not-italic placeholder:text-theme-black/30"
                                        type="checkbox"
                                        value="false"
                                        name="stopPoint.1.isSelected"
                                    />
                                    <label htmlFor=":rab:" className="flex-shrink-0 text-black cursor-pointer whitespace-normal flex-1 !text-neutral-black">
                                        1 điểm dừng
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="py-2">
                            <div className="flex-1 relative flex-col space-y-2">
                                <div className="flex flex-row items-center space-x-2">
                                    <input
                                        id=":rac:"
                                        className="form-checkbox cursor-pointer rounded-md text-primary focus:ring-0 focus:ring-offset-0 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-theme-gray-200 placeholder:font-light placeholder:not-italic placeholder:text-theme-black/30"
                                        type="checkbox"
                                        value="false"
                                        name="stopPoint.2.isSelected"
                                    />
                                    <label htmlFor=":rac:" className="flex-shrink-0 text-black cursor-pointer whitespace-normal flex-1 !text-neutral-black">
                                        Nhiều điểm dừng
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filter by price */}
                    <div className="border-t-2">
                        <div className="py-3">
                            <span className="font-semibold">Giá tiền</span>
                        </div>
                        <div className="flex flex-col space-y-2 p-3">
                            <div>
                                <div className="flex-1 relative flex-col space-y-2">
                                    <Slider
                                        range
                                        min={9047520}
                                        max={53595020}
                                        defaultValue={priceRange}
                                        onChange={handlePriceChange}
                                        trackStyle={{ backgroundColor: 'rgb(23, 23, 26)', height: '2px' }}
                                        handleStyle={[
                                            { borderColor: 'rgb(23, 23, 26)', height: '20px', width: '20px', backgroundColor: 'rgb(252, 252, 252)', opacity: '1', marginTop: -9, },
                                            { borderColor: 'rgb(23, 23, 26)', height: '20px', width: '20px', backgroundColor: 'rgb(252, 252, 252)', opacity: '1', marginTop: -9, }
                                        ]}
                                        railStyle={{ backgroundColor: 'rgb(23, 23, 26)', height: '2px' }}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between text-neutral">
                                <span>{priceRange[0].toLocaleString('vi-VN')} ₫</span>
                                <span>{priceRange[1].toLocaleString('vi-VN')} ₫</span>
                            </div>
                        </div>
                    </div>

                    {/* Filter by flight duration */}
                    <div className="border-t">
                        <div className="py-3">
                            <span className="font-semibold">Thời gian bay</span>
                        </div>
                        <div className="flex flex-col space-y-2 p-3">
                            <div>
                                <div className="flex-1 relative flex-col space-y-2">
                                    <Slider
                                        range
                                        min={165}
                                        max={1405}
                                        defaultValue={flightDuration}
                                        onChange={handleFlightDurationChange}
                                        trackStyle={{ backgroundColor: 'rgb(23, 23, 26)', height: '2px' }}
                                        handleStyle={[
                                            { borderColor: 'rgb(23, 23, 26)', height: '20px', width: '20px', backgroundColor: 'rgb(252, 252, 252)', opacity: '1', marginTop: -9, },
                                            { borderColor: 'rgb(23, 23, 26)', height: '20px', width: '20px', backgroundColor: 'rgb(252, 252, 252)', opacity: '1', marginTop: -9, }
                                        ]}
                                        railStyle={{ backgroundColor: 'rgb(23, 23, 26)', height: '2px' }}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between text-neutral">
                                <span>{flightDuration[0]} phút</span>
                                <span>{flightDuration[1]} phút</span>
                            </div>
                        </div>
                    </div>

                    {/* More filters */}
                    <div className="border-t">
                        <div className="py-3">
                            <span className="font-semibold">Hãng bay</span>
                        </div>

                        {/* List of airlines */}
                        {uniqueAirlineNames.map((airline, index) => (
                            <div className="py-2" key={index}>
                                <div className="flex-1 relative flex-col space-y-2">
                                    <div className="flex flex-row items-center space-x-2">
                                        <input
                                            id={`airline-${index}`}
                                            className="form-checkbox cursor-pointer rounded-md text-primary focus:ring-0 focus:ring-offset-0 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-theme-gray-200 placeholder:font-light placeholder:not-italic placeholder:text-theme-black/30"
                                            type="checkbox"
                                            checked={selectedAirlines[airline] || false}
                                            onChange={() => handleCheckboxChange(airline)}
                                        />
                                        <label htmlFor={`airline-${index}`} className="flex-shrink-0 text-black cursor-pointer whitespace-normal flex-1 !text-neutral-black">
                                            {airline}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FlightFilter;