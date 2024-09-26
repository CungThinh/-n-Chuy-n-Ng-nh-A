'use client'

import React, { useState } from 'react'
import { FaFilter } from 'react-icons/fa';

const SortOptions = () => {
    const [selected, setSelected] = useState('Giá chuyến bay');
    const options = [
        'Giá chuyến bay',
        'Giờ khởi hành',
        'Giờ hạ cánh',
        'Thời gian bay',
        'Hàng không',
    ];

    return (
        <div className="w-full max-w-md bg-white rounded-lg shadow-md">
            <div className="bg-[#ffa300] text-white font-semibold py-3 px-4 rounded-t-lg">
                <span className="flex items-center">
                    <FaFilter></FaFilter>
                    Sắp xếp theo chuyến bay
                </span>
            </div>

            {/* Options */}
            <div className="p-4 space-y-4">
                {options.map((option) => (
                    <div
                        key={option}
                        className="flex items-center cursor-pointer border-b border-gray-200 py-3 px-2.5"
                        onClick={() => setSelected(option)}
                    >
                        <span
                            className={`w-7 h-7 border-2 rounded-full flex items-center justify-center ${selected === option ? 'border-[#ffa300]' : 'border-gray-300'
                                }`}
                        >
                            {selected === option && (
                                <span className="w-3 h-3 bg-[#ffa300] rounded-full"></span>
                            )}
                        </span>
                        <span
                            className={`ml-3 ${selected === option ? 'font-semibold text-black' : 'text-gray-600'
                                }`}
                        >
                            {option}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default SortOptions;