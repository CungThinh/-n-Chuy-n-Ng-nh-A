"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const bookingId = searchParams.get("bookingId");

  useEffect(() => {
    const updatePaymentStatus = async () => {
      try {
        // Gửi yêu cầu cập nhật trạng thái thanh toán thành công
        await axios.post("/api/payments/update-status", {
          bookingId,
          status: "successful",
        });
      } catch (error) {
        console.error("Lỗi cập nhật trạng thái thanh toán:", error);
      }
    };

    updatePaymentStatus();
  }, [bookingId]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-10 shadow-md">
        <h1 className="mb-4 text-3xl font-bold text-green-500">
          Thanh toán thành công!
        </h1>
        <p className="mb-8 text-lg text-gray-700">
          Cảm ơn bạn đã thanh toán. Bạn có thể quay về trang chủ.
        </p>
        <button
          className="rounded-lg bg-blue-500 px-6 py-3 text-white transition duration-300 hover:bg-blue-700"
          onClick={() => router.push("/")}
        >
          Quay về trang chủ
        </button>
      </div>
    </div>
  );
}
