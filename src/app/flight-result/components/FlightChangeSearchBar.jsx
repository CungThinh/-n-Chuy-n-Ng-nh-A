import { useState, useRef, useEffect } from "react";
import {
  FaPlane,
  FaExchangeAlt,
  FaCalendarAlt,
  FaSearch,
  FaUser,
  FaCaretDown,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import airportsData from "@/data/airports.json";
import { removeVietnameseTones } from "@/utils";
import { useRouter } from "next/navigation";

export default function ChangeSearchBar() {
  const [tripOption, setTripOption] = useState("One way");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const [dropdownOptionOpen, setDropdownOptionOpen] = useState(false);
  const [dropdownPassengersOpen, setDropdownPassengersOpen] = useState(false);
  const [airportSuggestions, setAirportSuggestions] = useState([]);
  const [isFromFocused, setIsFromFocused] = useState(false);
  const [isToFocused, setIsToFocused] = useState(false);

  const optionDropdownRef = useRef(null);
  const passengersDropdownRef = useRef(null);
  const fromDropdownRef = useRef(null);
  const toDropdownRef = useRef(null);
  const router = useRouter();

  // Hàm tính tổng số hành khách
  const getTotalPassengers = () => {
    return passengers.adults + passengers.children + passengers.infants;
  };

  // Hoán đổi "Điểm đi" và "Nơi đến"
  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  // Hàm tìm kiếm sân bay
  const handleAirportSearch = async (e, isFromField) => {
    const query = e.target.value.toLowerCase();
    const normalizedQuery = removeVietnameseTones(query);

    if (isFromField) {
      setFrom(e.target.value);
      setIsFromFocused(true);
      setIsToFocused(false);
    } else {
      setTo(e.target.value);
      setIsFromFocused(false);
      setIsToFocused(true);
    }

    await new Promise((resolve) => setTimeout(resolve, 300));

    // Lọc dữ liệu sân bay dựa trên từ khóa
    const filteredAirports = airportsData
      .flatMap((region) => region.airports)
      .filter((airport) => {
        const airportNameNormalized = removeVietnameseTones(
          airport.name?.toLowerCase() || "",
        );
        const cityNormalized = removeVietnameseTones(
          airport.city?.toLowerCase() || "",
        );
        const countryNormalized = removeVietnameseTones(
          airport.country?.toLowerCase() || "",
        );
        const iataNormalized = airport.iata?.toLowerCase() || "";

        return (
          airportNameNormalized.includes(normalizedQuery) ||
          cityNormalized.includes(normalizedQuery) ||
          iataNormalized.includes(normalizedQuery) ||
          countryNormalized.includes(normalizedQuery)
        );
      });

    if (filteredAirports.length > 0) {
      setAirportSuggestions(filteredAirports);
    } else {
      setAirportSuggestions([{ iata: "", name: "No results found" }]);
    }
  };

  // Hàm chọn sân bay từ danh sách gợi ý
  const selectAirport = (airport, isFromField) => {
    const selectedAirport = `${airport.iata}, ${airport.city}`;
    if (isFromField) {
      if (selectedAirport === to) {
        alert("Điểm đi và điểm đến không thể giống nhau.");
      } else {
        setFrom(selectedAirport);
        setIsFromFocused(false);
      }
    } else {
      if (selectedAirport === from) {
        alert("Điểm đi và điểm đến không thể giống nhau.");
      } else {
        setTo(selectedAirport);
        setIsToFocused(false);
      }
    }
    setAirportSuggestions([]); // Ẩn danh sách gợi ý sau khi chọn
  };

  // Hàm thay đổi số lượng hành khách
  const handlePassengerChange = (type, operation) => {
    setPassengers((prev) => {
      let newValue = prev[type];

      if (operation === "increase") {
        if (getTotalPassengers() < 9) {
          newValue += 1;
        }
      }

      if (operation === "decrease") {
        if (newValue > 0) {
          newValue -= 1;
        }
      }

      return { ...prev, [type]: newValue };
    });
  };

  const toggleOptionDropdown = () => {
    setDropdownOptionOpen(!dropdownOptionOpen);
    if (dropdownPassengersOpen) setDropdownPassengersOpen(false);
  };

  const togglePassengersDropdown = () => {
    setDropdownPassengersOpen(!dropdownPassengersOpen);
    if (dropdownOptionOpen) setDropdownOptionOpen(false);
  };

  // Xử lý chọn ngày về
  const handleReturnDateChange = (date) => {
    setReturnDate(date);
    if (date && tripOption === "One way") {
      setTripOption("Round trip");
    } else if (!date && tripOption === "Round trip") {
      setTripOption("One way");
    }
  };

  const handleSearch = () => {
    if (from && to && departureDate) {
      const fromCode = from.split(",")[0].trim();
      const toCode = to.split(",")[0].trim();

      const flightType = returnDate ? "1" : "2"; // 1: Khứ hồi, 2: Một chiều

      // Lưu flightType vào localStorage
      localStorage.setItem("flightType", flightType);

      console.log("Searching with params:", {
        engine: "google_flights",
        departure_id: fromCode,
        arrival_id: toCode,
        outbound_date: departureDate.toISOString().split("T")[0],
        return_date: returnDate ? returnDate.toISOString().split("T")[0] : "",
        currency: "VND",
        api_key:
          "01c66bdf6c895db5475ec52d592b15c0101d368c0b772891ef6ff8ed20b9beae",
        type: flightType,
      });

      router.push(
        `/flight-result?engine=google_flights&departure_id=${encodeURIComponent(fromCode)}&arrival_id=${encodeURIComponent(toCode)}&outbound_date=${departureDate.toISOString().split("T")[0]}&return_date=${returnDate ? returnDate.toISOString().split("T")[0] : ""}&currency=VND&hl=vi&gl=vn&api_key=01c66bdf6c895db5475ec52d592b15c0101d368c0b772891ef6ff8ed20b9beae&type=${flightType}`,
      );
    } else {
      alert("Vui lòng điền đầy đủ thông tin điểm đi, điểm đến và ngày đi.");
    }
  };

  return (
    <div className="max-w-8xl mx-auto flex w-full items-center justify-between rounded-lg bg-white p-4 shadow-md">
      {/* Điểm đi và điểm đến */}
      <div className="flex items-center space-x-2">
        <div className="relative w-[200px]" ref={fromDropdownRef}>
          <FaPlane className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500" />
          <input
            type="text"
            placeholder="Điểm đi"
            value={from}
            onChange={(e) => handleAirportSearch(e, true)}
            className="w-full rounded-md border border-gray-300 p-2 pl-10"
          />
          {isFromFocused && from.length > 0 && (
            <div className="absolute top-full z-20 mt-1 max-h-80 w-full overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg">
              {airportSuggestions.map((airport) => (
                <div
                  key={airport.iata}
                  className="cursor-pointer border-b border-gray-200 p-4 hover:bg-gray-100"
                  onMouseDown={(e) => e.preventDefault()} // Ngăn ngừa mất focus khi chọn
                  onClick={() => selectAirport(airport, true)}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-black">
                      {airport.city}, {airport.country}
                    </div>
                    <div className="text-sm text-gray-500">{airport.iata}</div>
                  </div>
                  <div className="text-sm text-gray-500">
                    <FaPlane className="mr-2 inline-block text-gray-400" />
                    {airport.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <FaExchangeAlt
          onClick={handleSwap}
          className="cursor-pointer text-gray-500"
        />

        <div className="relative w-[200px]" ref={toDropdownRef}>
          <FaPlane className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500" />
          <input
            type="text"
            placeholder="Nơi đến"
            value={to}
            onChange={(e) => handleAirportSearch(e, false)}
            className="w-full rounded-md border border-gray-300 p-2 pl-10"
          />
          {isToFocused && to.length > 0 && (
            <div className="absolute top-full z-20 mt-1 max-h-80 w-full overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg">
              {airportSuggestions.map((airport) => (
                <div
                  key={airport.iata}
                  className="cursor-pointer border-b border-gray-200 p-4 hover:bg-gray-100"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => selectAirport(airport, false)}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-black">
                      {airport.city}, {airport.country}
                    </div>
                    <div className="text-sm text-gray-500">{airport.iata}</div>
                  </div>
                  <div className="text-sm text-gray-500">
                    <FaPlane className="mr-2 inline-block text-gray-400" />
                    {airport.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Ngày đi và Ngày về */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          <FaCalendarAlt className="mr-2 text-gray-500" />
          <DatePicker
            selected={departureDate}
            onChange={(date) => setDepartureDate(date)}
            placeholderText="Ngày đi"
            className="w-[150px] bg-transparent focus:outline-none"
          />
          {tripOption === "Round trip" && (
            <>
              <span className="mx-2 text-gray-500">|</span>
              <DatePicker
                selected={returnDate}
                onChange={(date) => handleReturnDateChange(date)}
                placeholderText="Ngày về"
                className="w-[150px] bg-transparent focus:outline-none"
              />
            </>
          )}
        </div>

        {/* Loại vé */}
        <div className="relative">
          <div
            onClick={toggleOptionDropdown}
            className="flex cursor-pointer items-center space-x-2 rounded-md border p-2"
          >
            <span>{tripOption}</span>
            <FaCaretDown className="text-gray-500" />
          </div>

          {dropdownOptionOpen && (
            <div className="absolute z-10 mt-2 rounded-lg bg-white shadow-md">
              <div
                onClick={() => setTripOption("One way")}
                className="cursor-pointer px-4 py-2 hover:bg-gray-200"
              >
                One way
              </div>
              <div
                onClick={() => setTripOption("Round trip")}
                className="cursor-pointer px-4 py-2 hover:bg-gray-200"
              >
                Round trip
              </div>
            </div>
          )}
        </div>

        {/* Hành khách */}
        <div className="relative">
          <div
            onClick={togglePassengersDropdown}
            className="flex cursor-pointer items-center space-x-2 rounded-md border p-2"
          >
            <FaUser className="text-gray-500" />
            <span>{getTotalPassengers()} Passenger</span>
            <FaCaretDown className="text-gray-500" />
          </div>

          {dropdownPassengersOpen && (
            <div className="absolute z-10 mt-2 rounded-lg bg-white p-4 shadow-md">
              <div className="flex items-center justify-between">
                <span>Adults</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePassengerChange("adults", "decrease")}
                  >
                    -
                  </button>
                  <span>{passengers.adults}</span>
                  <button
                    onClick={() => handlePassengerChange("adults", "increase")}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>Children</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      handlePassengerChange("children", "decrease")
                    }
                  >
                    -
                  </button>
                  <span>{passengers.children}</span>
                  <button
                    onClick={() =>
                      handlePassengerChange("children", "increase")
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>Infants</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePassengerChange("infants", "decrease")}
                  >
                    -
                  </button>
                  <span>{passengers.infants}</span>
                  <button
                    onClick={() => handlePassengerChange("infants", "increase")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nút Tìm kiếm */}
      <button
        onClick={handleSearch}
        className="flex items-center space-x-2 rounded-lg bg-blue-500 p-2 text-white"
      >
        <FaSearch />
        <span>Change Search</span>
      </button>
    </div>
  );
}
