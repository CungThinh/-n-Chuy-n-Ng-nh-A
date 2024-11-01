import axios from "axios";

export default async function handler(req, res) {
  const {
    engine,
    departure_id,
    arrival_id,
    outbound_date,
    return_date,
    currency = "VND",
    hl = "vi", // Tham số ngôn ngữ
    gl = "vn", // Tham số vùng
    api_key,
    type = "1", // Mặc định là chuyến bay khứ hồi
    departure_token,
  } = req.query;

  if (!engine || !departure_id || !arrival_id || !outbound_date || !api_key) {
    return res.status(400).json({
      error:
        "Thiếu tham số yêu cầu: engine, departure_id, arrival_id, outbound_date, api_key.",
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
    gl,
    api_key,
    type,
  };

  // Nếu có `departure_token`, thêm nó vào params
  if (departure_token) {
    params.departure_token = departure_token;
  }

  // Nếu type là khứ hồi, thêm `return_date`
  if (return_date && type !== "2") {
    params.return_date = return_date;
  }

  try {
    const response = await axios.get(url, { params });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching flights:", error.message);
    res.status(500).json({
      error: "Đã xảy ra lỗi khi lấy dữ liệu chuyến bay",
      details: error.message,
    });
  }
}
