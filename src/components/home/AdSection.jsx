import Link from "next/link";
import { useState } from "react";
import { FaPlane, FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function AdSection() {
  const [selectedCity, setSelectedCity] = useState("Hồ Chí Minh"); // Tên biến mới cho lựa chọn thành phố
  const [currentPage, setCurrentPage] = useState(0);
  const citiesPerPage = 4;
  const allCities = [
    "Bangkok",
    "Singapore",
    "Tokyo",
    "Seoul",
    "Zurich",
    "Los Angeles",
    "Frankfurt",
  ];

  const handleNextPage = () => {
    if ((currentPage + 1) * citiesPerPage < allCities.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const displayedCities = allCities.slice(
    currentPage * citiesPerPage,
    (currentPage + 1) * citiesPerPage,
  );

  // Function to map city names to their corresponding image file names
  const getCityImage = (city) => {
    const cityImageMap = {
      Bangkok: "BKK-1.jpg",
      Singapore: "SIN-1.jpg",
      Tokyo: "NRT-1.jpg",
      Seoul: "ICN-1.jpg",
      Zurich: "ZRH-1.jpg",
      "Los Angeles": "LAX-1.jpg",
      Frankfurt: "FRA-1.jpg",
    };

    return cityImageMap[city] || "default.jpg";
  };

  return (
    <>
      <div className="mx-auto mt-8 grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-3">
        <Link href="/ad1" legacyBehavior>
          <a target="_blank">
            <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg">
              <img
                src="/images/qc1.jpg"
                alt="Ad 1"
                className="w-394 object-cover"
              />
            </div>
          </a>
        </Link>

        <Link href="/ad2" legacyBehavior>
          <a target="_blank">
            <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg">
              <img
                src="/images/qc2.jpg"
                alt="Ad 2"
                className="w-394 object-cover"
              />
            </div>
          </a>
        </Link>

        <Link href="/ad3" legacyBehavior>
          <a target="_blank">
            <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg">
              <img
                src="/images/qc3.jpg"
                alt="Ad 3"
                className="w-394 object-cover"
              />
            </div>
          </a>
        </Link>
      </div>

      <div
        className="mx-auto mt-14 w-full max-w-7xl rounded-lg p-6"
        style={{ background: "linear-gradient(to right, #FFEDD5, #DBEAFE)" }}
      >
        <h2
          className="mb-4 text-2xl font-bold"
          style={{
            fontFamily: "Roboto, sans-serif",
            color: "#ffa301",
            fontSize: "32px",
          }}
        >
          Các tuyến bay phổ biến
        </h2>
        <div className="mb-4 flex flex-wrap items-center gap-4">
          {[
            "Hồ Chí Minh",
            "Hà Nội",
            "Đà Nẵng",
            "Singapore",
            "Băng Cốc",
            "Đài Bắc",
            "Seoul",
            "Tokyo",
          ].map((city, index) => (
            <button
              key={index}
              className={`rounded-lg px-4 py-2 transition-colors duration-300 ${selectedCity === city ? "bg-orange-500 text-white" : "bg-white text-black hover:bg-orange-500 hover:text-white"}`}
              onClick={() => setSelectedCity(city)}
            >
              {city}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {displayedCities.map((city, index) => (
            <div
              key={index}
              className="relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg"
            >
              <img
                src={`/images/${getCityImage(city)}`}
                alt={`Hồ Chí Minh - ${city}`}
                className="h-auto w-full object-cover"
              />
              <div className="p-4">
                <h3
                  className="text-lg font-bold"
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    color: "#121212",
                    fontSize: "14px",
                  }}
                >
                  Hồ Chí Minh{" "}
                  <FaPlane className="mx-2 inline-block text-gray-500" /> {city}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="mx-2 rounded-full bg-gray-300 p-2 text-black"
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
          >
            <FaArrowLeft />
          </button>
          <button
            className="rounded-full bg-gray-300 p-2 text-black"
            onClick={handleNextPage}
            disabled={
              currentPage >= Math.ceil(allCities.length / citiesPerPage) - 1
            }
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      {/* Partners Section */}
      <div className="mx-auto mt-14 w-full max-w-7xl rounded-lg p-6">
        <h2
          className="mb-4 text-2xl font-bold"
          style={{
            fontFamily: "Roboto, sans-serif",
            color: "#0a52a3",
            fontSize: "32px",
            marginBottom: "50px",
          }}
        >
          Đối tác hàng không
        </h2>
        <div className="my-3 flex grid-cols-2 flex-wrap items-center gap-5 overflow-hidden md:grid md:grid-cols-9">
          <img
            src="/images/bamboo.png"
            alt="Bamboo Airways"
            className="mx-auto h-[30px]"
          />
          <img
            src="/images/VnAirline.png"
            alt="Vietnam Airlines"
            className="mx-auto h-[26px]"
          />
          <img
            src="/images/vietjet.png"
            alt="VietJet Air"
            className="mx-auto h-[30px]"
          />
          <img
            src="/images/Cathay.png"
            alt="Cathay Pacific"
            className="mx-auto h-auto"
          />
          <img
            src="/images/koreanair.png"
            alt="Korean Air"
            className="mx-auto h-auto"
          />
          <img
            src="/images/delta.png"
            alt="Delta Airlines"
            className="mx-auto h-auto"
          />
          <img
            src="/images/chinaairlines.png"
            alt="China Airlines"
            className="mx-auto h-auto"
          />
          <img
            src="/images/philippineairlines.png"
            alt="Philippine Airlines"
            className="mx-auto h-auto"
          />
          <img
            src="/images/thai.png"
            alt="Thai Airways"
            className="mx-auto h-auto"
          />
          <img
            src="/images/jetstar.png"
            alt="Jetstar"
            className="mx-auto h-[20px]"
          />
          <img
            src="/images/evaair.png"
            alt="EVA Air"
            className="mx-auto h-auto"
          />
          <img
            src="/images/emirates.png"
            alt="Emirates"
            className="mx-auto h-auto"
          />
          <img
            src="/images/americanairlines.png"
            alt="American Airlines"
            className="mx-auto h-auto"
          />
          <img
            src="/images/ana.png"
            alt="All Nippon Airways (ANA)"
            className="mx-auto h-auto"
          />
          <img
            src="/images/united.png"
            alt="United Airlines"
            className="mx-auto h-auto"
          />
          <img
            src="/images/qatar.png"
            alt="Qatar Airways"
            className="mx-auto h-auto"
          />
          <img
            src="/images/malaysiaairlines.png"
            alt="Malaysia Airlines"
            className="mx-auto h-auto"
          />
          <img
            src="/images/airfrance.png"
            alt="Air France"
            className="mx-auto h-auto"
          />
          <img
            src="/images/aircanada.png"
            alt="Air Canada"
            className="mx-auto h-auto"
          />
          <img
            src="/images/turkishairlines.png"
            alt="Turkish Airlines"
            className="mx-auto h-auto"
          />
          <img
            src="/images/hongkongairlines.png"
            alt="Hong Kong Airlines"
            className="mx-auto h-auto"
          />
          <img
            src="/images/chinasouthern.png"
            alt="China Southern Airlines"
            className="mx-auto h-auto"
          />
          <img
            src="/images/chinaeastern.png"
            alt="China Eastern Airlines"
            className="mx-auto h-auto"
          />
          <img
            src="/images/airchina.png"
            alt="Air China"
            className="mx-auto h-auto"
          />
          {/* Add more airline partners as needed */}
        </div>

        <h2
          className="mb-4 mt-14 text-2xl font-bold"
          style={{
            fontFamily: "Roboto, sans-serif",
            color: "#0a52a3",
            fontSize: "32px",
            marginBottom: "50px",
          }}
        >
          Đối tác khách sạn
        </h2>
        <div className="my-3 flex grid-cols-2 flex-wrap items-center gap-5 overflow-hidden md:grid md:grid-cols-9">
          <img
            src="/images/vinpearl.png"
            alt="Vinpearl"
            className="mx-auto h-auto"
          />
          <img
            src="/images/muongthanh.png"
            alt="Mường Thanh"
            className="mx-auto h-auto"
          />
          <img
            src="/images/furama.png"
            alt="Furama Resort"
            className="mx-auto h-auto"
          />
          <img
            src="/images/pullman.png"
            alt="Pullman"
            className="mx-auto h-auto"
          />
          <img
            src="/images/theanam.png"
            alt="The Anam"
            className="mx-auto h-auto"
          />
          <img
            src="/images/secretresort.png"
            alt="Secret Resort & Spa"
            className="mx-auto h-auto"
          />
          {/* Add more hotel partners as needed */}
        </div>
      </div>
      <div
        className="mt-14 w-full rounded-lg p-10"
        style={{ backgroundColor: "#e7eef6" }}
      >
        <h2
          className="mb-10 text-2xl font-bold"
          style={{ color: "#0a52a3", fontSize: "32px", textAlign: "center" }}
        >
          Tại sao chọn VEMAYBAY?
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="rounded-lg p-6">
            <img
              src="/images/icon-fast.png"
              alt="Chủ động"
              className="mx-auto mb-4 h-12"
            />
            <h3
              className="mb-2 text-xl font-semibold"
              style={{ color: "#0a52a3" }}
            >
              Chủ động, nhanh chóng, tiện lợi
            </h3>
            <p className="text-gray-600">
              Tự do lựa chọn hãng hàng không, giờ bay, ghế ngồi và các dịch vụ
              bổ sung. Thanh toán linh hoạt, nhanh chóng để bạn chủ động hoàn
              toàn trong hành trình.
            </p>
          </div>
          <div className="rounded-lg p-6">
            <img
              src="/images/icon-deals.png"
              alt="Hấp dẫn"
              className="mx-auto mb-4 h-12"
            />
            <h3
              className="mb-2 text-xl font-semibold"
              style={{ color: "#0a52a3" }}
            >
              Hàng ngàn đường bay, giá vé hấp dẫn
            </h3>
            <p className="text-gray-600">
              Kết nối bạn với hàng ngàn đường bay nội địa và quốc tế. Luôn cập
              nhật những ưu đãi, khuyến mãi hấp dẫn để bạn có được giá vé tốt
              nhất.
            </p>
          </div>
          <div className="rounded-lg p-6">
            <img
              src="/images/icon-support.png"
              alt="Hỗ trợ 24/7"
              className="mx-auto mb-4 h-12"
            />
            <h3
              className="mb-2 text-xl font-semibold"
              style={{ color: "#0a52a3" }}
            >
              Hỗ trợ khách hàng chuyên nghiệp 24/7
            </h3>
            <p className="text-gray-600">
              Đội ngũ hỗ trợ khách hàng chuyên nghiệp sẵn sàng giải đáp mọi thắc
              mắc và hỗ trợ bạn 24/7. Đặt vé máy bay chưa bao giờ dễ dàng và an
              tâm đến thế.
            </p>
          </div>
          <div className="rounded-lg p-6">
            <img
              src="/images/icon-experience.png"
              alt="Trải nghiệm"
              className="mx-auto mb-4 h-12"
            />
            <h3
              className="mb-2 text-xl font-semibold"
              style={{ color: "#0a52a3" }}
            >
              Không chỉ là vé máy bay, mà còn là trải nghiệm
            </h3>
            <p className="text-gray-600">
              Chúng tôi mang đến cho bạn nhiều hơn một tấm vé với các dịch vụ đi
              kèm như đặt phòng khách sạn, xe đưa đón, visa... và các bí kíp du
              lịch thông minh hữu ích.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
