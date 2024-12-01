import { Check } from "lucide-react";
import Image from "next/image";
const PaymentMethodSelector = ({ selectedMethod, onMethodSelect }) => {
  const paymentMethods = [
    {
      id: "stripe",
      name: "Stripe",
      description: "Thanh toán an toàn qua thẻ tín dụng/ghi nợ",
      icon: (
        <Image
          src="/icons/stripe.svg" // Đường dẫn đến icon MoMo trong thư mục public
          alt="MoMo Icon"
          width={32}
          height={32}
        />
      ),
    },
    {
      id: "momo",
      name: "MoMo",
      description: "Thanh toán nhanh chóng qua ví điện tử MoMo",
      icon: (
        <Image
          src="/icons/momo_square_pinkbg.svg" // Đường dẫn đến icon MoMo trong thư mục public
          alt="MoMo Icon"
          width={32}
          height={32}
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
            className={`relative flex w-full items-center rounded-lg border-2 p-4 transition-all hover:border-blue-500 ${
              selectedMethod === method.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="mr-4">{method.icon}</div>
            <div className="flex-1 text-left">
              <p className="font-semibold">{method.name}</p>
              <p className="text-sm text-gray-500">{method.description}</p>
            </div>
            <div
              className={`ml-4 flex size-6 items-center justify-center rounded-full border-2 ${
                selectedMethod === method.id
                  ? "border-blue-500 bg-blue-500 text-white"
                  : "border-gray-300"
              }`}
            >
              {selectedMethod === method.id && <Check className="size-4" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
