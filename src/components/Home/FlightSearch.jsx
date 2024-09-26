'use client';

import { useState } from 'react';
import { FaPlane, FaSearch } from 'react-icons/fa';

export default function FlightSearch() {
  const [tripType, setTripType] = useState('oneway');
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  return (
    <div className="bg-[#FFA300] min-h-screen flex items-center justify-center">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg max-w-3xl relative" style={{ width: '80%', maxWidth: '11400px', marginTop: '20px' }}>
        <h2 className="text-lg font-bold mb-4 text-orange-500 flex items-center">
          <FaPlane className="mr-2" /> Vé máy bay
        </h2>

        {/* Loại vé */}
        <div className="flex items-center space-x-4 mb-4">
          <label className="flex items-center text-black">
            <input
              type="radio"
              value="oneway"
              checked={tripType === 'oneway'}
              onChange={() => setTripType('oneway')}
              className="mr-2"
            />
            Một chiều
          </label>
          <label className="flex items-center text-black">
            <input
              type="radio"
              value="roundtrip"
              checked={tripType === 'roundtrip'}
              onChange={() => setTripType('roundtrip')}
              className="mr-2"
            />
            Khứ hồi
          </label>
          <label className="flex items-center text-black">
            <input
              type="radio"
              value="multicity"
              checked={tripType === 'multicity'}
              onChange={() => setTripType('multicity')}
              className="mr-2"
            />
            Nhiều chặng
          </label>
          <label className="flex items-center ml-auto text-black">
            <input
              type="checkbox"
              className="mr-2"
            />
            Tìm vé rẻ cả tháng
          </label>
        </div>

        {/* Form đặt vé */}
        <div className="grid grid-cols-2 gap-4">
          {/* Điểm đi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Điểm đi</label>
            <input
              type="text"
              placeholder="Nhập thành phố / mã sân bay"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Điểm đến */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Điểm đến</label>
            <input
              type="text"
              placeholder="Nhập thành phố / mã sân bay"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Ngày đi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ngày đi</label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            />
          </div>

          {/* Ngày về */}
          {tripType === 'roundtrip' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngày về</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              />
            </div>
          )}
        </div>

        {/* Số lượng hành khách */}
        <div className="flex items-center space-x-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Người lớn</label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setAdults(Math.max(1, adults - 1))}
                className="px-3 py-1 bg-gray-200 rounded text-black"
              >
                -
              </button>
              <span className='text-black'>{adults}</span>
              <button
                onClick={() => setAdults(adults + 1)}
                className="px-3 py-1 bg-gray-200 rounded text-black"
              >
                +
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trẻ em</label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setChildren(Math.max(0, children - 1))}
                className="px-3 py-1 bg-gray-200 rounded text-black"
              >
                -
              </button>
              <span className='text-black'>{children}</span>
              <button
                onClick={() => setChildren(children + 1)}
                className="px-3 py-1 bg-gray-200 rounded text-black"
              >
                +
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Em bé</label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setInfants(Math.max(0, infants - 1))}
                className="px-3 py-1 bg-gray-200 rounded text-black"
              >
                -
              </button>
              <span className='text-black'>{infants}</span>
              <button
                onClick={() => setInfants(infants + 1)}
                className="px-3 py-1 bg-gray-200 rounded text-black"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Nút tìm kiếm */}
        <div className="mt-6">
          <button className="w-full bg-orange-500 text-white py-3 rounded-md text-sm font-medium hover:bg-orange-600 flex justify-center items-center space-x-2">
            <FaSearch />
            <span>Tìm kiếm chuyến bay</span>
          </button>
        </div>
      </div>
    </div>
  );
}
