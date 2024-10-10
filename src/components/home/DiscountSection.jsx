import React from 'react';

export default function DiscountSection() {
  return (
    <>
        <div className="mt-14 w-full p-10 rounded-lg" style={{ backgroundImage: `url('/images/bg30.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="bg-opacity-75 p-10 rounded-lg">
            <h2 className="text-3xl font-bold mb-4 text-center" style={{ color: '#fff' }}>Cơ hội giảm giá lên đến 30%</h2>
            <p className="text-gray-700 mb-6 text-center">Hãy đăng ký ngay để nhận ưu đãi bất ngờ từ Vemaybay.vn nhé!</p>
            <div className="flex items-center justify-center">
            <input type="email" placeholder="Nhập email" className="flex-grow max-w-[500px] p-4 rounded-l-lg focus:outline-none border border-gray-300" />
            <button className="bg-orange-500 text-white px-6 py-4 rounded-r-lg">Gửi ngay</button>
            </div>
        </div>
        </div>
    </>
  );
}