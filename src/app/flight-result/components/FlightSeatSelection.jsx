"use client";

import { useState, useEffect } from "react";

export default function Component({
  totalSeats = 40,
  availableSeats = 60,
  onClose,
  onSelectSeat,
  leg,
}) {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [modalPosition, setModalPosition] = useState({
    top: "50%",
    left: "50%",
  });

  const seatRows = Array.from({ length: 10 }, (_, i) =>
    ["A", "B", "C", "D", "E", "F"].map((letter) => `${i + 1}${letter}`),
  );

  useEffect(() => {
    const allSeats = seatRows.flat();
    const bookedSeatsCount = availableSeats - totalSeats;
    const tempBookedSeats = new Set();

    while (tempBookedSeats.size < bookedSeatsCount) {
      tempBookedSeats.add(
        allSeats[Math.floor(Math.random() * allSeats.length)],
      );
    }

    setBookedSeats([...tempBookedSeats]);
  }, [totalSeats, availableSeats]);

  useEffect(() => {
    const handleScroll = () => {
      setModalPosition({ top: `${window.scrollY + 100}px`, left: "50%" });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSeatClick = (seat) =>
    !bookedSeats.includes(seat) && setSelectedSeat(seat);

  const handleAccept = () => {
    onSelectSeat(selectedSeat);
    localStorage.setItem(`selected${leg}Seat`, selectedSeat);
    onClose();
  };

  return (
    <div>
      {/* Lớp nền mờ bao phủ toàn bộ màn hình để khóa thao tác bên ngoài form */}
      <div
        className="fixed inset-0 z-40 bg-gray-900/50"
        onClick={onClose} // Đóng form khi nhấn ra ngoài nếu muốn
      ></div>

      {/* Nội dung form chọn ghế */}
      <div
        className="fixed z-50 bg-white"
        style={{ ...modalPosition, transform: "translate(-50%, 0)" }}
      >
        <div className="w-[600px] rounded-lg bg-white p-2">
          <div className="mb-2">
            <div className="mx-auto mb-4 flex h-8 w-3/4 items-center justify-center rounded-t-full bg-gray-200 text-gray-600">
              Screen
            </div>
            <h3 className="text-center text-lg font-medium text-gray-700">
              Please select a seat
            </h3>
          </div>

          <div className="mb-6 flex justify-between">
            {["EXIT", "EXIT"].map((text, i) => (
              <span
                key={i}
                className="rounded bg-green-500 px-4 py-1 text-white"
              >
                {text}
              </span>
            ))}
          </div>

          <div className="space-y-4">
            {seatRows.map((row, i) => (
              <div key={i} className="flex justify-center">
                <div className="grid w-full grid-cols-6 gap-4 px-8">
                  {row.map((seat) => (
                    <div key={seat} className="flex justify-center">
                      <button
                        onClick={() => handleSeatClick(seat)}
                        disabled={bookedSeats.includes(seat)}
                        className={`flex size-10 items-center justify-center rounded text-sm ${
                          bookedSeats.includes(seat)
                            ? "cursor-not-allowed bg-gray-200 text-gray-400"
                            : selectedSeat === seat
                              ? "bg-blue-500 text-white"
                              : "bg-blue-500 text-white hover:bg-blue-600"
                        } `}
                      >
                        {bookedSeats.includes(seat) ? "X" : seat}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="my-6 flex justify-between">
            {["EXIT", "EXIT"].map((text, i) => (
              <span
                key={i}
                className="rounded bg-green-500 px-4 py-1 text-white"
              >
                {text}
              </span>
            ))}
          </div>

          <div className="flex justify-end gap-3">
            <button
              className="rounded-md bg-gray-500 px-6 py-2 text-white transition-colors hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="rounded-md bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
              onClick={handleAccept}
              disabled={!selectedSeat}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
