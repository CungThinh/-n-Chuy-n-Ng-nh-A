"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resultCode = searchParams.get("resultCode"); // MoMo resultCode
  const sessionId = searchParams.get("session_id"); // Stripe session_id
  const bookingId = searchParams.get("bookingId");

  useEffect(() => {
    const updatePaymentStatus = async () => {
      try {
        if (bookingId) {
          // Kiểm tra nếu có `resultCode` của MoMo hoặc `sessionId` của Stripe
          if (resultCode === "0" || sessionId) {
            await axios.post("/api/payments/update-status", {
              bookingId,
              status: "successful", // cập nhật trạng thái thanh toán thành công
            });
          } else {
            await axios.post("/api/payments/update-status", {
              bookingId,
              status: "failed", // cập nhật trạng thái thanh toán thất bại hoặc bị hủy
            });
          }
        }
      } catch (error) {
        console.error("Lỗi cập nhật trạng thái thanh toán:", error);
      }
    };

    updatePaymentStatus();
  }, [resultCode, sessionId, bookingId]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-10 shadow-md">
        {resultCode === "0" || sessionId ? (
          <>
            <h1 className="mb-4 text-3xl font-bold text-green-500">
              Thanh toán thành công!
            </h1>
            <p className="mb-8 text-lg text-gray-700">
              Cảm ơn bạn đã thanh toán. Bạn có thể quay về trang chủ.
            </p>
          </>
        ) : (
          <h1 className="mb-4 text-3xl font-bold text-red-500">
            Thanh toán thất bại hoặc bị hủy.
          </h1>
        )}
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
