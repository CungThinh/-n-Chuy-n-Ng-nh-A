import { useState } from "react";
import { Star, Image as ImageIcon, Smile, X } from "lucide-react";
import {
  FaAngleDown,
  FaUser,
  FaPlaneDeparture,
  FaPlaneArrival,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { Tooltip } from "@nextui-org/react";
import axios from "axios";

import CancelBookingModal from "./CancelBookingModal";

import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Enhanced Review Section Component
const EnhancedReviewSection = ({ onSubmit, isSubmitting }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Available emojis/reactions
  const availableEmojis = [
    { icon: "😊", label: "happy" },
    { icon: "❤️", label: "heart" },
    { icon: "👍", label: "thumbs-up" },
    { icon: "🌟", label: "star" },
    { icon: "🎉", label: "party" },
    { icon: "🏆", label: "trophy" },
    { icon: "🇻🇳", label: "vietnam-flag" },
    { icon: "✈️", label: "airplane" },
    { icon: "🌴", label: "palm-tree" },
    { icon: "📸", label: "camera" },
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setSelectedImages([...selectedImages, ...newImages]);
  };

  const removeImage = (index) => {
    const newImages = [...selectedImages];

    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  const toggleEmoji = (emoji) => {
    if (selectedEmojis.includes(emoji)) {
      setSelectedEmojis(selectedEmojis.filter((e) => e !== emoji));
    } else {
      setSelectedEmojis([...selectedEmojis, emoji]);
    }
  };

  const handleSubmit = () => {
    const reviewData = {
      rating,
      comment,
      images: selectedImages.map((img) => img.file),
      emojis: selectedEmojis,
    };

    onSubmit(reviewData);
  };

  return (
    <div className="mt-10 rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Đánh giá dịch vụ</h2>
      <div className="space-y-6">
        {/* Star Rating */}
        <div className="flex items-center">
          <span className="mr-2">Đánh giá:</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`size-6 cursor-pointer ${
                  star <= rating
                    ? "fill-current text-yellow-400"
                    : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>

        {/* Emoji Selector */}
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="mr-2">Biểu cảm:</span>
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="flex items-center rounded-md bg-gray-100 px-3 py-1 text-gray-700 hover:bg-gray-200"
            >
              <Smile className="mr-1 size-4" />
              Chọn biểu tượng
            </button>
          </div>

          {showEmojiPicker && (
            <div className="grid grid-cols-5 gap-2 rounded-lg border bg-white p-2 shadow-lg sm:grid-cols-10">
              {availableEmojis.map((emoji) => (
                <button
                  key={emoji.label}
                  onClick={() => toggleEmoji(emoji)}
                  className={`rounded p-2 text-xl hover:bg-gray-100 ${
                    selectedEmojis.includes(emoji) ? "bg-blue-100" : ""
                  }`}
                >
                  {emoji.icon}
                </button>
              ))}
            </div>
          )}

          {selectedEmojis.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedEmojis.map((emoji, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm"
                >
                  {emoji.icon}
                  <button
                    onClick={() => toggleEmoji(emoji)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Comment Section */}
        <div>
          <label htmlFor="comment" className="mb-2 block">
            Nhận xét:
          </label>
          <textarea
            id="comment"
            className="w-full rounded-md border p-2"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Chia sẻ trải nghiệm của bạn..."
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <div className="flex items-center">
            <label
              htmlFor="images"
              className="flex cursor-pointer items-center rounded-md bg-gray-100 px-4 py-2 hover:bg-gray-200"
            >
              <ImageIcon className="mr-2 size-5" />
              Thêm hình ảnh
            </label>
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {selectedImages.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.preview}
                    alt={`Preview ${index + 1}`}
                    className="h-24 w-full rounded-lg object-cover"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition duration-300 hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
        </button>
      </div>
    </div>
  );
};

// Main BookingDetails Component
const BookingDetails = ({ booking }) => {
  const [isFlightDetailVisible, setIsFlightDetailVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handlePaymentMethodSelect = async (method) => {
    try {
      if (method === "stripe") {
        const response = await axios.post(
          "/api/payments/create-stripe-payment",
          {
            bookingId: booking.id,
          },
        );

        if (response.data.url) {
          window.location.href = response.data.url;
        }
      } else if (method === "momo") {
        const response = await axios.post("/api/payments/create-momo-payment", {
          bookingId: booking.id,
          totalAmount: booking.totalAmount,
        });

        if (response.data.payUrl) {
          window.location.href = response.data.payUrl;
        }
      }
    } catch (error) {
      console.error("Lỗi khi tạo thanh toán:", error);
      alert("Có lỗi xảy ra khi tạo thanh toán. Vui lòng thử lại sau.");
    } finally {
      setShowPaymentModal(false);
    }
  };

  const handleToggleFlightDetail = () => {
    setIsFlightDetailVisible(!isFlightDetailVisible);
  };

  const PaymentMethodSelector = ({ onMethodSelect, onClose }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-96 rounded-lg bg-white p-6 shadow-xl">
          <h3 className="mb-4 text-xl font-semibold">
            Chọn phương thức thanh toán
          </h3>
          <div className="space-y-4">
            <button
              onClick={() => onMethodSelect("stripe")}
              className="flex w-full items-center justify-between rounded-lg border p-4 hover:bg-gray-50"
            >
              <span className="font-medium">Thẻ tín dụng</span>
              <img src="/icons/stripe.svg" alt="Stripe" className="h-8" />
            </button>
            <button
              onClick={() => onMethodSelect("momo")}
              className="flex w-full items-center justify-between rounded-lg border p-4 hover:bg-gray-50"
            >
              <span className="font-medium">Ví MoMo</span>
              <img
                src="/icons/momo_square_pinkbg.svg"
                alt="MoMo"
                className="h-8"
              />
            </button>
          </div>
          <button
            onClick={onClose}
            className="mt-4 w-full rounded-lg bg-gray-200 py-2 font-medium hover:bg-gray-300"
          >
            Đóng
          </button>
        </div>
      </div>
    );
  };

  const payment = booking?.payment;
  let paymentStatus;

  if (!payment) {
    paymentStatus = "Chưa thanh toán";
  } else {
    paymentStatus =
      payment.status === "pending"
        ? "Chưa thanh toán"
        : payment.status === "failed"
          ? "Thanh toán thất bại"
          : "Đã thanh toán";
  }

  const handleSubmitReview = async (reviewData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Đảm bảo gửi đúng bookingId từ props
      formData.append(
        "bookingId",
        booking.bookingId?.toString() || booking.id?.toString(),
      );
      formData.append("rating", reviewData.rating.toString());
      formData.append("comment", reviewData.comment || "");

      if (reviewData.emojis && reviewData.emojis.length > 0) {
        formData.append("emojis", JSON.stringify(reviewData.emojis));
      }

      // Append images
      if (reviewData.images && reviewData.images.length > 0) {
        reviewData.images.forEach((file, index) => {
          formData.append(`images`, file);
        });
      }

      // Log để kiểm tra data trước khi gửi
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const response = await axios.post("/api/reviews/createReview", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.review) {
        alert("Cảm ơn bạn đã đánh giá!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
      alert("Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    setIsCancelModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsCancelModalVisible(false);
  };

  const handleConfirmCancel = async () => {
    try {
      await axios.post(`/api/bookings/cancel/${booking.id}`);
      window.location.reload();
    } catch (error) {
      console.error("Lỗi khi hủy vé:", error);
      alert("Có lỗi xảy ra khi hủy vé. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="mx-auto my-4 max-w-4xl rounded-lg bg-gray-50 p-8 shadow-lg">
      <div className="flex items-center justify-between rounded-lg bg-blue-100 p-4">
        <div className="flex items-center font-medium text-blue-700">
          <FaCalendarAlt className="mr-2" />
          Mã đặt chỗ: {booking.pnrId}
        </div>
        <div className="flex items-center font-medium text-blue-700">
          <FaMoneyBillWave className="mr-2" />
          Trạng thái: {booking.status}
        </div>
        <div className="flex items-center font-medium text-blue-700">
          <FaCalendarAlt className="mr-2" />
          Ngày đặt: {new Date(booking.createdAt).toLocaleDateString("vi-VN")}
        </div>
      </div>
      <Separator className="my-4" />

      <h3 className="mb-4 text-2xl font-bold text-gray-800">
        Thông tin chuyến bay
      </h3>

      {booking.tickets.map((ticket, index) => (
        <div key={index} className="mb-6 rounded-lg bg-white p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div className="text-gray-700">
              <span className="rounded-full bg-yellow-500 px-4 py-1 font-semibold text-white">
                {ticket.tripType === "Outbound" ? "Chiều đi" : "Chiều về"}
              </span>
              <p className="text-md mt-3">
                <FaPlaneDeparture className="mr-2 inline" />
                Sân bay {
                  ticket.departureAirport
                } - <FaPlaneArrival className="mr-2 inline" />
                Sân bay {ticket.arrivalAirport}
              </p>
            </div>
            <button
              className="flex items-center text-sm text-blue-600 hover:underline"
              onClick={handleToggleFlightDetail}
            >
              Chi tiết{" "}
              <FaAngleDown
                className={`ml-1 transition-transform ${isFlightDetailVisible ? "rotate-180" : ""}`}
              />
            </button>
          </div>
          <div className="relative mt-4 flex items-center justify-around">
            <div className="flex flex-col items-center">
              <p className="text-xl font-bold text-gray-800">
                {new Date(ticket.departureTime).toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                <FaPlaneDeparture className="mr-2 inline" />
                {ticket.departureAirport}
              </p>
            </div>
            <div className="mx-6 flex flex-col items-center">
              <span className="text-sm text-gray-500">
                {Math.floor(ticket.total_duration / 60)}g{" "}
                {ticket.total_duration % 60}p
              </span>
              <div className="my-1 w-20 border-t border-gray-400" />
              <p className="text-xs text-gray-500">Bay thẳng</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xl font-bold text-gray-800">
                {new Date(ticket.arrivalTime).toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                <FaPlaneArrival className="mr-2 inline" />
                {ticket.arrivalAirport}
              </p>
            </div>
          </div>
          {isFlightDetailVisible && (
            <div className="mt-4 rounded-lg bg-gray-50 p-6 shadow-inner">
              <div className="mb-4 flex items-center">
                <div className="text-md text-gray-700">
                  <p className="mb-2">
                    Ngày:{" "}
                    {new Date(ticket.departureTime).toLocaleDateString("vi-VN")}
                  </p>
                  <p className="mb-2">Hạng ghế: {ticket.travelClass}</p>
                  <p>
                    <FaPlaneDeparture className="mr-2 inline" />
                    Khởi hành:{" "}
                    {new Date(ticket.departureTime).toLocaleTimeString(
                      "vi-VN",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  </p>
                  <p className="mt-2">
                    <FaPlaneArrival className="mr-2 inline" />
                    Đến:{" "}
                    {new Date(ticket.arrivalTime).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="mt-6 flex flex-col items-start justify-between lg:flex-row lg:items-center">
        <div className="grow space-y-2 lg:w-2/3">
          <Card className="rounded-lg bg-gray-50 p-4 shadow">
            <CardTitle>
              <h3 className="mb-2 text-xl font-bold text-gray-800">
                Thông tin vé
              </h3>
            </CardTitle>
            <CardContent className="space-y-2">
              <p className="flex items-center text-gray-700">
                Tên người liên hệ: Mạc Cung Thịnh
              </p>
              <p className="flex items-center text-gray-700">Email: Hello</p>
              <p className="flex items-center text-gray-700">
                Số hành khách: {booking.customers.length + 1}{" "}
                <Tooltip
                  content={
                    <div className="p-4">
                      <h4 className="mb-4 text-lg font-semibold text-blue-500">
                        Thông tin hành khách
                      </h4>
                      {[
                        ...booking.customers,
                        {
                          firstName: "Phạm Văn",
                          lastName: "Dũng",
                          dateOfBirth: "10-10-1980",
                          gender: "Nam",
                        },
                      ].map((customer, i) => (
                        <div
                          key={i}
                          className="mb-4 border-b border-gray-200 pb-2 last:border-none"
                        >
                          <div className="mb-2 flex items-center">
                            <FaUser className="mr-2 text-blue-500" />
                            <p className="font-medium text-gray-800">
                              Hành khách {i + 1}
                            </p>
                          </div>
                          <p className="ml-6 text-sm text-gray-700">
                            Họ và tên:{" "}
                            <span className="font-semibold">
                              {customer.firstName}
                            </span>
                          </p>
                          <p className="ml-6 text-sm text-gray-700">
                            Ngày sinh:{" "}
                            <span className="font-semibold">
                              {customer.dateOfBirth}
                            </span>
                          </p>
                          <p className="ml-6 text-sm text-gray-700">
                            Giới tính:{" "}
                            <span className="font-semibold">
                              {customer.gender}
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                  }
                  placement="top"
                  className="cursor-pointer"
                  size="lg"
                >
                  <span>
                    <FaInfoCircle className="ml-2 cursor-pointer" />
                  </span>
                </Tooltip>
              </p>
              <p className="flex items-center text-gray-700">
                Loại vé: {booking.isRoundTrip ? "Khứ hồi" : "Một chiều"}
              </p>
              <p className="flex items-center text-gray-700">
                Phương thức thanh toán:{" "}
                {payment
                  ? payment.paymentMethod === "stripe"
                    ? "Thẻ tín dụng"
                    : payment.paymentMethod === "momo"
                      ? "Ví MoMo"
                      : payment.paymentMethod
                  : "Chưa có"}
              </p>
              <p className="flex items-center text-gray-700">
                Tình trạng thanh toán: {paymentStatus}
                {paymentStatus === "Chưa thanh toán" && (
                  <Tooltip
                    content={
                      <div className="p-4">
                        <span className="text-rose-800">Lưu ý: </span>
                        <span>
                          Hãy thanh toán ngay để đảm bảo giữ chỗ của bạn. Vui
                          lòng liên hệ nếu có thắc mắc.
                        </span>
                      </div>
                    }
                    placement="top"
                    className="ml-2"
                    size="lg"
                  >
                    <span>
                      <FaInfoCircle className="ml-2 cursor-pointer" />
                    </span>
                  </Tooltip>
                )}
              </p>
              <p className="flex items-center font-semibold text-rose-700">
                Tổng tiền: 3,779,000 VND
              </p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              {paymentStatus === "Chưa thanh toán" &&
                booking.status !== "Cancelled" && (
                  <Button
                    variant="solid"
                    className="bg-green-500 p-4 text-white hover:bg-green-600"
                    onClick={() => setShowPaymentModal(true)}
                    size="lg"
                  >
                    Thanh toán
                  </Button>
                )}
              {booking.status !== "Cancelled" ? (
                <Button
                  variant="outline"
                  className="bg-red-500 p-4 text-white hover:bg-red-600"
                  onClick={handleCancelClick}
                  size="lg"
                >
                  Hủy vé
                </Button>
              ) : (
                <Badge className="py-1" variant="destructive">
                  Đã hủy
                </Badge>
              )}
            </CardFooter>
            {showPaymentModal && (
              <PaymentMethodSelector
                onMethodSelect={handlePaymentMethodSelect}
                onClose={() => setShowPaymentModal(false)}
              />
            )}
          </Card>
        </div>
      </div>

      {/* Enhanced Review Section */}
      {/* Enhanced Review Section */}
      {booking.tickets &&
        booking.tickets.some(
          (ticket) => new Date(ticket.arrivalTime) < new Date(),
        ) && (
          <EnhancedReviewSection
            onSubmit={handleSubmitReview}
            isSubmitting={isSubmitting}
          />
        )}

      <CancelBookingModal
        isVisible={isCancelModalVisible}
        onClose={handleCloseModal}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
};

export default BookingDetails;
