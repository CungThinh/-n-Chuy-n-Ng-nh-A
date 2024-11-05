export default function TicketInfo({ flightType, flightDetails, totalPrice }) {
  return (
    <div
      className="mx-1 bg-white p-4 shadow-md"
      style={{ borderRadius: "20px" }}
    >
      <h2 className="mb-4 text-lg font-bold" style={{ color: "#000000" }}>
        Thông tin hành lý
      </h2>
      <div className="mb-2">
        <h3 className="font-bold" style={{ color: "#000000" }}>
          Người lớn (Hành khách 1)
        </h3>
        <ul className="list-none pl-0">
          <li
            className="mb-1 flex items-center justify-between text-sm"
            style={{ color: "#000000" }}
          >
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
              <svg
                className="ml-2"
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
            </div>
          </li>

          <li
            className="mb-1 flex items-center justify-between text-sm"
            style={{ color: "#000000" }}
          >
            <div className="flex items-center">
              <svg
                className="mr-2"
                height="16"
                viewBox="0 0 576 512"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M432 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM347.7 200.5c1-.4 1.9-.8 2.9-1.2l-16.9 63.5c-5.6 21.1-.1 43.6 14.7 59.7l70.7 77.1 22 88.1c4.3 17.1 21.7 27.6 38.8 23.3s27.6-21.7 23.3-38.8l-23-92.1c-1.9-7.8-5.8-14.9-11.2-20.8l-49.5-54 19.3-65.5 9.6 23c4.4 10.6 12.5 19.3 22.8 24.5l26.7 13.3c15.8 7.9 35 1.5 42.9-14.3s1.5-35-14.3-42.9L505 232.7l-15.3-36.8C472.5 154.8 432.3 128 387.7 128c-22.8 0-45.3 4.8-66.1 14l-8 3.5c-32.9 14.6-58.1 42.4-69.4 76.5l-2.6 7.8c-5.6 16.8 3.5 34.9 20.2 40.5s34.9-3.5 40.5-20.2l2.6-7.8c5.7-17.1 18.3-30.9 34.7-38.2l8-3.5zm-30 135.1l-25 62.4-59.4 59.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L340.3 441c4.6-4.6 8.2-10.1 10.6-16.1l14.5-36.2-40.7-44.4c-2.5-2.7-4.8-5.6-7-8.6zM256 274.1c-7.7-4.4-17.4-1.8-21.9 5.9l-32 55.4L147.7 304c-15.3-8.8-34.9-3.6-43.7 11.7L40 426.6c-8.8 15.3-3.6 34.9 11.7 43.7l55.4 32c15.3 8.8 34.9 3.6 43.7-11.7l64-110.9c1.5-2.6 2.6-5.2 3.3-8L261.9 296c4.4-7.7 1.8-17.4-5.9-21.9z"
                  fill="#ffa300"
                />
              </svg>
              <span>Hành lý xách tay</span>
            </div>
            <div className="flex items-center">
              <span>1 kiện</span>
              <svg
                className="ml-2"
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
            </div>
          </li>
        </ul>
      </div>
      <div className="mb-2">
        <h3 className="font-bold" style={{ color: "#000000" }}>
          Trẻ em (Hành khách 2, Hành khách 3)
        </h3>
        <p className="text-sm" style={{ color: "#000000" }}>
          Hạn mức hành lý cho mỗi trẻ em:
        </p>
        <ul className="list-disc pl-5">
          <li className="text-sm" style={{ color: "#000000" }}>
            Hành lý ký gửi: 1 kiện
          </li>
          <li className="text-sm" style={{ color: "#000000" }}>
            Hành lý xách tay: 1 kiện
          </li>
        </ul>
      </div>
      <h2 className="mb-1 text-lg font-bold" style={{ color: "#000000" }}>
        Chi tiết giá
      </h2>
      <div className="text-sm" style={{ color: "#000000" }}>
        {flightType === "1" ? (
          <>
            {flightDetails.outbound && (
              <div className="flex justify-between">
                <p>Giá vé chiều đi</p>
                <p>
                  {flightDetails.outbound.price?.toLocaleString() || "Không có"}{" "}
                  .đ
                </p>
              </div>
            )}
            {flightDetails.return && (
              <div className="flex justify-between">
                <p>Giá vé chiều về</p>
                <p>
                  {flightDetails.return.price?.toLocaleString() || "Không có"}{" "}
                  .đ
                </p>
              </div>
            )}
            {flightDetails.outbound && flightDetails.return && (
              <div className="flex justify-between">
                <p>Thuế và phí</p>
                <p>Không có</p>
              </div>
            )}
          </>
        ) : (
          <>
            {flightDetails.outbound && (
              <div className="flex justify-between">
                <p>Giá vé chiều đi</p>
                <p>
                  {flightDetails.outbound.price?.toLocaleString() || "Không có"}{" "}
                  .đ
                </p>
              </div>
            )}
            <div className="flex justify-between">
              <p>Thuế và phí</p>
              <p>Không có</p>
            </div>
          </>
        )}
      </div>
      <div className="relative mt-4 flex items-center justify-between pt-4">
        <div
          className="absolute -left-9 top-4 size-10 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: "#f0f0f0" }}
        />
        <div
          className="absolute -right-9 top-4 size-10 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: "#f0f0f0" }}
        />
        <div className="mx-4 w-full border-t border-dashed border-gray-500" />
      </div>
      <div
        className="mt-2 flex items-center justify-between"
        style={{ marginTop: "30px" }}
      >
        <h2 className="text-xl font-bold" style={{ color: "#000000" }}>
          Tổng Giá:
        </h2>
        <h2 className="text-xl font-bold" style={{ color: "#000000" }}>
          {" "}
          <span className="text-red-500">{totalPrice.toLocaleString()} .đ</span>
        </h2>
      </div>
    </div>
  );
}
