"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';  
import FlightList from './components/FlightResult';
import LoadingComponent from './components/LoadingSpinner';

const FlightSearchResult = () => {
  const searchParams = useSearchParams();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const engine = searchParams.get('engine');
    const departure_id = searchParams.get('departure_id');
    const arrival_id = searchParams.get('arrival_id');
    const outbound_date = searchParams.get('outbound_date');
    const return_date = searchParams.get('return_date');
    const currency = searchParams.get('currency');
    const hl = searchParams.get('hl');
    const api_key = searchParams.get('api_key');

    if (engine && departure_id && arrival_id && outbound_date && api_key) {
      fetchFlights(engine, departure_id, arrival_id, outbound_date, return_date, currency, hl, api_key);
    }
  }, [searchParams]);

  const fetchFlights = async (engine, departure_id, arrival_id, outbound_date, return_date, currency, hl, api_key) => {
    setLoading(true);
    try {
      console.log('Bắt đầu gọi API...');
      const response = await axios.get('/api/flights', {
        params: {
          engine,
          departure_id,
          arrival_id,
          outbound_date,
          return_date,
          currency,
          hl,
          api_key,
        },
      });
      console.log('Đã nhận được phản hồi từ API');
      setFlights(response.data.best_flights || []);
    } catch (error) {
      console.error('Lỗi khi gọi API với axios:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <FlightList flights={flights} />
    </div>
  );
};

export default FlightSearchResult;
