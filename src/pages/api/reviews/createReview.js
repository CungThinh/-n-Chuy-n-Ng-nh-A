// pages/api/reviews/createReview.js
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { bookingId, rating, comment, email } = req.body;

    try {
      const review = await prisma.review.create({
        data: {
          bookingId,
          rating,
          comment,
          email,
        },
      });

      res.status(201).json(review);
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(500).json({ error: "Lỗi khi tạo đánh giá" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
  }
}
