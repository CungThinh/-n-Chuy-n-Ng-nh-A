'use client';

import { useState, useEffect } from 'react';
import sampleApiResponse from '../../../data/sampleApiResponse.json'

export default function FlightResult() {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        // Sử dụng dữ liệu mẫu để build giao diện
        setFlights(sampleApiResponse.other_flights);
    }, []);

    return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flights.map((flight, flightIndex) => (
                <div 
                    key={flightIndex} 
                    className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 space-y-4"
                >
                    <h1 className="text-xl font-semibold mb-4">Hành trình {flightIndex + 1}</h1>

                    {flight.flights.map((leg, legIndex) => (
                        <div 
                            key={legIndex} 
                            className="bg-gray-50 border border-gray-300 rounded-md p-4 space-y-2"
                        >
                            <h3 className="text-lg font-semibold">
                                Chặng {legIndex + 1}: {leg.departure_airport.name} → {leg.arrival_airport.name}
                            </h3>
                            <p><strong>Khởi hành:</strong> {leg.departure_airport.time} ({leg.departure_airport.id})</p>
                            <p><strong>Đến:</strong> {leg.arrival_airport.time} ({leg.arrival_airport.id})</p>
                            <p><strong>Hãng hàng không:</strong> {leg.airline} 
                                <img 
                                    src={leg.airline_logo} 
                                    alt={leg.airline} 
                                    className="inline-block ml-2 h-6 w-auto"
                                />
                            </p>
                            <p><strong>Loại máy bay:</strong> {leg.airplane}</p>
                            <p><strong>Số chuyến bay:</strong> {leg.flight_number}</p>
                            <p><strong>Hạng ghế:</strong> {leg.travel_class}</p>
                            <p><strong>Thời gian bay:</strong> {leg.duration} phút</p>

                            {/* Thông báo về chuyến bay thường bị trễ */}
                            {leg.often_delayed_by_over_30_min && (
                                <p className="text-red-500"><strong>Chuyến bay thường bị trễ hơn 30 phút.</strong></p>
                            )}
                        </div>
                    ))}

                    {/* Thông tin layover (nếu có) */}
                    {flight.layovers.length > 0 && (
                        <div className="bg-yellow-50 border border-yellow-400 rounded-md p-4 mt-4">
                            <h4 className="font-semibold">Thời gian nối chuyến:</h4>
                            {flight.layovers.map((layover, layoverIndex) => (
                                <p key={layoverIndex}>
                                    {layover.name} ({layover.id}) - Thời gian: {layover.duration} phút
                                </p>
                            ))}
                        </div>
                    )}

                    <p className="mt-4"><strong>Tổng thời gian:</strong> {flight.total_duration} phút</p>
                    <p><strong>Giá vé:</strong> ${flight.price}</p>
                    <p><strong>Lượng khí thải carbon:</strong> {flight.carbon_emissions.this_flight} kg</p>
                </div>
            ))}
        </div>
    );
}