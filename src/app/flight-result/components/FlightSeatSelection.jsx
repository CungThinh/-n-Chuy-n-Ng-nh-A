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
  const [isLoading, setIsLoading] = useState(false); // Thêm state để quản lý trạng thái loading

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

  const handleSeatClick = (seat) =>
    !bookedSeats.includes(seat) && setSelectedSeat(seat);

  const handleAccept = () => {
    setIsLoading(true); // Bắt đầu loading
    setTimeout(() => {
      onSelectSeat(selectedSeat);
      localStorage.setItem(`selected${leg}Seat`, selectedSeat);
      setIsLoading(false); // Kết thúc loading
      onClose(); // Đóng modal sau khi loading hoàn tất
    }, 1000); // Đặt thời gian loading là 1 giây (1000ms)
  };

  return (
    <div>
      {/* Overlay background */}
      <div
        className="fixed inset-0 z-40 bg-gray-900/50"
        onClick={onClose} // Đóng form khi nhấn ra ngoài
      ></div>

      {/* Modal content centered */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ paddingTop: "10vh" }}
      >
        <div className="w-[500px] rounded-lg bg-white p-6 shadow-lg">
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
                        }`}
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
              disabled={!selectedSeat || isLoading} // Vô hiệu hóa khi loading
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span className="loader"></span> {/* Thêm spinner */}
                  Loading...
                </div>
              ) : (
                "Confirm"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Spinner Style */}
      <style jsx>{`
        .loader {
          border: 2px solid #f3f3f3;
          border-top: 2px solid #3498db;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
