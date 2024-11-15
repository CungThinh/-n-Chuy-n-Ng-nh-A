/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { Calendar as CalendarIcon, Check } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";
import { useSession } from "next-auth/react";

import FlightDetails from "./components/FlightDetails";
import TicketInfo from "./components/TicketInfo";

import { countries } from "@/lib/countries";
import {
  Select,
  SelectItem,
  SelectContent,
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

const PaymentMethodSelector = ({ selectedMethod, onMethodSelect }) => {
  const paymentMethods = [
    {
      id: "stripe",
      name: "Stripe",
      description: "Thanh toán an toàn qua thẻ tín dụng/ghi nợ",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-8"
          viewBox="0 0 24 24"
        >
          <path
            fill="#6772E5"
            d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.831 3.47 1.426 3.47 2.338 0 .89-.712 1.394-2.044 1.394-1.823 0-4.024-.593-5.935-1.516l-.89 5.494c2.043.95 4.515 1.631 7.589 1.631 2.585 0 4.722-.654 6.236-1.902 1.544-1.275 2.347-3.12 2.347-5.346 0-4.128-2.525-5.85-6.534-7.309z"
          />
        </svg>
      ),
    },
    {
      id: "momo",
      name: "MoMo",
      description: "Thanh toán nhanh chóng qua ví điện tử MoMo",
      icon: (
        <svg className="size-8" viewBox="0 0 96 87">
          <path
            fill="#A50064"
            d="M75.478 44.672L60.713 35.74v17.864l14.765-8.932zm-49.248 0l14.766-8.932v17.864L26.23 44.672zM47.83 28.927L33.065 37.86l14.765 8.932 14.766-8.932-14.766-8.933zM47.83 0L0 28.927l47.83 28.927 47.831-28.927L47.83 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-lg font-bold">Chọn phương thức thanh toán</h3>
      <div className="grid gap-4">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => onMethodSelect(method.id)}
            className={`relative flex w-full items-center rounded-lg border-2 p-4 transition-all hover:border-blue-500 ${
              selectedMethod === method.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="mr-4">{method.icon}</div>
            <div className="flex-1 text-left">
              <p className="font-semibold">{method.name}</p>
              <p className="text-sm text-gray-500">{method.description}</p>
            </div>
            <div
              className={`ml-4 flex size-6 items-center justify-center rounded-full border-2 ${
                selectedMethod === method.id
                  ? "border-blue-500 bg-blue-500 text-white"
                  : "border-gray-300"
              }`}
            >
              {selectedMethod === method.id && <Check className="size-4" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

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
  const [errorMessage, setErrorMessage] = useState("");
  const [flightDetails, setFlightDetails] = useState({
    outbound: null,
    return: null,
  });
  const [flightType, setFlightType] = useState("1");
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleInputChange = (field, value) => {
    setPassengerInfo({
      ...passengerInfo,
      [field]: value,
    });
  };

  const validateForm = () => {
    return (
      passengerInfo.lastName &&
      passengerInfo.firstName &&
      passengerInfo.gender &&
      passengerInfo.dob &&
      passengerInfo.nationality
    );
  };

  const handleBookingSubmit = async () => {
    if (!session) {
      const currentUrl = window.location.pathname;

      localStorage.setItem("passengerInfo", JSON.stringify(passengerInfo));
      router.push(`/login?callbackUrl=${encodeURIComponent(currentUrl)}`);

      return;
    }

    if (!validateForm()) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin bắt buộc.");

      return;
    }

    if (!paymentMethod) {
      setErrorMessage("Vui lòng chọn phương thức thanh toán.");

      return;
    }

    try {
      const isRoundTrip = flightType === "1";

      const tickets = flightDetails.outbound.flights.map((flight) => ({
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
          tripType: "Return",
          seatNumber: "24B",
        }));

        tickets.push(...returnTickets);
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
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const bookingId = response.data.booking.id;
      const pnrId = response.data.booking.pnrId;

      if (!bookingId || !pnrId) {
        setErrorMessage("Không thể lấy ID đặt chỗ.");

        return;
      }

      localStorage.setItem(
        "bookingInfo",
        JSON.stringify({
          firstName: passengerInfo.firstName,
          lastName: passengerInfo.lastName,
          email: session?.user?.email,
          nationality: passengerInfo.nationality,
          dob: passengerInfo.dob,
          bookingId,
          pnrId,
          totalPrice,
        }),
      );

      if (paymentMethod === "stripe") {
        const stripeResponse = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            totalPrice,
            flightType: flightType === "1" ? "Khứ hồi" : "Một chiều",
            airlineName: flightDetails.outbound.flights[0].airline,
            airlineLogos: flightDetails.outbound.flights.map(
              (flight) => flight.airline_logo,
            ),
            passengerInfo: {
              ...passengerInfo,
              email: session?.user?.email || "test@example.com",
            },
            bookingId,
          }),
        });

        const result = await stripeResponse.json();

        if (stripeResponse.ok) {
          window.location.href = result.url;
        } else {
          setErrorMessage(
            result.error || "Có lỗi xảy ra trong quá trình xử lý thanh toán",
          );
        }
      } else if (paymentMethod === "momo") {
        if (totalPrice > 50000000) {
          setErrorMessage(
            "MoMo không hỗ trợ thanh toán cho số tiền lớn hơn 50 triệu VND. Vui lòng chọn phương thức thanh toán khác.",
          );

          return;
        }

        const momoResponse = await fetch("/api/createMomoPayment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            totalAmount: totalPrice,
            orderInfo: `Đặt vé máy bay cho ${passengerInfo.firstName} ${passengerInfo.lastName}`,
            bookingId,
          }),
        });

        const momoData = await momoResponse.json();

        if (momoResponse.ok && momoData.payUrl) {
          window.location.href = momoData.payUrl;
        } else {
          setErrorMessage(momoData.message || "Không thể tạo thanh toán MoMo");
        }
      }
    } catch (error) {
      setErrorMessage("Đã xảy ra lỗi khi tạo booking.");
      console.error(error);
    }
  };

  useEffect(() => {
    const outboundFlight = localStorage.getItem("selectedOutboundFlight");
    const returnFlight = localStorage.getItem("selectedReturnFlight");
    const storedFlightType = localStorage.getItem("flightType");
    const storedTotalPrice = localStorage.getItem("totalPrice");
    const savedPassengerInfo = localStorage.getItem("passengerInfo");

    if (outboundFlight) {
      setFlightDetails({
        outbound: JSON.parse(outboundFlight),
        return: returnFlight ? JSON.parse(returnFlight) : null,
      });
    }

    if (storedTotalPrice) {
      setTotalPrice(JSON.parse(storedTotalPrice));
    }

    if (savedPassengerInfo) {
      const parsedPassengerInfo = JSON.parse(savedPassengerInfo);

      if (parsedPassengerInfo) setPassengerInfo(parsedPassengerInfo);
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
                    value={passengerInfo.gender}
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
                    value={passengerInfo.nationality}
                    onValueChange={(value) =>
                      handleInputChange("nationality", value)
                    }
                  >
                    <SelectTrigger className="size-full rounded-lg border border-gray-300 p-4 text-base focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500">
                      <SelectValue placeholder="Quốc tịch" />
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

              {/* New Payment Method Selector */}
              <PaymentMethodSelector
                selectedMethod={paymentMethod}
                onMethodSelect={setPaymentMethod}
              />

              <div className="mt-8 flex justify-end">
                <button
                  className="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
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
