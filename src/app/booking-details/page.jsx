'use client';

import { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';

export default function BookingDetailsPage() {
  const [flightDetails, setFlightDetails] = useState({ outbound: null, return: null });
  const [isOutboundDetailVisible, setIsOutboundDetailVisible] = useState(false);
  const [isReturnDetailVisible, setIsReturnDetailVisible] = useState(false);
  const [flightType, setFlightType] = useState("1");  // Mặc định là khứ hồi (1: khứ hồi, 2: một chiều)

  useEffect(() => {
    // Lấy thông tin chuyến bay từ localStorage
    const outboundFlight = localStorage.getItem('selectedOutboundFlight');
    const returnFlight = localStorage.getItem('selectedReturnFlight');
    const storedFlightType = localStorage.getItem('flightType');  // Lấy loại vé từ localStorage

    if (outboundFlight) {
      setFlightDetails({
        outbound: JSON.parse(outboundFlight),
        return: returnFlight ? JSON.parse(returnFlight) : null,
      });
    }

    setFlightType(storedFlightType || "1");  // Cập nhật loại vé (1: khứ hồi, 2: một chiều)
  }, []);

  const handleToggleOutboundDetail = () => {
    setIsOutboundDetailVisible(!isOutboundDetailVisible);
  };

  const handleToggleReturnDetail = () => {
    setIsReturnDetailVisible(!isReturnDetailVisible);
  };

  function formatDuration(durationInMinutes) {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours}g ${minutes}p`;
  }

  return (
    <div>
      {/* Phần trên cùng của trang */}
      <div className="w-full bg-blue-900 text-white py-4 px-8 flex items-center justify-between relative" style={{ height: '150px' }}>
        {/* Bạn có thể thêm logo hoặc thông tin khác ở đây */}
      </div>

      {/* Nội dung chính của trang */}
      <div className="flex justify-center items-start -mt-20" style={{ backgroundColor: '#f0f0f0' }}>
        <div className="w-full max-w-7xl p-4 grid grid-cols-1 lg:grid-cols-3 gap-2 relative">
          {/* Phần hiển thị chi tiết chuyến bay */}
          <div className="lg:col-span-2">
            <div className="w-full bg-white p-6 rounded-lg shadow-md">
              <div className="bg-orange-100 p-3 rounded-md mb-4">
                <span className="text-orange-700 font-semibold">VEMAYBAY sẽ bảo vệ chuyến đi của bạn và giữ an toàn cho thông tin của bạn</span>
              </div>

              {/* Hiển thị thông tin chiều đi */}
              {flightDetails.outbound && (
                <div className="relative bg-white p-6 rounded-lg shadow-md mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="bg-yellow-400 text-white px-3 py-1 rounded font-semibold mr-3">Chiều đi</span>
                      <h2 className="text-xl font-bold text-gray-800">
                        {flightDetails.outbound.flights[0].departure_airport.id} → {flightDetails.outbound.flights[flightDetails.outbound.flights.length - 1].arrival_airport.id}
                      </h2>
                    </div>
                    <button
                      onClick={handleToggleOutboundDetail}
                      className="text-orange-500 font-semibold underline"
                    >
                      Chi tiết
                    </button>
                  </div>

                  {/* Thông tin chuyến bay */}
                  <p className="text-sm text-gray-500 mb-4">
                    {flightDetails.outbound.flights[0].departure_airport.name} → {flightDetails.outbound.flights[flightDetails.outbound.flights.length - 1].arrival_airport.name}
                  </p>

                  {/* Giờ khởi hành, bay thẳng và giờ hạ cánh */}
                  <div className="flex justify-between items-center space-x-4">
                    {/* Logo hãng bay và số hiệu chuyến bay */}
                    <div className="flex items-center space-x-2">
                      <img
                        className="h-10 w-10 object-contain"
                        src={flightDetails.outbound.flights[0].airline_logo}
                        alt="logo"
                      />
                      <div className="flex flex-col text-start text-xs lg:text-sm">
                        <div>{flightDetails.outbound.flights[0].airline}</div>
                        <div className="text-black">{flightDetails.outbound.flights[0].flight_number}</div>
                      </div>
                    </div>

                    {/* Thời gian khởi hành */}
                    <div className="flex flex-col items-center text-center">
                      <p className="text-xl font-bold">
                        {flightDetails.outbound.flights[0].departure_airport.time.substring(11, 16)}
                      </p>
                      <p className="text-sm text-gray-500">{flightDetails.outbound.flights[0].departure_airport.id}</p>
                    </div>

                    {/* Tuyến bay */}
                    <Tooltip
                      content={<span>{flightDetails.outbound.flights[flightDetails.outbound.flights.length - 1].arrival_airport.name}</span>}
                      placement="bottom"
                      showArrow={true}
                      radius="none"
                    >
                      <div className="flex w-1/2 flex-col justify-between space-y-1 overflow-hidden">
                        <div className="overflow-hidden text-center text-xs text-black">
                          <span className="inline-block truncate whitespace-nowrap">
                            {formatDuration(flightDetails.outbound.total_duration)}
                          </span>
                        </div>
                        <div className="relative flex justify-between">
                          <div className="h-1.5 w-1.5 rounded-full bg-black"></div>
                          <div className="h-1.5 w-1.5 rounded-full bg-black"></div>
                          <div className="h-1.5 w-1.5 rounded-full bg-black"></div>
                          <div className="absolute top-1/2 z-0 h-0.5 w-full -translate-y-1/2 bg-black"></div>
                        </div>
                        <div className="text-center text-sm text-slate-400">
                          <span>{flightDetails.outbound.flights.length > 1 ? "Layover" : "Bay thẳng"}</span>
                        </div>
                      </div>
                    </Tooltip>

                    {/* Thời gian hạ cánh */}
                    <div className="flex flex-col items-center text-center">
                      <p className="text-xl font-bold">
                        {flightDetails.outbound.flights[flightDetails.outbound.flights.length - 1].arrival_airport.time.substring(11, 16)}
                      </p>
                      <p className="text-sm text-gray-500">{flightDetails.outbound.flights[flightDetails.outbound.flights.length - 1].arrival_airport.id}</p>
                    </div>
                  </div>

                  {/* Hiển thị chi tiết chiều đi */}
                  {isOutboundDetailVisible && (
                    <div className="mt-4">
                      {flightDetails.outbound.flights.map((flight, index) => (
                        <div key={index} className="flex justify-between items-center mt-4 bg-gray-100 p-4 rounded-lg shadow-sm">
                          {/* Cột bên trái */}
                          <div className="flex flex-col items-center space-y-2 w-1/3">
                            <div className="text-lg font-bold text-gray-800">{flight.departure_airport.time}</div>
                            <div className="text-xs text-gray-500">{flight.departure_airport.date}</div>
                            <div className="flex flex-col items-center">
                              <div className="h-2 w-2 rounded-full border-2 border-blue-500 m-1"></div>
                              <div className="h-14 w-0.5 bg-black"></div>
                              <div className="h-2 w-2 rounded-full bg-blue-500 m-1"></div>
                            </div>
                            <div className="text-lg font-bold text-gray-800">{flight.arrival_airport.time}</div>
                            <div className="text-xs text-gray-500">{flight.arrival_airport.date}</div>
                          </div>

                          {/* Cột giữa */}
                          <div className="flex flex-col justify-between space-y-2 w-2/4">
                            <div>
                              <p className="font-semibold text-gray-800">
                                Bay từ: ({flight.departure_airport.id}) {flight.departure_airport.country_name}
                              </p>
                              <p className="text-sm text-gray-500"> {flight.departure_airport.name} </p>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">Bay đến: ({flight.arrival_airport.id})</p>
                              <p className="text-sm text-gray-500"> {flight.arrival_airport.name}</p>
                            </div>
                          </div>

                          {/* Cột bên phải */}
                          <div className="flex flex-col items-end text-right space-y-2 w-1/4">
                            <img
                              src={flight.airline_logo}
                              alt="logo"
                              className="h-8 w-8 object-contain"
                            />
                            <p className="text-sm font-semibold text-gray-800">Hãng bay: {flight.airline}</p>
                            <p className="text-sm text-gray-500">Số hiệu: {flight.flight_number}</p>
                            <p className="text-sm text-gray-500">Thời gian bay: {formatDuration(flight.duration)}</p>
                            <p className="text-sm text-gray-500">Máy bay: {flight.airplane}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Hiển thị chiều về nếu là vé khứ hồi */}
              {flightType === "1" && flightDetails.return && (
                <div className="relative bg-white p-6 rounded-lg shadow-md mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="bg-yellow-400 text-white px-3 py-1 rounded font-semibold mr-3">Chiều về</span>
                      <h2 className="text-xl font-bold text-gray-800">
                        {flightDetails.return.flights[0].departure_airport.id} → {flightDetails.return.flights[flightDetails.return.flights.length - 1].arrival_airport.id}
                      </h2>
                    </div>
                    <button
                      onClick={handleToggleReturnDetail}
                      className="text-orange-500 font-semibold underline"
                    >
                      Chi tiết
                    </button>
                  </div>

                  {/* Thông tin chuyến bay */}
                  <p className="text-sm text-gray-500 mb-4">
                    {flightDetails.return.flights[0].departure_airport.name} → {flightDetails.return.flights[flightDetails.return.flights.length - 1].arrival_airport.name}
                  </p>
                   {/* Giờ khởi hành, bay thẳng và giờ hạ cánh */}
                   <div className="flex justify-between items-center space-x-4">
                      {/* Logo hãng bay và số hiệu chuyến bay */}
                      <div className="flex items-center space-x-2">
                        <img
                          className="h-10 w-10 object-contain"
                          src={flightDetails.return.flights[0].airline_logo}
                          alt="logo"
                        />
                        <div className="flex flex-col text-start text-xs lg:text-sm">
                          <div>{flightDetails.return.flights[0].airline}</div>
                          <div className="text-black">{flightDetails.return.flights[0].flight_number}</div>
                        </div>
                      </div>

                      {/* Thời gian khởi hành */}
                      <div className="flex flex-col items-center text-center">
                        <p className="text-xl font-bold">
                          {flightDetails.return.flights[0].departure_airport.time.substring(11, 16)}
                        </p>
                        <p className="text-sm text-gray-500">{flightDetails.return.flights[0].departure_airport.id}</p>
                      </div>

                      {/* Tuyến bay */}
                      <Tooltip
                        content={<span>{flightDetails.return.flights[flightDetails.return.flights.length - 1].arrival_airport.name}</span>}
                        placement="bottom"
                        showArrow={true}
                        radius="none"
                      >
                        <div className="flex w-1/2 flex-col justify-between space-y-1 overflow-hidden">
                          <div className="overflow-hidden text-center text-xs text-black">
                            <span className="inline-block truncate whitespace-nowrap">
                              {formatDuration(flightDetails.return.total_duration)}
                            </span>
                          </div>
                          <div className="relative flex justify-between">
                            <div className="h-1.5 w-1.5 rounded-full bg-black"></div>
                            <div className="h-1.5 w-1.5 rounded-full bg-black"></div>
                            <div className="h-1.5 w-1.5 rounded-full bg-black"></div>
                            <div className="absolute top-1/2 z-0 h-0.5 w-full -translate-y-1/2 bg-black"></div>
                          </div>
                          <div className="text-center text-sm text-slate-400">
                            <span>{flightDetails.return.flights.length > 1 ? "Layover" : "Bay thẳng"}</span>
                          </div>
                        </div>
                      </Tooltip>

                      {/* Thời gian hạ cánh */}
                      <div className="flex flex-col items-center text-center">
                        <p className="text-xl font-bold">
                          {flightDetails.return.flights[flightDetails.return.flights.length - 1].arrival_airport.time.substring(11, 16)}
                        </p>
                        <p className="text-sm text-gray-500">{flightDetails.return.flights[flightDetails.return.flights.length - 1].arrival_airport.id}</p>
                      </div>
                    </div>

                  {/* Hiển thị chi tiết chiều về */}
                  {isReturnDetailVisible && (
                    <div className="mt-4">
                      {flightDetails.return.flights.map((flight, index) => (
                        <div key={index} className="flex justify-between items-center mt-4 bg-gray-100 p-4 rounded-lg shadow-sm">
                          {/* Cột bên trái */}
                          <div className="flex flex-col items-center space-y-2 w-1/3">
                            <div className="text-lg font-bold text-gray-800">{flight.departure_airport.time}</div>
                            <div className="text-xs text-gray-500">{flight.departure_airport.date}</div>
                            <div className="flex flex-col items-center">
                              <div className="h-2 w-2 rounded-full border-2 border-blue-500 m-1"></div>
                              <div className="h-14 w-0.5 bg-black"></div>
                              <div className="h-2 w-2 rounded-full bg-blue-500 m-1"></div>
                            </div>
                            <div className="text-lg font-bold text-gray-800">{flight.arrival_airport.time}</div>
                            <div className="text-xs text-gray-500">{flight.arrival_airport.date}</div>
                          </div>

                          {/* Cột giữa */}
                          <div className="flex flex-col justify-between space-y-2 w-2/4">
                            <div>
                              <p className="font-semibold text-gray-800">
                                Bay từ: ({flight.departure_airport.id}) {flight.departure_airport.country_name}
                              </p>
                              <p className="text-sm text-gray-500"> {flight.departure_airport.name} </p>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">Bay đến: ({flight.arrival_airport.id})</p>
                              <p className="text-sm text-gray-500"> {flight.arrival_airport.name}</p>
                            </div>
                          </div>

                          {/* Cột bên phải */}
                          <div className="flex flex-col items-end text-right space-y-2 w-1/4">
                            <img
                              src={flight.airline_logo}
                              alt="logo"
                              className="h-8 w-8 object-contain"
                            />
                            <p className="text-sm font-semibold text-gray-800">Hãng bay: {flight.airline}</p>
                            <p className="text-sm text-gray-500">Số hiệu: {flight.flight_number}</p>
                            <p className="text-sm text-gray-500">Thời gian bay: {formatDuration(flight.duration)}</p>
                            <p className="text-sm text-gray-500">Máy bay: {flight.airplane}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Thông tin hành lý */}
          <div className="lg:col-span-1 ml-4">
            <div className="bg-white p-4 shadow-md" style={{ borderRadius: '20px' }}>
              <h2 className="text-lg font-bold mb-4" style={{ color: '#000000' }}>Thông tin hành lý</h2>
              <div className="mb-2">
                <h3 className="font-bold" style={{ color: '#000000' }}>Người lớn (Hành khách 1)</h3>
                <ul className="list-disc pl-5">
                  <li className="text-sm" style={{ color: '#000000' }}>Hành lý ký gửi: 1 kiện</li>
                  <li className="text-sm" style={{ color: '#000000' }}>Hành lý xách tay: 1 kiện</li>
                </ul>
              </div>
              <h2 className="text-lg font-bold mb-4" style={{ color: '#000000' }}>Chi tiết giá</h2>
              <div className="text-sm" style={{ color: '#000000' }}>
                {flightDetails.outbound && (
                  <>
                    <p>Giá vé: {flightDetails.outbound.price} VND</p>
                    <p>Thuế và phí: Chưa tính</p>
                  </>
                )}
              </div>
              <div className="flex items-center justify-between mt-2" style={{ marginTop: '30px' }}>
                <h2 className="text-xl font-bold" style={{ color: '#000000' }}>Tổng</h2>
                {flightDetails.outbound && (
                  <h2 className="text-xl font-bold" style={{ color: '#000000' }}>{flightDetails.outbound.price} VND</h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
