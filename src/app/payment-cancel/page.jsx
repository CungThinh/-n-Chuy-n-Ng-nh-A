'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentCancel() {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Lấy session_id từ URL khi người dùng quay lại từ Stripe
    const searchParams = new URLSearchParams(window.location.search);
    const session_id = searchParams.get('session_id');

    if (session_id) {
      // Gọi API để cập nhật trạng thái thanh toán là "Incomplete"
      const cancelPayment = async () => {
        try {
          const response = await fetch('/api/update-payment-status', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ session_id }),
          });

          if (response.ok) {
            setLoading(false);
          } else {
            const errorData = await response.json();
            setErrorMessage(errorData.error || 'Có lỗi xảy ra khi cập nhật trạng thái thanh toán.');
            setLoading(false);
          }
        } catch (error) {
          setErrorMessage('Đã xảy ra lỗi khi kết nối đến hệ thống thanh toán.');
          setLoading(false);
        }
      };

      cancelPayment();
    } else {
      setErrorMessage('Không tìm thấy session_id trong URL.');
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {loading ? (
        <p>Đang xử lý yêu cầu hủy thanh toán...</p>
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <div className="text-center">
          <h1 className="text-xl font-bold mb-4">Đã hủy phiên thanh toán</h1>
          <p className="mb-6">Phiên thanh toán của bạn đã bị hủy. Bạn có thể thử lại sau.</p>
          <button
            onClick={() => router.push('/')} // Chuyển về trang chủ hoặc trang sửa thông tin
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Quay về trang chủ
          </button>
        </div>
      )}
    </div>
  );
}
