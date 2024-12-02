import { useState } from "react";
import { Star } from "lucide-react";
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

const BookingDetails = ({ booking }) => {
  const [isFlightDetailVisible, setIsFlightDetailVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleToggleFlightDetail = () => {
    setIsFlightDetailVisible(!isFlightDetailVisible);
  };

  const payment = booking.payment;

  console.log(booking);
  console.log(payment);

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

  const handleSubmitReview = async () => {
    setIsSubmitting(true);
    try {
      await axios.post("/api/reviews/createReview", {
        bookingId: bookingInfo.bookingId,
        rating,
        comment,
        email: bookingInfo.email, // Sử dụng email từ thông tin đặt chỗ
      });
      alert("Cảm ơn bạn đã đánh giá!");
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
      alert("Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại sau.");
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
      const response = await axios.post(`/api/bookings/cancel/${booking.id}`);

      window.location.reload();
    } catch (error) {
      console.error("Lỗi khi hủy vé:", error);
      alert("Có lỗi xảy ra khi hủy vé. Vui lòng thử lại sau.");
    }
  };

  const handlePayment = async () => {
    try {
      if (payment.paymentMethod === "stripe") {
        const response = await axios.post(
          "/api/payments/create-stripe-payment",
          {
            bookingId: booking.id,
          },
        );

        if (response.data.url) {
          window.location.href = response.data.url;
        }
      } else if (payment.paymentMethod === "momo") {
        const response = await axios.post("/api/payments/create-momo-payment", {
          bookingId: booking.id,
        });

        if (response.data) {
          window.location.href = response.data.payUrl;
        }
      } else {
        alert("Đã xảy ra lỗi");
      }
    } catch (error) {
      console.error("Lỗi khi tạo thanh toán:", error);
      alert("Có lỗi xảy ra khi tạo thanh toán. Vui lòng thử lại sau.");
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
                className={`ml-1 transition-transform ${
                  isFlightDetailVisible ? "rotate-180" : ""
                }`}
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
                      { hour: "2-digit", minute: "2-digit" },
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
                Phương thức thanh toán: {payment.paymentMethod}
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
                    onClick={handlePayment}
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
          </Card>
        </div>
      </div>
      {booking.status === "Completed" && (
        <div className="mt-10 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold">Đánh giá dịch vụ</h2>
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
