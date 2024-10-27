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
  const router = useRouter();

  const [passengerInfo, setPassengerInfo] = useState({
    lastName: "",
    firstName: "",
    gender: "",
    dob: null,
    nationality: "Việt Nam",
  });

  const [isInvoiceInfoVisible, setIsInvoiceInfoVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    console.log("Thông tin trước khi submit:", passengerInfo);

    if (!validateForm()) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin bắt buộc.");

      return;
    }

    try {
      const isRoundTrip = flightType === "1";

      // Thu thập logo của các hãng hàng không
      let airlineLogos = new Set();
      let tickets = flightDetails.outbound.flights.map((flight) => {
        airlineLogos.add(flight.airline_logo);

        return {
          flightNumber: flight.flight_number,
          airline: flight.airline,
          departureAirport: flight.departure_airport.id,
          arrivalAirport: flight.arrival_airport.id,
          departureTime: new Date(flight.departure_airport.time),
          arrivalTime: new Date(flight.arrival_airport.time),
          travelClass: flight.travel_class,
          total_duration: flight.duration,
          tripType: "Outbound",
          seatNumber: "24B",
        };
      });

      if (isRoundTrip && flightDetails.return) {
        const returnTickets = flightDetails.return.flights.map((flight) => {
          airlineLogos.add(flight.airline_logo);

          return {
            flightNumber: flight.flight_number,
            airline: flight.airline,
            departureAirport: flight.departure_airport.id,
            arrivalAirport: flight.arrival_airport.id,
            departureTime: new Date(flight.departure_airport.time),
            arrivalTime: new Date(flight.arrival_airport.time),
            travelClass: flight.travel_class,
            total_duration: flight.duration,
            tripType: "Return",
            seatNumber: "24B",
          };
        });

        tickets = tickets.concat(returnTickets);
      }

      airlineLogos = Array.from(airlineLogos);

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
        withCredentials: true,
      });

      console.log("Phản hồi từ API bookings:", response.data);

      // Đảm bảo lấy đúng bookingId từ phản hồi
      const bookingId = response.data.booking.id;

      console.log("Lấy được bookingId:", bookingId);

      if (!bookingId) {
        setErrorMessage("Không thể lấy ID đặt chỗ.");

        return;
      }

      // Gửi yêu cầu tạo phiên thanh toán với Stripe
      const paymentResponse = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalPrice,
          flightType: flightType === "1" ? "Khứ hồi" : "Một chiều",
          airlineName: flightDetails.outbound.flights[0].airline,
          airlineLogos, // Mảng logo hãng bay
          passengerInfo: {
            firstName: passengerInfo.firstName,
            lastName: passengerInfo.lastName,
            email: session?.user?.email || "test@example.com",
            phone: "+849xxxxxxxx", // Số điện thoại
            gender: passengerInfo.gender,
            dob: passengerInfo.dob,
            nationality: passengerInfo.nationality,
          },
          bookingId, // Đảm bảo truyền đúng bookingId
        }),
      });

      const result = await paymentResponse.json();

      if (paymentResponse.ok) {
        window.location.href = result.url; // Chuyển hướng đến trang thanh toán Stripe
      } else {
        setErrorMessage(
          result.error || "Có lỗi xảy ra trong quá trình xử lý thanh toán",
        );
      }
    } catch (error) {
      setErrorMessage("Đã xảy ra lỗi khi kết nối đến hệ thống thanh toán");
      console.error(error);
    }
  };

  const [flightDetails, setFlightDetails] = useState({
    outbound: null,
    return: null,
  });
  const [flightType, setFlightType] = useState("1"); // Mặc định là khứ hồi
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const outboundFlight = localStorage.getItem("selectedOutboundFlight");
    const returnFlight = localStorage.getItem("selectedReturnFlight");
    const storedFlightType = localStorage.getItem("flightType");
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

    setFlightType(storedFlightType || "1");
  }, []);

  return (
    <div>
      <div
        className="relative flex w-full items-center justify-between px-8 py-4 text-white"
        style={{ height: "150px", backgroundColor: "#00264e" }}
      ></div>

      <div
        className="-mt-20 flex items-start justify-center"
        style={{ backgroundColor: "#f0f0f0" }}
      >
        <div className="relative grid w-full max-w-7xl grid-cols-1 gap-4 p-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <FlightDetails
              flightType={flightType}
              flightDetails={flightDetails}
            />
            {errorMessage && (
              <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
                {errorMessage}
              </div>
            )}

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
                        onSelect={(date) => handleInputChange("dob", date)}
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

              <div className="mt-8 flex justify-end">
                <button
                  className="rounded-lg bg-orange-500 px-6 py-3 text-white"
                  onClick={handleBookingSubmit}
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          </div>

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
