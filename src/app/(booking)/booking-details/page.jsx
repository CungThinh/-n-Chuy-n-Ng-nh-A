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

  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants_in_seat: 0,
    infants_on_lap: 0,
  });

  const [passengersInfo, setPassengersInfo] = useState([]);
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
    return passengersInfo.every(
      (passenger) =>
        passenger.lastName &&
        passenger.firstName &&
        passenger.gender &&
        passenger.dob &&
        passenger.nationality,
    );
  };

  const clearFlightData = () => {
    localStorage.removeItem("selectedOutboundFlight");
    localStorage.removeItem("selectedReturnFlight");
    localStorage.removeItem("flightType");
    localStorage.removeItem("totalPrice");
    localStorage.removeItem("destination");
    localStorage.removeItem("passengersInfo");
  };

  const handlePaymentSuccess = () => {
    clearFlightData();
    router.push(`/payment-success?bookingId=${bookingId}`);
  };

  const handleBookingSubmit = async () => {
    if (!session) {
      const currentUrl = window.location.pathname;

      localStorage.setItem("passengersInfo", JSON.stringify(passengersInfo));
      router.push(`/login?callbackUrl=${encodeURIComponent(currentUrl)}`);

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
        passengers: passengersInfo,
        totalAmount: totalPrice,
        tickets,
        customers: passengersInfo.map((passenger) => ({
          firstName: passenger.firstName,
          lastName: passenger.lastName,
          dateOfBirth: passenger.dob,
          nationality: passenger.nationality,
          gender: passenger.gender,
        })),
        user: {
          email: session?.user?.email,
        },
      };

      const response = await axios.post("/api/bookings", bookingData);
      const newBookingId = response.data.booking.id;
      const pnr = response.data.booking.pnr;
      const bookingInfo = {
        bookingId: newBookingId,
        pnrId: pnr,
        firstName: passengersInfo[0].firstName,
        lastName: passengersInfo[0].lastName,
        email: session?.user?.email,
        nationality: passengersInfo[0].nationality,
        dob: passengersInfo[0].dob,
        totalPrice: totalPrice,
        // Thêm số lượng hành khách
        adultCount: passengersInfo.filter((p) => p.type === "adult").length,
        childCount: passengersInfo.filter((p) => p.type === "child").length,
        infantCount: passengersInfo.filter((p) => p.type === "infant").length,
        // Thêm toàn bộ thông tin hành khách
        passengers: passengersInfo,
        allPassengers: passengersInfo.length, // Tổng số hành khách
      };

      localStorage.setItem("bookingInfo", JSON.stringify(bookingInfo));
      if (!newBookingId) {
        setErrorMessage("Không thể lấy ID đặt chỗ.");

        return;
      }

      setBookingId(newBookingId);

      if (paymentMethod === "stripe_qr") {
        const qrResult = await createStripeQRPayment({
          totalPrice,
          flightType: flightType === "1" ? "Khứ hồi" : "Một chiều",
          airlineName: flightDetails.outbound.flights[0].airline,
          airlineLogos: flightDetails.outbound.flights.map(
            (flight) => flight.airline_logo,
          ),
          user: session.user,
          bookingId: newBookingId,
        });

        if (qrResult) {
          setQRPaymentData(qrResult);
          setShowQRPayment(true);
        }
      } else if (paymentMethod === "stripe") {
        const stripeResult = await createStripePayment({
          bookingId: newBookingId,
          user: session.user,
        });

        clearFlightData();
        window.location.href = stripeResult.url;
      } else if (paymentMethod === "momo") {
        const momoResult = await createMomoPayment({
          totalAmount: totalPrice,
          orderInfo: `Đặt vé máy bay cho ${session.user.name || "Khách hàng"}`,
          bookingId: newBookingId,
          user: session.user,
        });

        clearFlightData();
        window.location.href = momoResult.payUrl;
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
    const storedPassengers = localStorage.getItem("passengers");

    if (outboundFlight) {
      setFlightDetails({
        outbound: JSON.parse(outboundFlight),
        return: returnFlight ? JSON.parse(returnFlight) : null,
      });
    }

    if (storedTotalPrice) {
      setTotalPrice(JSON.parse(storedTotalPrice));
    }

    if (storedFlightType) {
      setFlightType(storedFlightType);
    }

    if (storedPassengers) {
      try {
        const parsedPassengers = JSON.parse(storedPassengers);
        let newPassengersInfo = [];

        // Add adult passengers
        for (let i = 0; i < parsedPassengers.adults; i++) {
          newPassengersInfo.push({
            type: "adult",
            lastName: "",
            firstName: "",
            gender: "",
            dob: null,
            nationality: "Việt Nam",
          });
        }

        // Add child passengers
        for (let i = 0; i < parsedPassengers.children; i++) {
          newPassengersInfo.push({
            type: "child",
            lastName: "",
            firstName: "",
            gender: "",
            dob: null,
            nationality: "Việt Nam",
          });
        }

        // Add infant passengers
        for (
          let i = 0;
          i <
          parsedPassengers.infants_in_seat + parsedPassengers.infants_on_lap;
          i++
        ) {
          newPassengersInfo.push({
            type: "infant",
            lastName: "",
            firstName: "",
            gender: "",
            dob: null,
            nationality: "Việt Nam",
          });
        }

        setPassengersInfo(newPassengersInfo);
      } catch (error) {
        console.error("Error parsing passengers:", error);
      }
    }
  }, []);

  const handlePassengerInfoChange = (index, field, value) => {
    const newPassengersInfo = [...passengersInfo];

    newPassengersInfo[index] = {
      ...newPassengersInfo[index],
      [field]: value,
    };
    setPassengersInfo(newPassengersInfo);
  };

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

            {/* Một card chứa tất cả thông tin hành khách */}
            <div className="mb-4 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-6 text-xl font-bold text-gray-800">
                Thông tin hành khách
              </h2>

              {passengersInfo.map((passenger, index) => (
                <div key={index} className="mb-8 border-b pb-6 last:border-b-0">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    Hành khách {index + 1}{" "}
                    {passenger.type === "adult"
                      ? "(Người lớn)"
                      : passenger.type === "child"
                        ? "(Trẻ em)"
                        : "(Em bé)"}
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <input
                      className="w-full rounded-lg border border-gray-300 p-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Họ *"
                      type="text"
                      value={passenger.lastName}
                      onChange={(e) =>
                        handlePassengerInfoChange(
                          index,
                          "lastName",
                          e.target.value,
                        )
                      }
                    />
                    <input
                      className="w-full rounded-lg border border-gray-300 p-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Tên đệm và tên *"
                      type="text"
                      value={passenger.firstName}
                      onChange={(e) =>
                        handlePassengerInfoChange(
                          index,
                          "firstName",
                          e.target.value,
                        )
                      }
                    />
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full rounded-lg border border-gray-300 p-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={
                          passenger.dob && !isNaN(new Date(passenger.dob))
                            ? new Date(passenger.dob)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        onChange={(e) => {
                          const dateValue = e.target.value;
                          const isValidDate = !isNaN(new Date(dateValue));

                          handlePassengerInfoChange(
                            index,
                            "dob",
                            isValidDate ? new Date(dateValue) : null,
                          );
                        }}
                        max={new Date().toISOString().split("T")[0]}
                        placeholder="Ngày sinh *"
                        style={{ color: "#000000" }}
                      />
                    </div>
                    <div className="relative">
                      <Select
                        value={passenger.gender}
                        onValueChange={(value) =>
                          handlePassengerInfoChange(index, "gender", value)
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
                        value={passenger.nationality}
                        onValueChange={(value) =>
                          handlePassengerInfoChange(index, "nationality", value)
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
                </div>
              ))}
            </div>

            {/* Phần thanh toán chung */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-6 text-xl font-bold text-gray-800">
                Phương thức thanh toán
              </h2>
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
              passengersInfo={passengersInfo} // Thêm prop này
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
            clearFlightData();
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
