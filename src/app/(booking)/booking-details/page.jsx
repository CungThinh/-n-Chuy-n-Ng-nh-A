/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";
import { useSession } from "next-auth/react";

import FlightDetails from "./components/FlightDetails";
import TicketInfo from "./components/TicketInfo";

import { countries } from "@/lib/countries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function BookingDetailsPage() {
  const { data: session } = useSession();

  console.log(session);
  const router = useRouter();
  const [passengerInfo, setPassengerInfo] = useState({
    lastName: "",
    firstName: "",
    gender: "",
    dob: null,
    nationality: "Việt Nam",
    // contactName: "",
    // contactPhone: "",
    // contactEmail: "",
    // companyName: "",
    // taxCode: "",
    // contactTitle: "",
    // contactLastName: "",
    // contactFirstName: "",
    // contactPhoneNumber: "",
    // contactEmailAddress: "",
    // countryCode: "+84",
  });

  const [isInvoiceInfoVisible, setIsInvoiceInfoVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Thêm biến để lưu trữ thông báo lỗi

  const handleInputChange = (field, value) => {
    setPassengerInfo({
      ...passengerInfo,
      [field]: value,
    });
  };

  const handleToggleInvoiceInfo = () => {
    setIsInvoiceInfoVisible(!isInvoiceInfoVisible);
  };

  const validateForm = () => {
    // Kiểm tra các trường bắt buộc
    if (
      !passengerInfo.lastName ||
      !passengerInfo.firstName ||
      !passengerInfo.gender ||
      !passengerInfo.dob ||
      !passengerInfo.nationality
    ) {
      return false;
    }

    return true;
  };

  const handleBookingSubmit = async () => {
    if (!validateForm()) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin bắt buộc.");

      return;
    }
    try {
      // Xác định loại vé và hãng bay
      const isRoundTrip = flightType === "1";

      let tickets = flightDetails.outbound.flights.map((flight) => ({
        flightNumber: flight.flight_number,
        airline: flight.airline,
        departureAirport: flight.departure_airport.id,
        arrivalAirport: flight.arrival_airport.id,
        departureTime: new Date(flight.departure_airport.time),
        arrivalTime: new Date(flight.arrival_airport.time),
        travelClass: flight.travel_class,
        total_duration: flight.duration,
        tripType: "Outbound", // Đánh dấu chuyến đi là Outbound
        seatNumber: "24B", // Bạn có thể thay đổi ghế ngồi theo yêu cầu
      }));

      if (isRoundTrip && flightDetails.return) {
        const returnTickets = flightDetails.return.flights.map((flight) => ({
          flightNumber: flight.flight_number,
          airline: flight.airline,
          departureAirport: flight.departure_airport.id,
          arrivalAirport: flight.arrival_airport.id,
          departureTime: new Date(flight.departure_airport.time),
          arrivalTime: new Date(flight.arrival_airport.time),
          travelClass: flight.travel_class,
          total_duration: flight.duration,
          tripType: "Return", // Đánh dấu chuyến về là Return
          seatNumber: "24B", // Bạn có thể thay đổi ghế ngồi theo yêu cầu
        }));

        tickets = tickets.concat(returnTickets);
      }

      const bookingData = {
        isRoundTrip,
        totalAmount: totalPrice,
        tickets,
        customers: [
          {
            firstName: passengerInfo.firstName,
            lastName: passengerInfo.lastName,
            dateOfBirth: passengerInfo.dob,
            nationality: passengerInfo.nationality,
            gender: passengerInfo.gender,
          },
        ],
      };

      const response = await axios.post("/api/bookings", bookingData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Quan trọng: đảm bảo cookie session được gửi
      });

      console.log(response.status);

      // const response = await fetch("/api/create-payment-intent", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     totalPrice,
      //     flightType: flightTypeLabel,
      //     airlineName,
      //     airlineLogo,
      //     passengerInfo: {
      //       // Gửi thêm thông tin hành khách
      //       firstName: passengerInfo.firstName,
      //       lastName: passengerInfo.lastName,
      //       email: passengerInfo.contactEmailAddress,
      //       phone: passengerInfo.contactPhoneNumber,
      //       gender: passengerInfo.gender,
      //       dob: passengerInfo.dob,
      //       nationality: passengerInfo.nationality,
      //     },
      //   }),
      // });

      // const result = await response.json();

      // if (response.ok) {
      //   window.location.href = result.url;
      // } else {
      //   setErrorMessage(
      //     result.error || "Có lỗi xảy ra trong quá trình xử lý thanh toán",
      //   );
      // }
    } catch (error) {
      setErrorMessage("Đã xảy ra lỗi khi kết nối đến hệ thống thanh toán");
      console.error(error);
    }
  };

  const [flightDetails, setFlightDetails] = useState({
    outbound: null,
    return: null,
  });
  const [flightType, setFlightType] = useState("1"); // Mặc định là khứ hồi (1: khứ hồi, 2: một chiều)
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Lấy thông tin chuyến bay từ localStorage
    const outboundFlight = localStorage.getItem("selectedOutboundFlight");
    const returnFlight = localStorage.getItem("selectedReturnFlight");
    const storedFlightType = localStorage.getItem("flightType"); // Lấy loại vé từ localStorage
    const storedTotalPrice = localStorage.getItem("totalPrice");

    if (outboundFlight) {
      setFlightDetails({
        outbound: JSON.parse(outboundFlight),
        return: returnFlight ? JSON.parse(returnFlight) : null,
      });
    }

    if (storedTotalPrice) {
      setTotalPrice(JSON.parse(storedTotalPrice));
    }

    setFlightType(storedFlightType || "1"); // Cập nhật loại vé (1: khứ hồi, 2: một chiều)
  }, []);

  return (
    <div>
      {/* Phần trên cùng của trang */}
      <div
        className="relative flex w-full items-center justify-between px-8 py-4 text-white"
        style={{ height: "150px", backgroundColor: "#00264e" }}
      ></div>

      <div
        className="-mt-20 flex items-start justify-center"
        style={{ backgroundColor: "#f0f0f0" }}
      >
        <div className="relative grid w-full max-w-7xl grid-cols-1 gap-4 p-4 lg:grid-cols-3">
          {/* Phần nội dung chính, thông tin hành khách, thông tin liên hệ */}
          <div className="lg:col-span-2">
            <FlightDetails
              flightType={flightType}
              flightDetails={flightDetails}
            />
            {/* Thông báo lỗi */}
            {errorMessage && (
              <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
                {errorMessage}
              </div>
            )}
            {/* thông tin hành khách */}
            <div className="mb-4 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-6 border-b pb-4 text-xl font-bold text-gray-800">
                Hành khách 1
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <input
                  className="w-full rounded-lg border border-gray-300 p-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Họ *"
                  style={{ color: "#000000" }}
                  type="text"
                  value={passengerInfo.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                />
                <input
                  className="w-full rounded-lg border border-gray-300 p-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Tên đệm và tên *"
                  style={{ color: "#000000" }}
                  type="text"
                  value={passengerInfo.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                />
                <div className="relative">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="size-full justify-start rounded-lg border border-gray-300 p-4 pl-10 text-left text-base font-normal focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        {passengerInfo.dob
                          ? format(passengerInfo.dob, "dd/MM/yyyy")
                          : "Ngày sinh"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        selected={passengerInfo.dob}
                        onSelect={(date) => {
                          handleInputChange("dob", date); // Cập nhật ngày sinh
                        }}
                        mode="single"
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="relative">
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("gender", value)
                    }
                  >
                    <SelectTrigger className="size-full rounded-lg border border-gray-300 p-4 text-base focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500">
                      <SelectValue placeholder="Giới tính" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Nam</SelectItem>
                      <SelectItem value="female">Nữ</SelectItem>
                      <SelectItem value="Gay">Gay lọ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative">
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("nationality", value)
                    }
                  >
                    <SelectTrigger className="size-full rounded-lg border border-gray-300 p-4 text-base focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500">
                      <SelectValue placeholder="Quốc tịch " />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem value={country} key={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Thông tin xuất hóa đơn */}
              <div className="mt-8 flex items-center justify-between">
                <h2 className="text-xl font-bold" style={{ color: "#000000" }}>
                  Thông tin xuất hóa đơn
                </h2>
                <button
                  className={`relative h-8 w-16 rounded-full transition-colors duration-300 focus:outline-none ${isInvoiceInfoVisible ? "bg-orange-500" : "bg-gray-300"}`}
                  onClick={handleToggleInvoiceInfo}
                >
                  <div
                    className={`absolute left-1 top-1/2 size-6 -translate-y-1/2 rounded-full bg-white shadow-md transition-all duration-500${isInvoiceInfoVisible ? "translate-x-8 bg-orange-500" : ""}`}
                  />
                </button>
              </div>
              {isInvoiceInfoVisible && (
                <div>
                  <div className="mt-4 grid grid-cols-1 gap-2">
                    <input
                      className="w-full rounded-lg border p-3"
                      placeholder="Tên công ty"
                      style={{ color: "#000000" }}
                      type="text"
                      value={passengerInfo.companyName}
                      onChange={(e) =>
                        handleInputChange("companyName", e.target.value)
                      }
                    />
                    <input
                      className="w-full rounded-lg border p-3"
                      placeholder="Mã số thuế"
                      style={{ color: "#000000" }}
                      type="text"
                      value={passengerInfo.taxCode}
                      onChange={(e) =>
                        handleInputChange("taxCode", e.target.value)
                      }
                    />
                    <input
                      className="w-full rounded-lg border p-3"
                      placeholder="Địa chỉ"
                      style={{ color: "#000000" }}
                      type="text"
                      value={passengerInfo.companyAddress}
                      onChange={(e) =>
                        handleInputChange("companyAddress", e.target.value)
                      }
                    />
                  </div>
                  <h2
                    className="mb-4 mt-8 text-xl font-bold"
                    style={{ color: "#000000" }}
                  >
                    Thông tin người nhận
                  </h2>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <input
                      className="w-full rounded-lg border border-gray-300 p-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Họ và tên *"
                      style={{ color: "#000000" }}
                      type="text"
                      value={passengerInfo.recipientName}
                      onChange={(e) =>
                        handleInputChange("recipientName", e.target.value)
                      }
                    />
                    <input
                      className="w-full rounded-lg border border-gray-300 p-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Số điện thoại *"
                      style={{ color: "#000000" }}
                      type="text"
                      value={passengerInfo.recipientPhone}
                      onChange={(e) =>
                        handleInputChange("recipientPhone", e.target.value)
                      }
                    />
                    <input
                      className="w-full rounded-lg border border-gray-300 p-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Email *"
                      style={{ color: "#000000" }}
                      type="email"
                      value={passengerInfo.recipientEmail}
                      onChange={(e) =>
                        handleInputChange("recipientEmail", e.target.value)
                      }
                    />
                    <input
                      className="w-full rounded-lg border border-gray-300 p-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500 md:col-span-3"
                      placeholder="Địa chỉ *"
                      style={{ color: "#000000" }}
                      type="text"
                      value={passengerInfo.recipientAddress}
                      onChange={(e) =>
                        handleInputChange("recipientAddress", e.target.value)
                      }
                    />
                    <textarea
                      className="w-full rounded-lg border border-gray-300 p-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500 md:col-span-3"
                      placeholder="Ghi chú"
                      style={{ color: "#000000" }}
                      value={passengerInfo.recipientNote}
                      onChange={(e) =>
                        handleInputChange("recipientNote", e.target.value)
                      }
                    />
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <button
                  className="rounded-lg bg-orange-500 px-6 py-3 text-white"
                  onClick={handleBookingSubmit} // Thực hiện điều hướng khi nhấn "Tiếp tục"
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          </div>

          {/* Thông tin hành lý */}
          <div className="lg:col-span-1">
            <TicketInfo
              flightType={flightType}
              flightDetails={flightDetails}
              totalPrice={totalPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
