import axios from "axios";

export default async function handler(req, res) {
  console.log("Request query:", req.query);
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
    departure_token, // Sử dụng departure_token nếu có
    travel_class = "1", // Hạng ghế (mặc định là Economy)
  } = req.query;

  // Chuyển `outbound_date` và `return_date` sang múi giờ Việt Nam (nếu có)
  const vietnamTimeZone = "Asia/Ho_Chi_Minh";
  const currentDateTime = new Date(
    new Date().toLocaleString("en-US", { timeZone: vietnamTimeZone }),
  );

  // In ra thời gian thực tế để kiểm tra
  console.log("Thời gian thực hiện tại (theo giờ Việt Nam):", currentDateTime);

  // Chuyển đổi định dạng ngày tháng về YYYY-MM-DD để gửi đến API
  const formattedOutboundDate = outbound_date
    ? new Date(outbound_date).toLocaleDateString("en-CA", {
        timeZone: vietnamTimeZone,
      })
    : null;
  const formattedReturnDate = return_date
    ? new Date(return_date).toLocaleDateString("en-CA", {
        timeZone: vietnamTimeZone,
      })
    : null;

  console.log("Ngày đi đã chuyển đổi:", formattedOutboundDate);
  console.log("Ngày về đã chuyển đổi:", formattedReturnDate);

  // Kiểm tra các tham số yêu cầu
  if (
    !engine ||
    !departure_id ||
    !arrival_id ||
    !formattedOutboundDate ||
    !api_key
  ) {
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
    outbound_date: formattedOutboundDate,
    currency,
    hl,
    gl,
    api_key,
    type,
    travel_class, // Thêm hạng ghế vào tham số
  };

  if (departure_token) {
    params.departure_token = departure_token;
  }

  if (formattedReturnDate && type !== "2") {
    params.return_date = formattedReturnDate;
  }

  console.log("Các tham số gửi đến API:", params);

  try {
    const response = await axios.get(url, { params });

    console.log("Kết quả từ API:", response.data);

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu chuyến bay:", error.message);
    res.status(500).json({
      error: "Đã xảy ra lỗi khi lấy dữ liệu chuyến bay",
      details: error.message,
    });
  }
}
