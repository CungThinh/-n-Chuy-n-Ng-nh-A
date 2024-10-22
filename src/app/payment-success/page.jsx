'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PaymentSuccess() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-green-500 mb-4">
          Thanh toán thành công!
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Cảm ơn bạn đã thanh toán. Bạn có thể quay về trang chủ.
        </p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Quay về trang chủ
        </button>
      </div>
    </div>
  );
}
