import axios from "axios";

export const createStripeQRPayment = async ({
  totalPrice,
  flightType,
  airlineName,
  airlineLogos,
  passengerInfo,
  bookingId,
}) => {
  console.log("Creating Stripe QR payment with bookingId:", bookingId); // Debug log

  if (!bookingId) {
    console.error("Missing bookingId in createStripeQRPayment"); // Debug log
    throw new Error("bookingId is required");
  }

  try {
    const response = await axios.post(
      "/api/payments/create-stripe-qr-payment",
      {
        totalPrice,
        flightType,
        airlineName,
        airlineLogos,
        passengerInfo,
        bookingId,
      },
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error creating Stripe QR payment:",
      error?.response?.data || error,
    );
    throw new Error(
      error?.response?.data?.error || "Không thể tạo thanh toán QR",
    );
  }
};

export const checkPaymentStatus = async (sessionId) => {
  try {
    const response = await axios.post("/api/payments/check-payment-status", {
      sessionId,
    });

    return response.data;
  } catch (error) {
    console.error("Error checking payment status:", error);
    throw new Error("Không thể kiểm tra trạng thái thanh toán");
  }
};

// Giữ nguyên các hàm khác
export const createStripePayment = async ({ bookingId }) => {
  try {
    const response = await axios.post("/api/payments/create-stripe-payment", {
      bookingId,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating Stripe payment:", error);
    throw new Error(
      error.response?.data?.error || "Stripe payment creation failed.",
    );
  }
};

export const createMomoPayment = async ({ bookingId }) => {
  if (totalAmount > 50000000) {
    throw new Error(
      "MoMo không hỗ trợ thanh toán cho số tiền lớn hơn 50 triệu VND.",
    );
  }

  try {
    const response = await axios.post("/api/payments/create-momo-payment", {
      bookingId,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating MoMo payment:", error);
    throw new Error(
      error.response?.data?.message || "MoMo payment creation failed.",
    );
  }
};
