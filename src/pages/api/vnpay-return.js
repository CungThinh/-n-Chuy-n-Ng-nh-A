// pages/api/payments/vnpay-return.js
import crypto from "crypto";

export default async function handler(req, res) {
  const vnpParams = { ...req.query };
  const secureHash = vnpParams["vnp_SecureHash"];

  delete vnpParams["vnp_SecureHash"];
  delete vnpParams["vnp_SecureHashType"];

  const sortedParams = new URLSearchParams(Object.entries(vnpParams).sort());
  const signData = sortedParams.toString();
  const hmac = crypto.createHmac("sha512", process.env.VNPAY_HASH_SECRET);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    const transactionStatus = vnpParams["vnp_TransactionStatus"];
    const message =
      transactionStatus === "00"
        ? "Thanh toán thành công"
        : "Thanh toán thất bại";

    res.redirect(`/payment-success?message=${message}`);
  } else {
    res.redirect("/payment-success?message=Invalid signature");
  }
}
