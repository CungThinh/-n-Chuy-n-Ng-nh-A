'use client';

import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// Import the custom calendar icon with the correct path

export default function BookingDetailsPage() {
  const [passengerInfo, setPassengerInfo] = useState({
    lastName: '',
    firstName: '',
    gender: '',
    dob: null,
    nationality: 'Việt Nam',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    companyName: '',
    taxCode: '',
    contactTitle: '',
    contactLastName: '',
    contactFirstName: '',
    contactPhoneNumber: '',
    contactEmailAddress: '',
    countryCode: '+84'
  });
  const [isInvoiceInfoVisible, setIsInvoiceInfoVisible] = useState(false);
  const [isFlightDetailVisible, setIsFlightDetailVisible] = useState(false);

  const handleInputChange = (field, value) => {
    setPassengerInfo({
      ...passengerInfo,
      [field]: value,
    });
  };

  const handleToggleInvoiceInfo = () => {
    setIsInvoiceInfoVisible(!isInvoiceInfoVisible);
  };

  const handleToggleFlightDetail = () => {
    setIsFlightDetailVisible(!isFlightDetailVisible);
  };


  const handleBookingSubmit = () => {
    // Xử lý thông tin đặt vé (sẽ thêm code xử lý backend hoặc gửi thông tin lên server)
    console.log("Thông tin đặt vé:", passengerInfo);
  };

  return (
    <div>
      <div className="w-full bg-blue-900 text-white py-4 px-8 flex items-center justify-between relative" style={{ height: '150px' }}>
      </div>

      {/* Nội dung thông tin đặt vé và hành lý lấn lên header */}
      <div className="flex justify-center items-start -mt-20" style={{ backgroundColor: '#f0f0f0' }}>
        <div className="w-full max-w-7xl p-4 grid grid-cols-1 lg:grid-cols-3 gap-2 relative">
          <div className="lg:col-span-2">
            <div className="w-full bg-white p-6 rounded-lg shadow-md">
              <div className="bg-orange-100 p-3 rounded-md mb-4">
                <span className="text-orange-700 font-semibold">VEMAYBAY sẽ bảo vệ chuyến đi của bạn và giữ an toàn cho thông tin của bạn</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Hồ Chí Minh → Hà Nội</h2>
                  <p className="text-sm text-gray-500">T2, 07/10/2024</p>
                </div>
                <button className="text-orange-500 font-semibold underline">Đổi chuyến bay</button>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="bg-yellow-300 text-white px-2 py-1 rounded font-semibold">Chiều đi</span>
                    <p className="text-sm mt-2" style={{ color: '#000000' }}>Sân bay Tân Sơn Nhất - Sân bay Nội Bài</p>
                  </div>
                  <button onClick={handleToggleFlightDetail} className="text-sm text-gray-500 flex items-center">
                    Chi tiết <FaAngleDown className={isFlightDetailVisible ? 'transform rotate-180 ml-1' : 'ml-1'} />
                  </button>
                </div>
                <div className="flex items-center justify-around mt-4 relative">
                  <div className="flex flex-col items-center">
                    <p className="text-xl font-bold" style={{ color: '#000000', marginBottom: '4px' }}>06:00</p>
                    <p className="text-sm text-gray-600">SGN</p>
                  </div>
                  <div className="flex flex-col items-center mx-4">
                    <span className="text-sm text-gray-600">2g 10p</span>
                    <div className="border-t border-gray-400 w-16 mt-1 mb-1"></div>
                    <p className="text-xs text-gray-500">Bay thẳng</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-xl font-bold" style={{ color: '#000000', marginBottom: '4px' }}>08:10</p>
                    <p className="text-sm text-gray-600">HAN</p>
                  </div>
                </div>
                {isFlightDetailVisible && (
                  <div className="mt-4 bg-gray-100 p-4 rounded-lg" style={{ zIndex: 10, position: 'relative' }}>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-left">
                      <p className="text-sm text-gray-500 mb-2">Ngày: T2, 07/10/2024</p>
                      <div className="flex items-center">
                        <p className="text-lg font-semibold text-gray-800 mr-4">14:25</p>
                        <div className="border-l border-gray-400 h-12 mx-2"></div>
                        <p className="text-sm text-gray-500">Sân bay Tân Sơn Nhất (SGN)</p>
                      </div>
                      <div className="flex items-center mt-4">
                        <p className="text-lg font-semibold text-gray-800 mr-4">16:30</p>
                        <div className="border-l border-gray-400 h-12 mx-2"></div>
                        <p className="text-sm text-gray-500">Sân bay Nội Bài (HAN)</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">Hãng hàng không: Vietjet Air - VJ120</p>
                      <p className="text-sm text-gray-800">Loại máy bay: Airbus A321</p>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-800 font-semibold">Hạng ghế: 321B</span>
                    </div>
                  </div>
                </div>
                )}
              </div>
            </div>
          </div>
          {/* Thông tin hành lý */}
          <div className="lg:col-span-1 ml-4">
            <div className="bg-white p-4 shadow-md" style={{ borderRadius: '20px' }}>
              <h2 className="text-lg font-bold mb-4" style={{ color: '#000000' }}>Thông tin hành lý</h2>
              <div className="mb-2">
                <h3 className="font-bold" style={{ color: '#000000' }}>Người lớn (Hành khách 1)</h3>
                <ul className="list-disc pl-5">
                  <li className="text-sm" style={{ color: '#000000' }}>Hành lý ký gửi: 1 kiện</li>
                  <li className="text-sm" style={{ color: '#000000' }}>Hành lý xách tay: 1 kiện</li>
                </ul>
              </div>
              <div className="mb-2">
                <h3 className="font-bold" style={{ color: '#000000' }}>Trẻ em (Hành khách 2, Hành khách 3)</h3>
                <p className="text-sm" style={{ color: '#000000' }}>Hạn mức hành lý cho mỗi trẻ em:</p>
                <ul className="list-disc pl-5">
                  <li className="text-sm" style={{ color: '#000000' }}>Hành lý ký gửi: 1 kiện</li>
                  <li className="text-sm" style={{ color: '#000000' }}>Hành lý xách tay: 1 kiện</li>
                </ul>
              </div>
              <h2 className="text-lg font-bold mb-4" style={{ color: '#000000' }}>Chi tiết giá</h2>
              <div className="text-sm" style={{ color: '#000000' }}>
                <p>Vé máy bay (1 người lớn, 2 trẻ em): 4,912,000 đ</p>
                <p>Giá vé: 2,090,000 đ</p>
                <p>Thuế và phí: 2,822,000 đ</p>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 relative">
                <div className="absolute -left-9 top-4 transform -translate-y-1/2 w-10 h-10 rounded-full" style={{ backgroundColor: '#f0f0f0' }}></div>
                <div className="absolute -right-9 top-4 transform -translate-y-1/2 w-10 h-10 rounded-full" style={{ backgroundColor: '#f0f0f0' }}></div>
                <div className="w-full border-t border-dashed border-gray-500 mx-4"></div>
              </div>
              <div className="flex items-center justify-between mt-2" style={{ marginTop: '30px' }}>
                <h2 className="text-xl font-bold" style={{ color: '#000000' }}>Tổng</h2>
                <h2 className="text-xl font-bold" style={{ color: '#000000' }}>4,912,000 đ</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thông tin hành khách */}
      <div className="flex justify-center items-start pt-0" style={{ backgroundColor: '#f0f0f0', marginTop: '-50px' }}>
        <div className="w-full max-w-7xl p-4 grid grid-cols-1 lg:grid-cols-3 gap-2">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-4">Hành khách 1 (Người lớn)</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input
                  type="text"
                  placeholder="Họ *"
                  value={passengerInfo.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  style={{ color: '#000000' }}
                />
                <input
                  type="text"
                  placeholder="Tên đệm và tên *"
                  value={passengerInfo.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  style={{ color: '#000000' }}
                />
                <div className="relative">
                  <img  alt="Calendar Icon" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <DatePicker
                    selected={passengerInfo.dob}
                    onChange={(date) => handleInputChange('dob', date)}
                    placeholderText="dd/mm/yyyy"
                    dateFormat="dd/MM/yyyy"
                    className="pl-10 p-4 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    style={{ color: '#000000' }}
                  />
                </div>
                <div className="relative">
                  <select
                    value={passengerInfo.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
                    style={{ color: '#000000' }}
                  >
                    <option value="">Giới tính *</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                  </select>
                  <FaAngleDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
                <div className="relative">
                  <input
                    list="nationality-list"
                    type="text"
                    placeholder="Quốc tịch *"
                    value={passengerInfo.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    style={{ color: '#000000' }}
                  />
                  <FaAngleDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                  <datalist id="nationality-list">
                    {[
                      "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan", "Sudan, South", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
                    ].map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Thông tin liên hệ */}
              <h2 className="text-lg font-bold mt-8 mb-4" style={{ color: '#000000' }}>Thông tin liên hệ</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="relative md:col-span-1">
                  <select
                    value={passengerInfo.contactTitle}
                    onChange={(e) => handleInputChange('contactTitle', e.target.value)}
                    className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
                    style={{ color: '#000000' }}
                  >
                    <option value="">Danh xưng *</option>
                    <option value="mr">Ông</option>
                    <option value="mrs">Bà</option>
                    <option value="ms">Cô</option>
                  </select>
                  <FaAngleDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
                <input
                  type="text"
                  placeholder="Họ *"
                  value={passengerInfo.contactLastName}
                  onChange={(e) => handleInputChange('contactLastName', e.target.value)}
                  className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent md:col-span-1"
                  style={{ color: '#000000' }}
                />
                <input
                  type="text"
                  placeholder="Tên đệm và tên *"
                  value={passengerInfo.contactFirstName}
                  onChange={(e) => handleInputChange('contactFirstName', e.target.value)}
                  className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent md:col-span-2"
                  style={{ color: '#000000' }}
                />
                <div className="flex items-center gap-2 md:col-span-4">
                  <select
                    value={passengerInfo.countryCode}
                    onChange={(e) => handleInputChange('countryCode', e.target.value)}
                    className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
                    style={{ color: '#000000' }}
                  >
                    <option value="+84">Việt Nam (+84)</option>
                    <option value="+1">United States (+1)</option>
                    <option value="+66">Thailand (+66)</option>
                    <option value="+93">Afghanistan (+93)</option>
                    <option value="+355">Albania (+355)</option>
                    {/* Thêm các quốc gia khác ở đây */}
                  </select>
                  <input
                    type="text"
                    placeholder="Nhập số điện thoại *"
                    value={passengerInfo.contactPhoneNumber}
                    onChange={(e) => handleInputChange('contactPhoneNumber', e.target.value)}
                    className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    style={{ color: '#000000' }}
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email *"
                  value={passengerInfo.contactEmailAddress}
                  onChange={(e) => handleInputChange('contactEmailAddress', e.target.value)}
                  className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent md:col-span-4"
                  style={{ color: '#000000' }}
                />
              </div>

              {/* Thông tin liên hệ */}
              <h2 className="text-lg font-bold mt-8 mb-4" style={{ color: '#000000' }}>Thông tin liên hệ</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="relative md:col-span-1">
                  <select
                    value={passengerInfo.contactTitle}
                    onChange={(e) => handleInputChange('contactTitle', e.target.value)}
                    className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
                    style={{ color: '#000000' }}
                  >
                    <option value="">Danh xưng *</option>
                    <option value="mr">Ông</option>
                    <option value="mrs">Bà</option>
                    <option value="ms">Cô</option>
                  </select>
                  <FaAngleDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
                <input
                  type="text"
                  placeholder="Họ *"
                  value={passengerInfo.contactLastName}
                  onChange={(e) => handleInputChange('contactLastName', e.target.value)}
                  className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent md:col-span-1"
                  style={{ color: '#000000' }}
                />
                <input
                  type="text"
                  placeholder="Tên đệm và tên *"
                  value={passengerInfo.contactFirstName}
                  onChange={(e) => handleInputChange('contactFirstName', e.target.value)}
                  className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent md:col-span-2"
                  style={{ color: '#000000' }}
                />
                <div className="flex items-center gap-2 md:col-span-4">
                  <select
                    value={passengerInfo.countryCode}
                    onChange={(e) => handleInputChange('countryCode', e.target.value)}
                    className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
                    style={{ color: '#000000' }}
                  >
                    <option value="+84">Việt Nam (+84)</option>
                    <option value="+1">United States (+1)</option>
                    <option value="+66">Thailand (+66)</option>
                    <option value="+93">Afghanistan (+93)</option>
                    <option value="+355">Albania (+355)</option>
                    {/* Thêm các quốc gia khác ở đây */}
                  </select>
                  <input
                    type="text"
                    placeholder="Nhập số điện thoại *"
                    value={passengerInfo.contactPhoneNumber}
                    onChange={(e) => handleInputChange('contactPhoneNumber', e.target.value)}
                    className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    style={{ color: '#000000' }}
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email *"
                  value={passengerInfo.contactEmailAddress}
                  onChange={(e) => handleInputChange('contactEmailAddress', e.target.value)}
                  className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent md:col-span-4"
                  style={{ color: '#000000' }}
                />
              </div>

              {/* Thông tin xuất hóa đơn */}
              <div className="flex items-center justify-between mt-8">
                <h2 className="text-lg font-bold" style={{ color: '#000000' }}>Thông tin xuất hóa đơn</h2>
                <button onClick={handleToggleInvoiceInfo} className={`focus:outline-none w-16 h-8 rounded-full relative transition-colors duration-300 ${isInvoiceInfoVisible ? 'bg-orange-500' : 'bg-gray-300'}`}>
                  <div className={`absolute top-1/2 left-1 transform -translate-y-1/2 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-500 ${isInvoiceInfoVisible ? 'translate-x-8 bg-orange-500' : ''}`}></div>
                </button>
              </div>
              {isInvoiceInfoVisible && (
                <div>
                  <div className="grid grid-cols-1 gap-2 mt-4">
                    <input
                      type="text"
                      placeholder="Tên công ty"
                      value={passengerInfo.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="p-3 border rounded-lg w-full"
                      style={{ color: '#000000' }}
                    />
                    <input
                      type="text"
                      placeholder="Mã số thuế"
                      value={passengerInfo.taxCode}
                      onChange={(e) => handleInputChange('taxCode', e.target.value)}
                      className="p-3 border rounded-lg w-full"
                      style={{ color: '#000000' }}
                    />
                    <input
                      type="text"
                      placeholder="Địa chỉ"
                      value={passengerInfo.companyAddress}
                      onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                      className="p-3 border rounded-lg w-full"
                      style={{ color: '#000000' }}
                    />
                  </div>
                  <h2 className="text-lg font-bold mt-8 mb-4" style={{ color: '#000000' }}>Thông tin người nhận</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <input
                      type="text"
                      placeholder="Họ và tên *"
                      value={passengerInfo.recipientName}
                      onChange={(e) => handleInputChange('recipientName', e.target.value)}
                      className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      style={{ color: '#000000' }}
                    />
                    <input
                      type="text"
                      placeholder="Số điện thoại *"
                      value={passengerInfo.recipientPhone}
                      onChange={(e) => handleInputChange('recipientPhone', e.target.value)}
                      className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      style={{ color: '#000000' }}
                    />
                    <input
                      type="email"
                      placeholder="Email *"
                      value={passengerInfo.recipientEmail}
                      onChange={(e) => handleInputChange('recipientEmail', e.target.value)}
                      className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      style={{ color: '#000000' }}
                    />
                    <input
                      type="text"
                      placeholder="Địa chỉ *"
                      value={passengerInfo.recipientAddress}
                      onChange={(e) => handleInputChange('recipientAddress', e.target.value)}
                      className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent md:col-span-3"
                      style={{ color: '#000000' }}
                    />
                    <textarea
                      placeholder="Ghi chú"
                      value={passengerInfo.recipientNote}
                      onChange={(e) => handleInputChange('recipientNote', e.target.value)}
                      className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent md:col-span-3"
                      style={{ color: '#000000' }}
                    />
                  </div>
                </div>
              )}

              {/* Nút tiếp tục */}
              <div className="flex justify-end mt-8">
                <button
                  onClick={handleBookingSubmit}
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg"
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}