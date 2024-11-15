"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FlightPageReview() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Hàm để gọi API và lấy danh sách đánh giá
  const fetchReviews = async () => {
    try {
      const response = await axios.get("/api/reviews/getReviews");

      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-4" style={{ padding: "80px" }}>
      <h2 className="mb-4 text-2xl font-bold">Đánh giá từ khách hàng</h2>
      {reviews.length === 0 ? (
        <p>Chưa có đánh giá nào.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="mb-4 rounded-md border p-4 shadow-sm">
            <h3 className="text-lg font-semibold">{review.email}</h3>
            <p>Rating: {review.rating} / 5</p>
            <p>{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}
