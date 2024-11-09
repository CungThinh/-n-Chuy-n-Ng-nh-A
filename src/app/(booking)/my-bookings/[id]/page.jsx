"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

import BookingDetails from "../components/BookingDetails";

export default function BookingDetail() {
  const router = useRouter();
  const { id } = useParams(); // Lấy id từ URL
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchBooking() {
      try {
        const res = await axios.get(`/api/bookings/${id}`);

        setBooking(res.data);
      } catch (error) {
        console.error("Error fetching booking:", error);
        router.push("/my-bookings"); // Điều hướng nếu lỗi xảy ra
      } finally {
        setLoading(false);
      }
    }

    fetchBooking();
  }, [id, router]);

  if (loading) return <p>Loading booking details...</p>;
  if (!booking) return <p>Booking not found</p>;

  return (
    <div>
      {booking ? (
        <BookingDetails booking={booking} />
      ) : (
        <p>Không tìm thấy thông tin đặt chỗ.</p>
      )}
    </div>
  );
}
