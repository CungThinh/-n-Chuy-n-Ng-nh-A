// pages/api/flights.js
import axios from 'axios';

export default async function handler(req, res) {
  const { departure_id, arrival_id, outbound_date, return_date, currency = 'VND', hl = 'vi', api_key } = req.query;
  console.log(req.query);

  if (!departure_id || !arrival_id || !outbound_date || !api_key) {
    return res.status(400).json({ error: 'Thiếu các tham số cần thiết: departure_id, arrival_id, outbound_date, api_key.' });
  }

  const url = 'https://serpapi.com/search.json';
  const params = {
    engine: 'google_flights',
    departure_id,
    arrival_id,
    outbound_date,
    return_date,
    currency,
    hl,
    api_key
  };
  
  try {
    const response = await axios.get(url, { params });
    res.status(200).json(response.data);
  } catch (error) 
  {
    console.log(error);
    console.error('Lỗi khi gọi API:', error.message);
    res.status(500).json({ error: 'Có lỗi xảy ra khi lấy dữ liệu chuyến bay', details: error.message });
  }
}
