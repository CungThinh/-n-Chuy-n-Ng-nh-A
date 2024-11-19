import axios from "axios";

export const createStripePayment = async ({
  totalPrice,
  flightType,
  airlineName,
  airlineLogos,
  passengerInfo,
  bookingId,
}) => {
  try {
    const response = await axios.post("/api/payments/create-stripe-payment", {
      totalPrice,
      flightType,
      airlineName,
      airlineLogos,
      passengerInfo,
      bookingId,
    });

    return response.data; // Assuming the response contains a `url` field
  } catch (error) {
    console.error("Error creating Stripe payment:", error);
    throw new Error(
      error.response?.data?.error || "Stripe payment creation failed.",
    );
  }
};

export const createMomoPayment = async ({
  totalAmount,
  orderInfo,
  bookingId,
}) => {
  if (totalAmount > 50000000) {
    throw new Error(
      "MoMo không hỗ trợ thanh toán cho số tiền lớn hơn 50 triệu VND.",
    );
  }

  try {
    const response = await axios.post("/api/payments/create-momo-payment", {
      totalAmount,
      orderInfo,
      bookingId,
    });

    return response.data; // Assuming the response contains a `payUrl` field
  } catch (error) {
    console.error("Error creating MoMo payment:", error);
    throw new Error(
      error.response?.data?.message || "MoMo payment creation failed.",
    );
  }
};
