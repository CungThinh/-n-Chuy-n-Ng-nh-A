"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle, Star } from "lucide-react";
import axios from "axios";
import { format } from "date-fns";

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resultCode = searchParams.get("resultCode");
  const sessionId = searchParams.get("session_id");
  const bookingIdParam = searchParams.get("bookingId");

  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [adultCount, setAdultCount] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false); // Hiển thị modal đánh giá khi người dùng bấm "Quay về trang chủ"

  // Component EmojiRating để hiển thị đánh giá bằng emoji
  const EmojiRating = ({ onRatingChange }) => {
    const [isHovering, setIsHovering] = useState(null);

    const ratings = [
      { value: 1, emoji: "😠", label: "Rất tệ" },
      { value: 2, emoji: "😕", label: "Tệ" },
      { value: 3, emoji: "😐", label: "Bình thường" },
      { value: 4, emoji: "😊", label: "Tốt" },
      { value: 5, emoji: "😆", label: "Rất tốt" },
    ];

    const handleRatingClick = (value) => {
      if (onRatingChange) {
        onRatingChange(value);
      }
      setShowRatingModal(false); // Đóng modal sau khi chọn
      router.push("/"); // Điều hướng về trang chủ sau khi chọn đánh giá
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="relative w-full max-w-xl rounded-lg bg-[#002B4E] p-8 text-white">
          <h2 className="mb-8 text-center text-2xl font-semibold">
            Hãy đánh giá trải nghiệm của bạn với Mytrip
          </h2>

          <div className="flex justify-center gap-4">
            {ratings.map(({ value, emoji, label }) => (
              <div
                key={value}
                className="flex flex-col items-center gap-2"
                onMouseEnter={() => setIsHovering(value)}
                onMouseLeave={() => setIsHovering(null)}
              >
                <button
                  onClick={() => handleRatingClick(value)}
                  className={`text-4xl transition-transform duration-200 ${
                    isHovering === value ? "scale-125" : ""
                  }`}
                >
                  {emoji}
                </button>
                <span
                  className={`text-sm ${
                    rating === value ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const storedBookingInfo = JSON.parse(localStorage.getItem("bookingInfo"));

    setBookingInfo(storedBookingInfo);

    const storedAdultCount = JSON.parse(localStorage.getItem("adultCount"));

    if (storedAdultCount) setAdultCount(storedAdultCount);

    const updatePaymentStatus = async () => {
      try {
        if (bookingIdParam) {
          if (resultCode === "0" || sessionId) {
            await axios.post("/api/payments/update-status", {
              bookingId: bookingIdParam,
              status: "thanh cong",
            });
            setIsSuccess(true);
          } else {
            await axios.post("/api/payments/update-status", {
              bookingId: bookingIdParam,
              status: "that bai",
            });
            setIsSuccess(false);
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Lỗi cập nhật trạng thái thanh toán:", error);
        setIsLoading(false);
      }
    };

    if (bookingIdParam) {
      updatePaymentStatus();
    } else {
      setIsLoading(false);
    }
  }, [resultCode, sessionId, bookingIdParam]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitReview = async () => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/reviews/createReview", {
        bookingId: bookingInfo.bookingId,
        rating,
        comment,
        email: bookingInfo.email,
      });
      alert("Cảm ơn bạn đã đánh giá!");
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
      alert("Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoHome = () => {
    setShowRatingModal(true); // Hiển thị modal đánh giá khi bấm về trang chủ
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center space-x-2">
          <span className="animate-ping">✈️</span> {/* Icon máy bay */}
          <span className="text-lg text-gray-500">
            Đang xử lý đặt vé của bạn...
          </span>
        </div>
      </div>
    );
  }

  if (!bookingInfo || !bookingInfo.firstName) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Không tìm thấy thông tin đặt chỗ.
      </div>
    );
  }

  const totalPrice = bookingInfo.totalPrice * adultCount;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {showRatingModal && <EmojiRating onRatingChange={handleRatingChange} />}

      {!showRatingModal && (
        <div className="mx-auto max-w-7xl px-4" style={{ paddingTop: "80px" }}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-green-500 p-2">
                    <CheckCircle className="size-12 animate-[popIn_0.5s_ease-out] stroke-[3] text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {bookingInfo.firstName} {bookingInfo.lastName}, đặt vé của
                      bạn đã được gửi thành công!
                    </h1>
                    <p className="mt-1 text-gray-600">
                      Chi tiết đặt vé đã được gửi đến email của bạn:{" "}
                      {bookingInfo.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-6 border-b pb-2 text-xl font-bold">
                  Thông tin của bạn
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 items-center">
                    <span className="text-gray-600">Họ:</span>
                    <span className="col-span-2 font-medium">
                      {bookingInfo.lastName}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <span className="text-gray-600">Tên:</span>
                    <span className="col-span-2 font-medium">
                      {bookingInfo.firstName}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <span className="text-gray-600">Địa chỉ email:</span>
                    <span className="col-span-2 font-medium">
                      {bookingInfo.email}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <span className="text-gray-600">Quốc gia:</span>
                    <span className="col-span-2 font-medium">
                      {bookingInfo.nationality}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <span className="text-gray-600">Ngày sinh:</span>
                    <span className="col-span-2 font-medium">
                      {format(new Date(bookingInfo.dob), "dd/MM/yyyy")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-6 border-b pb-2 text-xl font-bold">
                  Đánh giá dịch vụ
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="mr-2">Đánh giá:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`size-6 cursor-pointer ${
                          star <= rating
                            ? "fill-current text-yellow-400"
                            : "text-gray-300"
                        }`}
                        onClick={() => handleRatingChange(star)}
                      />
                    ))}
                  </div>
                  <div>
                    <label htmlFor="comment" className="mb-2 block">
                      Nhận xét:
                    </label>
                    <textarea
                      id="comment"
                      className="w-full rounded-md border p-2"
                      rows="4"
                      value={comment}
                      onChange={handleCommentChange}
                      placeholder="Chia sẻ trải nghiệm của bạn..."
                    ></textarea>
                  </div>
                  <button
                    onClick={handleSubmitReview}
                    disabled={isSubmitting}
                    className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition duration-300 hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
                  </button>
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-6 border-b pb-2 text-xl font-bold">
                  Chi tiết đặt vé
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Mã đặt chỗ:</span>
                    <span className="font-medium">
                      #{bookingInfo?.pnrId || "Không có mã"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">ID Booking:</span>
                    <span className="font-medium">
                      {bookingInfo?.bookingId || "Không có ID"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Ngày đặt:</span>
                    <span className="font-medium">
                      {format(new Date(), "dd/MM/yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">
                      Phương thức thanh toán:
                    </span>
                    <span className="font-medium">
                      {resultCode === "0" ? "MoMo" : "Stripe"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Trạng thái đặt chỗ:</span>
                    <span className="font-medium text-green-600">
                      {isSuccess ? "Thành công" : "Thất bại"}
                    </span>
                  </div>
                  <div className="mt-4 border-t pt-4"></div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-gray-600">
                      Giá vé x {adultCount} người lớn:
                    </span>
                    <span className="font-medium">
                      {bookingInfo.totalPrice.toLocaleString("vi-VN")} VNĐ
                    </span>
                  </div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-gray-600">Thuế</span>
                    <span>Đã bao gồm</span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-4">
                    <span className="text-gray-600">Tổng cộng:</span>
                    <span className="font-medium">
                      {totalPrice.toLocaleString("vi-VN")} VNĐ
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 text-right">
            <button
              onClick={handleGoHome}
              className="rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition duration-300 hover:bg-blue-700"
            >
              Quay về trang chủ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
