import { Check } from "lucide-react";
import Image from "next/image";

const PaymentMethodSelector = ({ selectedMethod, onMethodSelect }) => {
  const paymentMethods = [
    {
      id: "stripe",
      name: "Thẻ tín dụng/ghi nợ",
      description: "Thanh toán an toàn qua Visa, Master, JCB",
      icon: (
        <Image
          src="/icons/stripe.svg" // Đường dẫn đến icon MoMo trong thư mục public
          alt="MoMo Icon"
          width={32}
          height={32}
          priority
        />
      ),
    },
    {
      id: "momo",
      name: "Ví MoMo",
      description: "Thanh toán nhanh chóng qua ví điện tử MoMo",
      icon: (
        <Image
          src="/icons/momo_square_pinkbg.svg"
          alt="MoMo"
          width={32}
          height={32}
          priority
        />
      ),
    },
    {
      id: "stripe_qr",
      name: "QR Code",
      description: "Quét mã QR để thanh toán qua ứng dụng ngân hàng",
      icon: (
        <Image
          src="/icons/qr-icon.png"
          alt="QR Code"
          width={32}
          height={32}
          priority
        />
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
            className={`relative flex w-full items-center rounded-lg border-2 p-4 transition-all hover:bg-gray-50 ${
              selectedMethod === method.id
                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="mr-4 flex size-12 items-center justify-center rounded-lg bg-white p-2 shadow-sm">
              {method.icon}
            </div>

            <div className="flex-1 text-left">
              <p className="font-semibold text-gray-900">{method.name}</p>
              <p className="text-sm text-gray-500">{method.description}</p>
            </div>

            <div
              className={`ml-4 flex size-6 items-center justify-center rounded-full border-2 transition-colors ${
                selectedMethod === method.id
                  ? "border-blue-500 bg-blue-500 text-white"
                  : "border-gray-300"
              }`}
            >
              {selectedMethod === method.id && (
                <Check className="animate-appear size-4" />
              )}
            </div>

            {selectedMethod === method.id && (
              <div className="animate-appear absolute -inset-px -z-10 rounded-lg bg-blue-50" />
            )}
          </button>
        ))}
      </div>

      {/* Optional: Payment method details */}
      {selectedMethod && (
        <div className="mt-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          {selectedMethod === "stripe" && (
            <p>
              Hỗ trợ thanh toán qua các loại thẻ Visa, Master Card, JCB và
              American Express
            </p>
          )}
          {selectedMethod === "momo" && (
            <p>
              Vui lòng đảm bảo bạn đã cài đặt và đăng nhập ứng dụng MoMo trên
              điện thoại
            </p>
          )}
          {selectedMethod === "stripe_qr" && (
            <p>
              Sử dụng ứng dụng ngân hàng hỗ trợ quét mã QR để thanh toán nhanh
              chóng và an toàn
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentMethodSelector;
