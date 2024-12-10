import React from "react";

export default function TicketInfo({
  flightType,
  flightDetails,
  totalPrice,
  passengersInfo,
}) {
  // Tách hành khách theo loại
  const adultPassengers =
    passengersInfo?.filter((p) => p.type === "adult") || [];
  const childPassengers =
    passengersInfo?.filter((p) => p.type === "child") || [];
  const infantPassengers =
    passengersInfo?.filter((p) => p.type === "infant") || [];

  // Tính tổng giá vé
  const oneWayTotal = flightDetails.outbound?.price || 0;
  const returnTotal = flightType === "1" ? flightDetails.return?.price || 0 : 0;
  const finalTotal = oneWayTotal + returnTotal;

  return (
    <div className="mx-1 rounded-2xl bg-white p-4 shadow-md">
      <h2 className="mb-4 text-lg font-bold text-black">Thông tin hành lý</h2>

      {/* Người lớn */}
      {adultPassengers.length > 0 && (
        <div className="mb-2">
          <h3 className="font-bold text-black">
            Người lớn (Hành khách{" "}
            {adultPassengers.map((_, i) => i + 1).join(", ")})
          </h3>
          <ul className="list-none pl-0">
            {/* Hành lý ký gửi */}
            <li className="mb-1 flex items-center justify-between text-sm text-black">
              <div className="flex items-center">
                <svg
                  className="mr-2"
                  height="16"
                  viewBox="0 0 640 512"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 32C0 14.3 14.3 0 32 0L48 0c44.2 0 80 35.8 80 80l0 288c0 8.8 7.2 16 16 16l464 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-66.7 0c1.8 5 2.7 10.4 2.7 16c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-5.6 1-11 2.7-16l-197.5 0c1.8 5 2.7 10.4 2.7 16c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-5.6 1-11 2.7-16L144 448c-44.2 0-80-35.8-80-80L64 80c0-8.8-7.2-16-16-16L32 64C14.3 64 0 49.7 0 32zM432 96l0-40c0-4.4-3.6-8-8-8l-80 0c-4.4 0-8 3.6-8 8l0 40 96 0zM288 96l0-40c0-30.9 25.1-56 56-56l80 0c30.9 0 56 25.1 56 56l0 40 0 224-192 0 0-224zM512 320l0-224 16 0c26.5 0 48 21.5 48 48l0 128c0 26.5-21.5 48-48 48l-16 0zM240 96l16 0 0 224-16 0c-26.5 0-48-21.5-48-48l0-128c0-26.5 21.5-48 48-48z"
                    fill="#ffa300"
                  />
                </svg>
                <span>Hành lý ký gửi</span>
              </div>
              <div className="flex items-center">
                <span>1 kiện</span>
                <div className="group relative ml-2">
                  <svg
                    height="16"
                    viewBox="0 0 512 512"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
                      fill="#999999"
                    />
                  </svg>
                  <div className="absolute left-full top-1/2 z-10 ml-2 w-48 -translate-y-1/2 rounded-lg bg-gray-800 p-2 text-center text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                    Hành lý miễn cước: 1 kiện x 20kg
                  </div>
                </div>
              </div>
            </li>

            {/* Hành lý xách tay */}
            <li className="mb-1 flex items-center justify-between text-sm text-black">
              <div className="flex items-center">
                <svg
                  className="mr-2"
                  height="16"
                  viewBox="0 0 640 512"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 32C0 14.3 14.3 0 32 0L48 0c44.2 0 80 35.8 80 80l0 288c0 8.8 7.2 16 16 16l464 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-66.7 0c1.8 5 2.7 10.4 2.7 16c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-5.6 1-11 2.7-16l-197.5 0c1.8 5 2.7 10.4 2.7 16c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-5.6 1-11 2.7-16L144 448c-44.2 0-80-35.8-80-80L64 80c0-8.8-7.2-16-16-16L32 64C14.3 64 0 49.7 0 32zM432 96l0-40c0-4.4-3.6-8-8-8l-80 0c-4.4 0-8 3.6-8 8l0 40 96 0zM288 96l0-40c0-30.9 25.1-56 56-56l80 0c30.9 0 56 25.1 56 56l0 40 0 224-192 0 0-224zM512 320l0-224 16 0c26.5 0 48 21.5 48 48l0 128c0 26.5-21.5 48-48 48l-16 0zM240 96l16 0 0 224-16 0c-26.5 0-48-21.5-48-48l0-128c0-26.5 21.5-48 48-48z"
                    fill="#ffa300"
                  />
                </svg>
                <span>Hành lý xách tay</span>
              </div>
              <div className="flex items-center">
                <span>1 kiện</span>
                <div className="group relative ml-2">
                  <svg
                    height="16"
                    viewBox="0 0 512 512"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
                      fill="#999999"
                    />
                  </svg>
                  <div className="absolute left-full top-1/2 z-10 ml-2 w-48 -translate-y-1/2 rounded-lg bg-gray-800 p-2 text-center text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                    Hành lý xách tay: 1 kiện x 7kg
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      )}

      {/* Trẻ em/Em bé */}
      {(childPassengers.length > 0 || infantPassengers.length > 0) && (
        <div className="mb-2">
          <h3 className="font-bold text-black">
            Trẻ em/Em bé (Hành khách{" "}
            {[...childPassengers, ...infantPassengers]
              .map((_, i) => i + 1 + adultPassengers.length)
              .join(", ")}
            )
          </h3>
          <p className="text-sm text-black">Hạn mức hành lý cho mỗi trẻ em:</p>
          <ul className="list-disc pl-5">
            <li className="text-sm text-black">Hành lý ký gửi: 1 kiện</li>
            <li className="text-sm text-black">Hành lý xách tay: 1 kiện</li>
          </ul>
        </div>
      )}

      {/* Chi tiết giá */}
      <h2 className="mb-1 text-lg font-bold text-black">Chi tiết giá</h2>
      <div className="text-sm text-black">
        {/* Giá vé tổng cho tất cả hành khách */}
        <div className="flex justify-between">
          <p>
            Hành khách ({adultPassengers.length} người lớn
            {childPassengers.length ? `, ${childPassengers.length} trẻ em` : ""}
            {infantPassengers.length
              ? `, ${infantPassengers.length} em bé`
              : ""}
            )
          </p>
          <p>{flightDetails.outbound?.price.toLocaleString()} đ</p>
        </div>

        {/* Giá vé chiều đi */}
        {flightDetails.outbound && (
          <div className="flex justify-between text-gray-500">
            <p>Giá vé chiều đi</p>
            <p>{flightDetails.outbound.price.toLocaleString()} đ</p>
          </div>
        )}

        {/* Giá vé chiều về - chỉ với vé khứ hồi */}
        {flightType === "1" && flightDetails.return && (
          <div className="flex justify-between text-gray-500">
            <p>Giá vé chiều về</p>
            <p>{flightDetails.return.price.toLocaleString()} đ</p>
          </div>
        )}

        {/* Thuế và phí */}
        <div className="flex justify-between text-gray-500">
          <p>Thuế và phí</p>
          <p>Không có</p>
        </div>
      </div>

      {/* Đường gạch ngang */}
      <div className="relative mt-4 flex items-center justify-between pt-4">
        <div className="absolute -left-9 top-4 size-10 -translate-y-1/2 rounded-full bg-gray-100" />
        <div className="absolute -right-9 top-4 size-10 -translate-y-1/2 rounded-full bg-gray-100" />
        <div className="mx-4 w-full border-t border-dashed border-gray-500" />
      </div>

      {/* Tổng giá */}
      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-xl font-bold text-black">Tổng Giá:</h2>
        <h2 className="text-xl font-bold text-black">
          <span className="text-red-500">{finalTotal.toLocaleString()} đ</span>
        </h2>
      </div>
    </div>
  );
}
