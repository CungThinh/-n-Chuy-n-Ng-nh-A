// pages/api/searchFlights.js
import { GoogleSearch } from 'google-search-results-nodejs';

// pages/api/flights.js
export default async function handler(req, res) {
    const { from, to, departureDate, returnDate, adults, children, infants } = req.query;
  
    // Thông số cần cho SerpApi
    const params = {
      engine: "google_flights",
      departure_id: from,
      arrival_id: to,
      outbound_date: departureDate,
      return_date: returnDate || '',
      currency: "USD",
      hl: "en",
      api_key: "26289d3ee9afd987a59a23afc9585046f5368336fb181a8ee500c474ed6ec7b4"
    };
  
    try {
      const response = await fetch(`https://serpapi.com/search.json?${new URLSearchParams(params)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      res.status(500).json({ error: 'Có lỗi xảy ra khi lấy dữ liệu chuyến bay' });
    }
  }
  
