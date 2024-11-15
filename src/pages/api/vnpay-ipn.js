// pages/api/payments/vnpay-ipn.js
import crypto from "crypto";

import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const vnpParams = { ...req.query };
  const secureHash = vnpParams["vnp_SecureHash"];

  delete vnpParams["vnp_SecureHash"];
  delete vnpParams["vnp_SecureHashType"];

  const sortedParams = new URLSearchParams(Object.entries(vnpParams).sort());
  const signData = sortedParams.toString();
  const hmac = crypto.createHmac("sha512", process.env.VNPAY_HASH_SECRET);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  if (secureHash !== signed) {
    res.status(200).json({ RspCode: "97", Message: "Invalid signature" });

    return;
  }

  const transactionStatus = vnpParams["vnp_TransactionStatus"];
  const bookingId = parseInt(vnpParams["vnp_TxnRef"].split("-")[0], 10);
  const status = transactionStatus === "00" ? "thanh cong" : "that bai";

  try {
    await prisma.payment.update({
      where: { bookingId },
      data: { status },
    });
    res.status(200).json({ RspCode: "00", Message: "Success" });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(200).json({ RspCode: "99", Message: "Database error" });
  }
}
