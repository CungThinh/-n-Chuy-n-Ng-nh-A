"use client";

import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";

import FlightDetails from "./components/FlightDetails";
import TicketInfo from "./components/TicketInfo";
import PaymentMethodSelector from "./components/PaymentMethodSelector";
import QRCodePayment from "./components/QRCodePayment";

import { countries } from "@/lib/countries";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createStripePayment,
  createMomoPayment,
  createStripeQRPayment,
} from "@/services/payments";

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
  const [showQRPayment, setShowQRPayment] = useState(false);
  const [qrPaymentData, setQRPaymentData] = useState(null);
  const [bookingId, setBookingId] = useState(null);

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
      const destination = localStorage.getItem("destination");

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
        destination,
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
        user: {
          email: session?.user?.email, // This should be pewpew1232002@gmail.com
        },
      };

      const response = await axios.post("/api/bookings", bookingData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const newBookingId = response.data.booking.id;
      const pnrId = response.data.booking.pnrId;

      if (!newBookingId || !pnrId) {
        setErrorMessage("Không thể lấy ID đặt chỗ.");

        return;
      }

      setBookingId(newBookingId);

      localStorage.setItem(
        "bookingInfo",
        JSON.stringify({
          firstName: passengerInfo.firstName,
          lastName: passengerInfo.lastName,
          email: session?.user?.email,
          nationality: passengerInfo.nationality,
          dob: passengerInfo.dob,
          bookingId: newBookingId,
          pnrId,
          totalPrice,
        }),
      );

      if (paymentMethod === "stripe_qr") {
        console.log("Creating QR payment for booking:", newBookingId); // Debug log

        const qrResult = await createStripeQRPayment({
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
          bookingId: newBookingId, // Sử dụng newBookingId thay vì bookingId
        });

        if (qrResult) {
          setQRPaymentData(qrResult);
          setShowQRPayment(true);
        }
      } else if (paymentMethod === "stripe") {
        const stripeResult = await createStripePayment({
          bookingId: newBookingId,
        });

        window.location.href = stripeResult.url;
      } else if (paymentMethod === "momo") {
        const momoResult = await createMomoPayment({
          totalAmount: totalPrice,
          orderInfo: `Đặt vé máy bay cho ${passengerInfo.firstName} ${passengerInfo.lastName}`,
          bookingId: newBookingId,
        });

        window.location.href = momoResult.payUrl; // Redirects to MoMo payment page
      }
    } catch (error) {
      setErrorMessage(error.message || "Đã xảy ra lỗi khi tạo booking.");
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
                  <input
                    type="date"
                    className="w-full rounded-lg border border-gray-300 p-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={
                      passengerInfo.dob
                        ? new Date(passengerInfo.dob)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      handleInputChange("dob", new Date(e.target.value))
                    }
                    max={new Date().toISOString().split("T")[0]} // Giới hạn không chọn ngày tương lai
                    placeholder="Ngày sinh *"
                    style={{ color: "#000000" }}
                  />
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

      {showQRPayment && qrPaymentData && (
        <QRCodePayment
          qrCodeUrl={qrPaymentData.qrCodeUrl}
          url={qrPaymentData.url}
          sessionId={qrPaymentData.sessionId}
          onPaymentSuccess={() => {
            router.push(`/payment-success?bookingId=${bookingId}`);
          }}
          onPaymentError={(error) => {
            setErrorMessage(error);
            setShowQRPayment(false);
          }}
          onClose={() => {
            setShowQRPayment(false);
            setQRPaymentData(null);
          }}
        />
      )}
    </div>
  );
}
