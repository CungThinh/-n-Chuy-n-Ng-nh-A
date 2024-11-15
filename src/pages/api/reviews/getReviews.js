// pages/api/reviews/index.js hoặc pages/api/reviews/getReviews.js
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const reviews = await prisma.review.findMany({
        orderBy: { createdAt: "desc" },
      });

      res.status(200).json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ error: "Lỗi khi lấy đánh giá" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end("Method Not Allowed");
  }
}
