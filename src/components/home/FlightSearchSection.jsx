"use client";
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import {
  FaPlane,
  FaExchangeAlt,
  FaSearch,
  FaUser,
  FaCaretDown,
  FaCheck,
  FaCalendarAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaChevronDown,
} from "react-icons/fa";
import { format } from "date-fns";
import { startOfDay, addDays } from "date-fns";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

import airportsData from "../../../public/airports.json";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { removeVietnameseTones } from "@/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FlightSearchSection() {
  const [tripOption, setTripOption] = useState("Một chiều");
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
  const [errorMessage, setErrorMessage] = useState("");
  const [airportSuggestions, setAirportSuggestions] = useState([]);
  const [isFromFocused, setIsFromFocused] = useState(false);
  const [isToFocused, setIsToFocused] = useState(false);

  const optionDropdownRef = useRef(null);
  const passengersDropdownRef = useRef(null);
  const fromDropdownRef = useRef(null);
  const toDropdownRef = useRef(null);
  const router = useRouter();
  const [travelClass, setTravelClass] = useState("1"); // State để lưu hạng ghế

  // Tính tổng số hành khách
  const getTotalPassengers = () => {
    return passengers.adults + passengers.children + passengers.infants;
  };

  const handleSwap = () => {
    const temp = from;

    setFrom(to);
    setTo(temp);
  };

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
      setAirportSuggestions([{ iata: "", name: "Nothing found." }]);
    }
  };

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
    setAirportSuggestions([]);
  };

  const handlePassengerChange = (type, operation) => {
    setPassengers((prev) => {
      let newValue = prev[type];

      if (operation === "increase") {
        if (getTotalPassengers() < 9) {
          if (type === "adults" && newValue < 9) {
            newValue += 1;
          } else if (type === "children" && newValue < 8) {
            newValue += 1;
          } else if (type === "infants" && newValue < passengers.adults) {
            newValue += 1;
          } else if (type === "infants" && newValue >= passengers.adults) {
            setErrorMessage(
              "Số lượng trẻ sơ sinh không được nhiều hơn số lượng người lớn",
            );

            return prev;
          }
        } else {
          setErrorMessage(
            "Số lượng hành khách không vượt quá 9 người trong một lần đặt chỗ",
          );
        }
      }

      if (operation === "decrease") {
        if (type === "adults" && newValue > 1) {
          if (passengers.infants > newValue - 1) {
            setErrorMessage(
              "Số lượng trẻ sơ sinh không được ít hơn số lượng người lớn",
            );
          } else {
            newValue -= 1;
            setErrorMessage("");
          }
        } else if (type !== "adults" && newValue > 0) {
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

  const handleClickOutside = (e) => {
    if (
      optionDropdownRef.current &&
      !optionDropdownRef.current.contains(e.target) &&
      passengersDropdownRef.current &&
      !passengersDropdownRef.current.contains(e.target) &&
      fromDropdownRef.current &&
      !fromDropdownRef.current.contains(e.target) &&
      toDropdownRef.current &&
      !toDropdownRef.current.contains(e.target)
    ) {
      setDropdownOptionOpen(false);
      setDropdownPassengersOpen(false);
      setIsFromFocused(false);
      setIsToFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDepartureDateSelect = (date) => {
    setDepartureDate(date);
    setReturnDate(null);
  };

  // const handleReturnDateSelect = (range) => {
  //   setReturnDate(range?.to)
  // }

  const handleReturnDateSelect = (range) => {
    setReturnDate(range?.to);
    if (range?.to) {
      setTripOption("Khứ hồi"); // Chuyển sang "Khứ hồi" nếu có ngày về
    } else {
      setTripOption("Một chiều"); // Quay lại "Một chiều" nếu không có ngày về
    }
  };

  const handleSearch = () => {
    console.log("Selected travel class:", travelClass); // Kiểm tra giá trị travelClass

    if (from && to && departureDate) {
      const fromCode = from.split(",")[0].trim();
      const toCode = to.split(",")[0].trim();
      const flightType = returnDate ? "1" : "2";
      const vietnamTimeZone = "Asia/Ho_Chi_Minh";
      const formattedOutboundDate = format(
        departureDate.setHours(0, 0, 0, 0),
        "yyyy-MM-dd",
        { timeZone: vietnamTimeZone },
      );
      const formattedReturnDate = returnDate
        ? format(returnDate.setHours(0, 0, 0, 0), "yyyy-MM-dd", {
            timeZone: vietnamTimeZone,
          })
        : "";

      router.push(
        `/flight-result?engine=google_flights&departure_id=${encodeURIComponent(
          fromCode,
        )}&arrival_id=${encodeURIComponent(
          toCode,
        )}&outbound_date=${formattedOutboundDate}&return_date=${formattedReturnDate}&currency=VND&hl=vi&gl=vn&api_key=c8ef166d9ea4cd3da69a99def09f1d4b227db65a31902b20f49a3e50d747350e&type=${flightType}&travel_class=${travelClass}`,
      );
    } else {
      alert("Vui lòng điền đầy đủ thông tin điểm đi, điểm đến và ngày đi.");
    }
  };

  const [multiLegFlights, setMultiLegFlights] = useState([
    { from: "", to: "", departureDate: null },
  ]);

  const addLeg = () => {
    if (multiLegFlights.length < 5) {
      setMultiLegFlights([
        ...multiLegFlights,
        { from: "", to: "", departureDate: null },
      ]);
    }
  };

  const removeLeg = (index) => {
    const newLegs = [...multiLegFlights];

    newLegs.splice(index, 1);
    setMultiLegFlights(newLegs);
  };

  const updateLeg = (index, field, value) => {
    const newLegs = [...multiLegFlights];

    newLegs[index][field] = value;
    setMultiLegFlights(newLegs);
  };

  const handleMultiLegAirportSearch = (e, index, field) => {
    const value = e.target.value;

    updateLeg(index, field, value);
  };

  const videoSrc = "./videos/video-bg.mp4";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <>
      <header className="absolute left-0 top-0 z-50 w-full font-sans">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between border-b border-transparent py-2 text-xs">
            <div className="flex space-x-4 text-sm text-white md:space-x-6">
              <a href="#" className="text-white hover:text-gray-300">
                <FaFacebookF className="size-4" />
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <FaTwitter className="size-4" />
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <FaInstagram className="size-4" />
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <FaLinkedin className="size-4" />
              </a>
              <span className="hidden text-gray-500 md:inline">|</span>
              <span className="text-sm text-white md:text-base">
                0932 126 988
              </span>
              <span className="hidden text-gray-500 md:inline">|</span>
              <span className="text-sm text-white md:text-base">
                contact@domain.com
              </span>
            </div>
            <div className="flex items-center space-x-4 md:space-x-6">
              <Link
                href="/login"
                className="text-sm text-white hover:text-gray-300 md:text-base"
              >
                Login
              </Link>
              <span className="hidden text-gray-500 md:inline">|</span>
              <Link
                href="/signup"
                className="text-sm text-white hover:text-gray-300 md:text-base"
              >
                Sign up
              </Link>
            </div>
          </div>
          <hr className="border-t-stone-400" />
          <div className="max-w-9xl container mx-auto flex items-center justify-between py-4">
            <Link href="/" className="flex items-center">
              <img
                src="/images/logo.png"
                alt="vemaybay logo"
                className="sm:h-100 h-10 w-auto"
              />
            </Link>
            <nav className="mx-2 flex-1 md:mx-10">
              <ul className="flex space-x-6 text-sm text-white sm:space-x-12 md:text-lg">
                {["Home", "Blog", "About", "Contact"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="flex items-center text-white hover:text-gray-300"
                    >
                      {item}
                      <FaChevronDown className="ml-1 text-xs text-gray-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-white hover:text-gray-300">
                <FaSearch className="size-5" />
              </button>
              <button className="rounded-full bg-[#F97340] bg-opacity-90 px-2 py-1 text-xs font-medium text-white hover:bg-[#F97316] md:px-4 md:py-2 md:text-sm">
                Book now
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative h-screen md:h-[950px]">
        <video
          autoPlay
          loop
          muted
          className="absolute left-0 top-0 z-0 size-full object-cover"
          src={videoSrc}
          style={{ filter: "grayscale(20%) brightness(60%)" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="mb-4 text-4xl font-light text-white sm:text-5xl md:text-7xl"
              variants={itemVariants}
            >
              <motion.span className="font-bold" variants={itemVariants}>
                EXPLORE THE
              </motion.span>{" "}
              <motion.span variants={itemVariants}>DESTINATION</motion.span>
            </motion.h1>
            <motion.p
              className="text-4xl font-light text-white sm:text-5xl md:text-7xl"
              variants={itemVariants}
            >
              AROUND THE{" "}
              <motion.span className="font-bold" variants={itemVariants}>
                WORLD WITH US
              </motion.span>
            </motion.p>
          </motion.div>
        </div>

        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="absolute bottom-[10%] mx-auto w-full max-w-7xl rounded-lg bg-white bg-opacity-50 p-4 shadow-lg md:bottom-[5%] md:p-6">
            <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              <div
                className="relative flex h-[38px] w-full cursor-pointer items-center rounded-lg bg-white p-3 md:w-auto"
                onClick={toggleOptionDropdown}
                ref={optionDropdownRef}
              >
                <FaPlane className="mr-2 text-gray-500" />
                <span className="flex items-center space-x-2 overflow-hidden text-black">
                  <span>{tripOption}</span>
                </span>
                <FaCaretDown className="ml-2 text-gray-500" />

                {dropdownOptionOpen && (
                  <div className="absolute left-0 top-9 z-20 mt-1 w-full rounded-lg bg-white shadow-lg md:left-auto md:w-[170px]">
                    <div
                      className="flex cursor-pointer items-center justify-between p-2 hover:bg-gray-100"
                      style={{ color: "black" }}
                      onClick={() => setTripOption("Một chiều")}
                    >
                      Một chiều
                      {tripOption === "Một chiều" && (
                        <FaCheck
                          className="text-orange-500"
                          style={{ strokeWidth: "1px" }}
                        />
                      )}
                    </div>
                    <div
                      className="flex cursor-pointer items-center justify-between p-2 hover:bg-gray-100"
                      style={{ color: "black" }}
                      onClick={() => setTripOption("Khứ hồi")}
                    >
                      Khứ hồi
                      {tripOption === "Khứ hồi" && (
                        <FaCheck
                          className="text-orange-500"
                          style={{ strokeWidth: "1px" }}
                        />
                      )}
                    </div>
                    <div
                      className="flex cursor-pointer items-center justify-between p-2 hover:bg-gray-100"
                      style={{ color: "black" }}
                      onClick={() => setTripOption("Nhiều chặng")}
                    >
                      Nhiều chặng
                      {tripOption === "Nhiều chặng" && (
                        <FaCheck
                          className="text-orange-500"
                          style={{ strokeWidth: "1px" }}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div
                className="relative flex h-[38px] w-full cursor-pointer items-center rounded-lg bg-white p-3 md:w-auto"
                onClick={togglePassengersDropdown}
                ref={passengersDropdownRef}
              >
                <FaUser className="mr-2 text-gray-500" />
                <span className="flex items-center space-x-2 overflow-hidden text-black">
                  <span>{passengers.adults} Người lớn</span>
                  {passengers.children > 0 && (
                    <span>{passengers.children} Trẻ em</span>
                  )}
                  {passengers.infants > 0 && (
                    <span>{passengers.infants} Em bé</span>
                  )}
                </span>
                <FaCaretDown className="ml-2 text-gray-500" />

                {dropdownPassengersOpen && (
                  <div className="absolute left-0 top-12 z-20 mt-1 w-full rounded-lg bg-white shadow-lg md:left-auto md:w-[300px]">
                    <div className="p-3">
                      <div className="mb-2 flex cursor-default items-center justify-between">
                        <span className="text-black">Người lớn</span>
                        <div className="flex items-center">
                          <button
                            className="cursor-pointer rounded bg-gray-300 px-4 py-1 text-black"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePassengerChange("adults", "decrease");
                            }}
                          >
                            -
                          </button>
                          <span className="mx-4 text-black">
                            {passengers.adults}
                          </span>
                          <button
                            className="cursor-pointer rounded bg-orange-500 px-4 py-1 text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePassengerChange("adults", "increase");
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <hr className="my-2 border-gray-300" />

                      <div className="mb-2 flex cursor-default items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-black">Trẻ em</span>
                          <p className="text-sm text-gray-500">
                            2-11 tuổi tại thời điểm diễn ra chuyến đi
                          </p>
                        </div>
                        <div className="flex items-center">
                          <button
                            className="cursor-pointer rounded bg-gray-300 px-4 py-1 text-black"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePassengerChange("children", "decrease");
                            }}
                          >
                            -
                          </button>
                          <span className="mx-4 text-black">
                            {passengers.children}
                          </span>
                          <button
                            className="cursor-pointer rounded bg-orange-500 px-4 py-1 text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePassengerChange("children", "increase");
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <hr className="my-2 border-gray-300" />

                      <div className="mb-2 flex cursor-default items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-black">Em bé</span>
                          <p className="text-sm text-gray-500">
                            Dưới 2 tuổi tại thời điểm đi
                          </p>
                        </div>
                        <div className="flex items-center">
                          <button
                            className="cursor-pointer rounded bg-gray-300 px-4 py-1 text-black"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePassengerChange("infants", "decrease");
                            }}
                          >
                            -
                          </button>
                          <span className="mx-4 text-black">
                            {passengers.infants}
                          </span>
                          <button
                            className="cursor-pointer rounded bg-orange-500 px-4 py-1 text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePassengerChange("infants", "increase");
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {errorMessage && (
                        <p className="mt-2 text-sm text-red-500">
                          {errorMessage}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* Các phần khác của giao diện */}
              <div className="flex h-[38px] items-center gap-3 rounded-lg bg-background p-2 shadow-sm ring-1 ring-muted">
                <label
                  htmlFor="travel-class"
                  className="flex h-full items-center whitespace-nowrap text-sm font-medium text-muted-foreground" // Đặt chiều cao và căn giữa theo chiều dọc
                >
                  Hạng ghế:
                </label>
                <Select value={travelClass} onValueChange={setTravelClass}>
                  <SelectTrigger
                    id="travel-class"
                    className="h-[38px] w-[180px] border-0 bg-transparent focus:ring-0"
                  >
                    {" "}
                    {/* Đặt chiều cao cho SelectTrigger */}
                    <SelectValue placeholder="Chọn hạng ghế" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="1">Economy</SelectItem>
                      <SelectItem value="2">Premium Economy</SelectItem>
                      <SelectItem value="3">Business</SelectItem>
                      <SelectItem value="4">First</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {(tripOption === "Một chiều" || tripOption === "Khứ hồi") && (
              <div className="mb-4 flex flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                <div
                  className="relative w-full md:w-[22%]"
                  ref={fromDropdownRef}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-500"
                  >
                    <path
                      d="M381 114.9L186.1 41.8c-16.7-6.2-35.2-5.3-51.1 2.7L89.1 67.4C78 73 77.2 88.5 87.6 95.2l146.9 94.5L136 240 77.8 214.1c-8.7-3.9-18.8-3.7-27.3 .6L18.3 230.8c-9.3 4.7-11.8 16.8-5 24.7l73.1 85.3c6.1 7.1 15 11.2 24.3 11.2l137.7 0c5 0 9.9-1.2 14.3-3.4L535.6 212.2c46.5-23.3 82.5-63.3 100.8-112C645.9 75 627.2 48 600.2 48l-57.4 0c-20.2 0-40.2 4.8-58.2 14L381 114.9zM0 480c0 17.7 14.3 32 32 32l576 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 448c-17.7 0-32 14.3-32 32z"
                      fill="currentColor"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Khởi hành từ"
                    value={from}
                    onChange={(e) => handleAirportSearch(e, true)}
                    className="w-full rounded-lg border bg-white p-3 pl-10 text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  {isFromFocused && from.length > 0 && (
                    <div className="absolute top-full z-20 mt-1 max-h-80 w-full overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg md:w-[400px]">
                      {airportSuggestions.map((airport) => (
                        <div
                          key={airport.iata}
                          className="cursor-pointer border-b border-gray-200 p-4 hover:bg-gray-100"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => selectAirport(airport, true)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="text-black">
                              {airport.city}, {airport.country}
                            </div>
                            <div className="text-sm text-gray-500">
                              {airport.iata}
                            </div>
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

                <button onClick={handleSwap} className="mx-2">
                  <FaExchangeAlt className="text-black-500" />
                </button>

                <div className="relative w-full md:w-[22%]" ref={toDropdownRef}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-500"
                  >
                    <path
                      d="M.3 166.9L0 68C0 57.7 9.5 50.1 19.5 52.3l35.6 7.9c10.6 2.3 19.2 9.9 23 20L96 128l127.3 37.6L181.8 20.4C178.9 10.2 186.6 0 197.2 0l40.1 0c11.6 0 22.2 6.2 27.9 16.3l109 193.8 107.2 31.7c15.9 4.7 30.8 12.5 43.7 22.8l34.4 27.6c24 19.2 18.1 57.3-10.7 68.2c-41.2 15.6-86.2 18.1-128.8 7L121.7 289.8c-11.1-2.9-21.2-8.7-29.3-16.9L9.5 189.4c-5.9-6-9.3-14.1-9.3-22.5zM32 448l576 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 512c-17.7 0-32-14.3-32-32s14.3-32 32-32zm96-80a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm128-16a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                      fill="currentColor"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Nơi đến"
                    value={to}
                    onChange={(e) => handleAirportSearch(e, false)}
                    className="w-full rounded-lg border bg-white p-3 pl-10 text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  {isToFocused && to.length > 0 && (
                    <div className="absolute top-full z-20 mt-1 max-h-80 w-full overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg md:w-[400px]">
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
                            <div className="text-sm text-gray-500">
                              {airport.iata}
                            </div>
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

                {/* Ngày đi và Ngày về */}
                <div className="flex h-[50px] w-[38%] items-center rounded-lg border bg-white p-3">
                  <FaCalendarAlt className="mr-2 text-gray-500" />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="departureDate"
                        variant={"ghost"}
                        className={cn(
                          "w-[50%] justify-start bg-transparent text-left text-base font-normal text-black focus:outline-none",
                          !departureDate && "text-muted-foreground",
                        )}
                      >
                        {departureDate
                          ? format(departureDate, "dd/MM/yyyy")
                          : "Chọn ngày đi"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={departureDate}
                        onSelect={handleDepartureDateSelect}
                        initialFocus
                        disabled={(date) => date < startOfDay(new Date())} // Chấp nhận ngày hiện tại
                      />
                    </PopoverContent>
                  </Popover>

                  <span className="mx-4 text-gray-400">|</span>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="returnDateRange"
                        variant={"ghost"}
                        className={cn(
                          "w-[50%] justify-start bg-transparent text-left text-base font-normal text-black focus:outline-none",
                          !returnDate && "text-muted-foreground",
                        )}
                        disabled={!departureDate}
                      >
                        {returnDate
                          ? format(returnDate, "dd/MM/yyyy")
                          : "Chọn ngày về"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="left">
                      <Calendar
                        mode="range"
                        defaultMonth={departureDate}
                        selected={{ from: departureDate, to: returnDate }}
                        onSelect={(range) => handleReturnDateSelect(range)}
                        // Đảm bảo ngày về không thể là ngày đi hoặc trước ngày đi
                        disabled={(date) =>
                          date <=
                          startOfDay(addDays(departureDate || new Date(), 0))
                        }
                        numberOfMonths={2}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <button
                  onClick={handleSearch}
                  className="flex h-[50px] items-center justify-center rounded-lg bg-orange-500 px-6 py-3 text-white"
                >
                  <FaSearch className="mr-2" /> Tìm kiếm
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
