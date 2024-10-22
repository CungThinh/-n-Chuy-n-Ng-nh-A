import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { totalPrice, flightType, airlineName, airlineLogo, passengerInfo } =
      req.body;

    try {
      // Định dạng ngày sinh thành chuỗi chỉ gồm ngày/tháng/năm
      const formattedDOB = new Date(passengerInfo.dob).toLocaleDateString(
        "vi-VN",
        {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        },
      );

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "vnd",
              product_data: {
                name: `Vemaybay.vn - ${flightType} - ${airlineName}`,
                description: `Hành khách: ${passengerInfo.firstName} ${passengerInfo.lastName}\nQuốc tịch: ${passengerInfo.nationality}\nNgày sinh: ${formattedDOB}`,
                images: [airlineLogo],
              },
              unit_amount: Math.round(totalPrice),
            },
            quantity: 1,
          },
        ],
        customer_email: passengerInfo.email,
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-cancel?session_id={CHECKOUT_SESSION_ID}`,
      });

      console.log("Stripe Session:", session); // Log lại kết quả session từ Stripe
      res.status(200).json({ url: session.url });
    } catch (error) {
      console.error("Stripe Error:", error);
      res.status(500).json({ error: "Đã xảy ra lỗi khi tạo phiên thanh toán" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
