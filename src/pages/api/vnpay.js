// pages/api/payments/vnpay.js
import crypto from "crypto";

import { format } from "date-fns";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });

    return;
  }

  const {
    amount,
    orderDescription,
    orderType,
    bankCode,
    locale = "vn",
    bookingId,
  } = req.body;

  // IP Address của khách hàng
  const ipAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  // Các thông tin cần thiết
  const tmnCode = process.env.VNPAY_TMN_CODE;
  const secretKey = process.env.VNPAY_HASH_SECRET;
  const vnpUrl = process.env.VNPAY_URL;
  const returnUrl = process.env.VNPAY_RETURN_URL;
  const createDate = format(new Date(), "yyyyMMddHHmmss");
  const orderId = `${bookingId}-${createDate}`;

  const vnpParams = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Amount: amount * 100, // Số tiền * 100
    vnp_CurrCode: "VND",
    vnp_TxnRef: orderId,
    vnp_OrderInfo: orderDescription,
    vnp_OrderType: orderType,
    vnp_Locale: locale,
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
  };

  if (bankCode) {
    vnpParams["vnp_BankCode"] = bankCode;
  }

  const sortedParams = new URLSearchParams(Object.entries(vnpParams).sort());
  const signData = sortedParams.toString();
  const hmac = crypto.createHmac("sha512", secretKey);
  const secureHash = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  sortedParams.append("vnp_SecureHash", secureHash);

  const paymentUrl = `${vnpUrl}?${sortedParams.toString()}`;

  res.status(200).json({ paymentUrl });
}
