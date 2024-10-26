export const getUniqueAirlineNames = (data) => {
  const airlineNames = new Set();

  data.best_flights.forEach((flightGroup) => {
    flightGroup.flights.forEach((flight) => {
      airlineNames.add(flight.airline);
    });
  });

  // data.other_flights.forEach(flightGroup => {
  //     flightGroup.flights.forEach(flight => {
  //       airlineNames.add(flight.airline);
  //     });
  // });

  return Array.from(airlineNames);
};

export const getMinMaxPrice = (data) => {
  let minPrice = Infinity;
  let maxPrice = -Infinity;

  data.best_flights.forEach((flightGroup) => {
    const price = flightGroup.price;

    if (price < minPrice) minPrice = price;
    if (price > maxPrice) maxPrice = price;
  });

  // data.other_flights.forEach(flightGroup => {
  //     const price = flightGroup.price;
  //     if (price < minPrice) minPrice = price;
  //     if (price > maxPrice) maxPrice = price;
  // });

  return { minPrice, maxPrice };
};

export const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}g ${remainingMinutes}p`;
};

export const removeVietnameseTones = (str) => {
  return str
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

export const generatePNRCode = (str) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  let pnr = "";

  for (let i = 0; i < 3; i++) {
    pnr += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  for (let i = 0; i < 8; i++) {
    pnr += digits.charAt(Math.floor(Math.random() * digits.length));
  }

  return pnr;
};

const crypto = require("crypto");

// Khóa và vector khởi tạo (IV) cho mã hóa
const key = crypto
  .createHash("sha256")
  .update(String("secret-key"))
  .digest("base64")
  .substr(0, 32); // Tạo khóa 32 byte từ 'secret-key'

// Hàm mã hóa
export const encryptPNR = (pnrId) => {
  const iv = crypto.randomBytes(16); // Tạo một IV ngẫu nhiên
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(pnrId, "utf8", "hex");

  encrypted += cipher.final("hex");

  return `${iv.toString("hex")}:${encrypted}`; // Lưu IV kèm với dữ liệu mã hóa
};

// Hàm giải mã
export const decryptPNR = (encryptedPNR) => {
  const [ivHex, encrypted] = encryptedPNR.split(":"); // Tách IV và dữ liệu mã hóa
  const iv = Buffer.from(ivHex, "hex"); // Chuyển IV từ hex về buffer
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");

  decrypted += decipher.final("utf8");

  return decrypted;
};
