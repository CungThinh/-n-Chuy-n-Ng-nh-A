// pages/api/flights.js
import axios from "axios";

export default async function handler(req, res) {
  const {
    engine,
    departure_id,
    arrival_id,
    outbound_date,
    return_date,
    currency = "VND",
    hl = "vi",
    api_key,
  } = req.query;

  if (!engine || !departure_id || !arrival_id || !outbound_date || !api_key) {
    return res.status(400).json({
      error:
        "Missing required parameters: engine, departure_id, arrival_id, outbound_date, api_key.",
    });
  }

  const url = "https://serpapi.com/search.json";
  const params = {
    engine,
    departure_id,
    arrival_id,
    outbound_date,
    currency,
    hl,
    api_key,
  };

  // Include return_date if it's not empty
  if (return_date) {
    params.return_date = return_date;
  }

  try {
    const response = await axios.get(url, { params });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching flights:", error.message);
    res.status(500).json({
      error: "An error occurred while fetching flight data",
      details: error.message,
    });
  }
}
