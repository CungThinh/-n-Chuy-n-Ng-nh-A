import crypto from "crypto";

import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { bookingId } = req.body;
  const booking = await prisma.booking.findUnique({
    where: {
      id: parseInt(bookingId),
    },
    include: {
      user: true,
      payment: true,
    },
  });

  try {
    if (!booking.payment) {
      await prisma.payment.create({
        data: {
          bookingId,
          amount: booking.totalAmount,
          paymentMethod: "momo",
          status: "pending",
        },
      });
    }

    // Tiếp tục quy trình xử lý thanh toán MoMo
    const partnerCode = "MOMO";
    const accessKey = "F8BBA842ECF85";
    const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?bookingId=${bookingId}`;
    const ipnUrl =
      "https://5b13-171-250-162-228.ngrok-free.app/api/payments/momo-webhook";
    const requestId = partnerCode + new Date().getTime();
    const orderId = `${bookingId}-${Date.now()}`;
    const requestType = "payWithMethod";
    const orderInfo = "Đặt vé máy bay";

    const rawSignature = `accessKey=${accessKey}&amount=${booking.totalAmount}&extraData=&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    const requestBody = JSON.stringify({
      partnerCode,
      accessKey,
      requestId,
      amount: booking.totalAmount,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      extraData: "",
      requestType,
      signature,
    });

    // Gửi yêu cầu thanh toán tới MoMo
    const response = await fetch(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      },
    );
    const data = await response.json();

    if (response.ok && data.payUrl) {
      return res.status(200).json({ payUrl: data.payUrl });
    } else {
      console.error("Failed to create MoMo payment:", data);

      return res
        .status(400)
        .json({ message: "Failed to create MoMo payment", data });
    }
  } catch (error) {
    console.error("Error creating or updating Payment:", error);

    return res
      .status(500)
      .json({ error: "An error occurred while creating or updating Payment." });
  }
}
