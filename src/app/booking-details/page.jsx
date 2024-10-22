'use client';

import { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import DatePicker from 'react-datepicker';
import { FaAngleDown } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';

export default function BookingDetailsPage() {
  const router = useRouter();
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
  const [errorMessage, setErrorMessage] = useState(''); // Thêm biến để lưu trữ thông báo lỗi

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

  const validateForm = () => {
    // Kiểm tra các trường bắt buộc
    if (!passengerInfo.lastName || !passengerInfo.firstName || !passengerInfo.gender || !passengerInfo.dob || !passengerInfo.contactPhoneNumber || !passengerInfo.contactEmailAddress) {
      return false;
    }
    return true;
  };

  const handleBookingSubmit = async () => {
    try {
      // Xác định loại vé và hãng bay
      const flightTypeLabel = flightType === '1' ? 'Khứ hồi' : 'Một chiều';
      const airlineName = flightDetails.outbound?.flights[0].airline || "Không xác định";
      const airlineLogo = flightDetails.outbound?.flights[0].airline_logo || "https://via.placeholder.com/150";
  
      // Gửi thông tin tổng giá, chi tiết vé và thông tin hành khách đến API
      console.log('Total Price:', totalPrice, 'Flight Type:', flightTypeLabel, 'Airline:', airlineName);
  
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalPrice,
          flightType: flightTypeLabel,
          airlineName,
          airlineLogo,
          passengerInfo: { // Gửi thêm thông tin hành khách
            firstName: passengerInfo.firstName,
            lastName: passengerInfo.lastName,
            email: passengerInfo.contactEmailAddress,
            phone: passengerInfo.contactPhoneNumber,
            gender: passengerInfo.gender,
            dob: passengerInfo.dob,
            nationality: passengerInfo.nationality,
          },
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        window.location.href = result.url;
      } else {
        setErrorMessage(result.error || 'Có lỗi xảy ra trong quá trình xử lý thanh toán');
      }
    } catch (error) {
      setErrorMessage('Đã xảy ra lỗi khi kết nối đến hệ thống thanh toán');
      console.error(error);
    }
  };
  
  


  const [flightDetails, setFlightDetails] = useState({ outbound: null, return: null });
  const [isOutboundDetailVisible, setIsOutboundDetailVisible] = useState(false);
  const [isReturnDetailVisible, setIsReturnDetailVisible] = useState(false);
  const [flightType, setFlightType] = useState('1'); // Mặc định là khứ hồi (1: khứ hồi, 2: một chiều)
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Lấy thông tin chuyến bay từ localStorage
    const outboundFlight = localStorage.getItem('selectedOutboundFlight');
    const returnFlight = localStorage.getItem('selectedReturnFlight');
    const storedFlightType = localStorage.getItem('flightType'); // Lấy loại vé từ localStorage
    const storedTotalPrice = localStorage.getItem('totalPrice');

    if (outboundFlight) {
      setFlightDetails({
        outbound: JSON.parse(outboundFlight),
        return: returnFlight ? JSON.parse(returnFlight) : null,
      });
    }

    if (storedTotalPrice) {
      setTotalPrice(JSON.parse(storedTotalPrice));
    }

    setFlightType(storedFlightType || '1'); // Cập nhật loại vé (1: khứ hồi, 2: một chiều)
  }, []);

  const handleToggleOutboundDetail = () => {
    setIsOutboundDetailVisible(!isOutboundDetailVisible);
  };

  const handleToggleReturnDetail = () => {
    setIsReturnDetailVisible(!isReturnDetailVisible);
  };

  function formatDuration(durationInMinutes) {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours}g ${minutes}p`;
  }

  return (
    <div>
      {/* Phần trên cùng của trang */}
      <div className="w-full text-white py-4 px-8 flex items-center justify-between relative" style={{ height: '150px', backgroundColor: '#00264e' }}>
        {/* Bạn có thể thêm logo hoặc thông tin khác ở đây */}
      </div>

      <div className="flex justify-center items-start -mt-20" style={{ backgroundColor: '#f0f0f0' }}>
        <div className="w-full max-w-7xl p-4 grid grid-cols-1 lg:grid-cols-3 gap-4 relative">
          {/* Phần nội dung chính, thông tin hành khách, thông tin liên hệ */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md mb-4">
              {/* Nội dung chính của trang */}
              <div className="bg-orange-100 p-3 rounded-md mb-4 flex items-center">
                <img src="./images/icons8-protect-96.png" alt="" className="w-12 h-12 mr-3" />
                <span className="text-orange-700 font-semibold">VEMAYBAY sẽ bảo vệ chuyến đi của bạn và giữ an toàn cho thông tin của bạn</span>
              </div>


              {/* Hiển thị thông tin chiều đi */}
              {flightDetails.outbound && (
                <div className="relative bg-white p-6 rounded-lg shadow-md mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="bg-yellow-400 text-white px-3 py-1 rounded font-semibold mr-3">Chiều đi</span>
                      <h2 className="text-xl font-bold text-gray-800">
                        {flightDetails.outbound.flights[0].departure_airport.id} → {flightDetails.outbound.flights[flightDetails.outbound.flights.length - 1].arrival_airport.id}
                      </h2>
                    </div>
                    <button
                      onClick={handleToggleOutboundDetail}
                      className="text-orange-500 font-semibold underline"
                    >
                      Chi tiết
                    </button>
                  </div>

                  <p className="text-sm text-gray-500 mb-4">
                    {flightDetails.outbound.flights[0].departure_airport.name} → {flightDetails.outbound.flights[flightDetails.outbound.flights.length - 1].arrival_airport.name}
                  </p>

                  <div className="flex justify-between items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <img
                        className="h-10 w-10 object-contain"
                        src={flightDetails.outbound.flights[0].airline_logo}
                        alt="logo"
                      />
                      <div className="flex flex-col text-start text-xs lg:text-sm">
                        <div>{flightDetails.outbound.flights[0].airline}</div>
                        <div className="text-black">{flightDetails.outbound.flights[0].flight_number}</div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <p className="text-xl font-bold">
                        {flightDetails.outbound.flights[0].departure_airport.time.substring(11, 16)}
                      </p>
                      <p className="text-sm text-gray-500">{flightDetails.outbound.flights[0].departure_airport.id}</p>
                    </div>

                    <Tooltip
                      content={<span>{flightDetails.outbound.flights[flightDetails.outbound.flights.length - 1].arrival_airport.name}</span>}
                      placement="bottom"
                      showArrow={true}
                      radius="none"
                    >
                      <div className="flex w-1/2 flex-col justify-between space-y-1 overflow-hidden">
                        <div className="overflow-hidden text-center text-xs text-black">
                          <span className="inline-block truncate whitespace-nowrap">
                            {formatDuration(flightDetails.outbound.total_duration)}
                          </span>
                        </div>
                        <div className="relative flex justify-between">
                          <div className="h-1.5 w-1.5 rounded-full bg-black"></div>
                          <div className="h-1.5 w-1.5 rounded-full bg-black"></div>
                          <div className="h-1.5 w-1.5 rounded-full bg-black"></div>
                          <div className="absolute top-1/2 z-0 h-0.5 w-full -translate-y-1/2 bg-black"></div>
                        </div>
                        <div className="text-center text-sm text-slate-400">
                          <span>{flightDetails.outbound.flights.length > 1 ? "Layover" : "Bay thẳng"}</span>
                        </div>
                      </div>
                    </Tooltip>

                    <div className="flex flex-col items-center text-center">
                      <p className="text-xl font-bold">
                        {flightDetails.outbound.flights[flightDetails.outbound.flights.length - 1].arrival_airport.time.substring(11, 16)}
                      </p>
                      <p className="text-sm text-gray-500">{flightDetails.outbound.flights[flightDetails.outbound.flights.length - 1].arrival_airport.id}</p>
                    </div>
                  </div>

                  {isOutboundDetailVisible && (
                    <div className="mt-4">
                      {flightDetails.outbound.flights.map((flight, index) => (
                        <div key={index} className="flex justify-between items-center mt-4 bg-gray-100 p-4 rounded-lg shadow-sm">
                          <div className="flex flex-col items-center space-y-2 w-1/3">
                            <div className="text-lg font-bold text-gray-800">{flight.departure_airport.time}</div>
                            <div className="text-xs text-gray-500">{flight.departure_airport.date}</div>
                            <div className="flex flex-col items-center">
                              <div className="h-2 w-2 rounded-full border-2 border-blue-500 m-1"></div>
                              <div className="h-14 w-0.5 bg-black"></div>
                              <div className="h-2 w-2 rounded-full bg-blue-500 m-1"></div>
                            </div>
                            <div className="text-lg font-bold text-gray-800">{flight.arrival_airport.time}</div>
                            <div className="text-xs text-gray-500">{flight.arrival_airport.date}</div>
                          </div>

                          <div className="flex flex-col justify-between space-y-2 w-2/4">
                            <div>
                              <p className="font-semibold text-gray-800">
                                Bay từ: ({flight.departure_airport.id}) {flight.departure_airport.country_name}
                              </p>
                              <p className="text-sm text-gray-500"> {flight.departure_airport.name} </p>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">Bay đến: ({flight.arrival_airport.id})</p>
                              <p className="text-sm text-gray-500"> {flight.arrival_airport.name}</p>
                            </div>
                          </div>

                          <div className="flex flex-col items-end text-right space-y-2 w-1/4">
                            <img
                              src={flight.airline_logo}
                              alt="logo"
                              className="h-8 w-8 object-contain"
                            />
                            <p className="text-sm font-semibold text-gray-800">Hãng bay: {flight.airline}</p>
                            <p className="text-sm text-gray-500">Số hiệu: {flight.flight_number}</p>
                            <p className="text-sm text-gray-500">Thời gian bay: {formatDuration(flight.duration)}</p>
                            <p className="text-sm text-gray-500">Máy bay: {flight.airplane}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Hiển thị chiều về nếu là vé khứ hồi */}
              {flightType === "1" && flightDetails.return && (
                <div className="relative bg-white p-6 rounded-lg shadow-md mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="bg-yellow-400 text-white px-3 py-1 rounded font-semibold mr-3">Chiều về</span>
                      <h2 className="text-xl font-bold text-gray-800">
                        {flightDetails.return.flights[0].departure_airport.id} → {flightDetails.return.flights[flightDetails.return.flights.length - 1].arrival_airport.id}
                      </h2>
                    </div>
                    <button
                      onClick={handleToggleReturnDetail}
                      className="text-orange-500 font-semibold underline"
                    >
                      Chi tiết
                    </button>
                  </div>

                  <p className="text-sm text-gray-500 mb-4">
                    {flightDetails.return.flights[0].departure_airport.name} → {flightDetails.return.flights[flightDetails.return.flights.length - 1].arrival_airport.name}
                  </p>

                  <div className="flex justify-between items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <img
                        className="h-10 w-10 object-contain"
                        src={flightDetails.return.flights[0].airline_logo}
                        alt="logo"
                      />
                      <div className="flex flex-col text-start text-xs lg:text-sm">
                        <div>{flightDetails.return.flights[0].airline}</div>
                        <div className="text-black">{flightDetails.return.flights[0].flight_number}</div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <p className="text-xl font-bold">
                        {flightDetails.return.flights[0].departure_airport.time.substring(11, 16)}
                      </p>
                      <p className="text-sm text-gray-500">{flightDetails.return.flights[0].departure_airport.id}</p>
                    </div>

                    <Tooltip
                      content={<span>{flightDetails.return.flights[flightDetails.return.flights.length - 1].arrival_airport.name}</span>}
                      placement="bottom"
                      showArrow={true}
                      radius="none"
                    >
                      <div className="flex w-1/2 flex-col justify-between space-y-1 overflow-hidden">
                        <div className="overflow-hidden text-center text-xs text-black">
                          <span className="inline-block truncate whitespace-nowrap">
                            {formatDuration(flightDetails.return.total_duration)}
                          </span>
                        </div>
                        <div className="relative flex justify-between">
                          <div className="h-1.5 w-1.5 rounded-full bg-black"></div>
                          <div className="h-1.5 w-1.5 rounded-full bg-black"></div>
                          <div className="h-1.5 w-1.5 rounded-full bg-black"></div>
                          <div className="absolute top-1/2 z-0 h-0.5 w-full -translate-y-1/2 bg-black"></div>
                        </div>
                        <div className="text-center text-sm text-slate-400">
                          <span>{flightDetails.return.flights.length > 1 ? "Layover" : "Bay thẳng"}</span>
                        </div>
                      </div>
                    </Tooltip>

                    <div className="flex flex-col items-center text-center">
                      <p className="text-xl font-bold">
                        {flightDetails.return.flights[flightDetails.return.flights.length - 1].arrival_airport.time.substring(11, 16)}
                      </p>
                      <p className="text-sm text-gray-500">{flightDetails.return.flights[flightDetails.return.flights.length - 1].arrival_airport.id}</p>
                    </div>
                  </div>

                  {isReturnDetailVisible && (
                    <div className="mt-4">
                      {flightDetails.return.flights.map((flight, index) => (
                        <div key={index} className="flex justify-between items-center mt-4 bg-gray-100 p-4 rounded-lg shadow-sm">
                          <div className="flex flex-col items-center space-y-2 w-1/3">
                            <div className="text-lg font-bold text-gray-800">{flight.departure_airport.time}</div>
                            <div className="text-xs text-gray-500">{flight.departure_airport.date}</div>
                            <div className="flex flex-col items-center">
                              <div className="h-2 w-2 rounded-full border-2 border-blue-500 m-1"></div>
                              <div className="h-14 w-0.5 bg-black"></div>
                              <div className="h-2 w-2 rounded-full bg-blue-500 m-1"></div>
                            </div>
                            <div className="text-lg font-bold text-gray-800">{flight.arrival_airport.time}</div>
                            <div className="text-xs text-gray-500">{flight.arrival_airport.date}</div>
                          </div>

                          <div className="flex flex-col justify-between space-y-2 w-2/4">
                            <div>
                              <p className="font-semibold text-gray-800">
                                Bay từ: ({flight.departure_airport.id}) {flight.departure_airport.country_name}
                              </p>
                              <p className="text-sm text-gray-500"> {flight.departure_airport.name} </p>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">Bay đến: ({flight.arrival_airport.id})</p>
                              <p className="text-sm text-gray-500"> {flight.arrival_airport.name}</p>
                            </div>
                          </div>

                          <div className="flex flex-col items-end text-right space-y-2 w-1/4">
                            <img
                              src={flight.airline_logo}
                              alt="logo"
                              className="h-8 w-8 object-contain"
                            />
                            <p className="text-sm font-semibold text-gray-800">Hãng bay: {flight.airline}</p>
                            <p className="text-sm text-gray-500">Số hiệu: {flight.flight_number}</p>
                            <p className="text-sm text-gray-500">Thời gian bay: {formatDuration(flight.duration)}</p>
                            <p className="text-sm text-gray-500">Máy bay: {flight.airplane}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Thông báo lỗi */}
            {errorMessage && (
              <div className="bg-red-100 p-3 rounded-md mb-4 text-red-700">
                {errorMessage}
              </div>
            )}
            {/* thông tin hành khách */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-4">
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
                  {/* <FaAngleDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" /> */}
                  <datalist id="nationality-list">
                    {[
                      "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan", "Sudan, South", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
                    ].map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Thông tin liên hệ text-xl font-bold mb-6 text-gray-800 border-b pb-4 */}
              <h2 className="text-xl font-bold mb-6 text-gray-500 border-b pb-4 mt-8 mb-4" style={{ color: '#000000' }}>Thông tin liên hệ</h2>
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
                <h2 className="text-xl font-bold" style={{ color: '#000000' }}>Thông tin xuất hóa đơn</h2>
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
                  <h2 className="text-xl font-bold mt-8 mb-4" style={{ color: '#000000' }}>Thông tin người nhận</h2>
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

              <div className="flex justify-end mt-8">
                <button
                  onClick={handleBookingSubmit} // Thực hiện điều hướng khi nhấn "Tiếp tục"
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg"
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          </div>

          {/* Thông tin hành lý */}
          <div className="lg:col-span-1">
            <div className="bg-white p-4 shadow-md" style={{ borderRadius: '20px' }}>
              <h2 className="text-lg font-bold mb-4" style={{ color: '#000000' }}>Thông tin hành lý</h2>
              <div className="mb-2">
                <h3 className="font-bold" style={{ color: '#000000' }}>Người lớn (Hành khách 1)</h3>
                <ul className="list-none pl-0">
                  <li className="text-sm flex justify-between items-center mb-1" style={{ color: '#000000' }}>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 640 512" className="mr-2">
                        <path fill="#ffa300" d="M0 32C0 14.3 14.3 0 32 0L48 0c44.2 0 80 35.8 80 80l0 288c0 8.8 7.2 16 16 16l464 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-66.7 0c1.8 5 2.7 10.4 2.7 16c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-5.6 1-11 2.7-16l-197.5 0c1.8 5 2.7 10.4 2.7 16c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-5.6 1-11 2.7-16L144 448c-44.2 0-80-35.8-80-80L64 80c0-8.8-7.2-16-16-16L32 64C14.3 64 0 49.7 0 32zM432 96l0-40c0-4.4-3.6-8-8-8l-80 0c-4.4 0-8 3.6-8 8l0 40 96 0zM288 96l0-40c0-30.9 25.1-56 56-56l80 0c30.9 0 56 25.1 56 56l0 40 0 224-192 0 0-224zM512 320l0-224 16 0c26.5 0 48 21.5 48 48l0 128c0 26.5-21.5 48-48 48l-16 0zM240 96l16 0 0 224-16 0c-26.5 0-48-21.5-48-48l0-128c0-26.5 21.5-48 48-48z" />
                      </svg>
                      <span>Hành lý ký gửi</span>
                    </div>
                    <div className="flex items-center">
                      <span>1 kiện</span>
                      <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" className="ml-2">
                        <path fill="#999999" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                      </svg>
                    </div>
                  </li>

                  <li className="text-sm flex justify-between items-center mb-1" style={{ color: '#000000' }}>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="16" height="16" className="mr-2">
                        <path fill="#ffa300" d="M432 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM347.7 200.5c1-.4 1.9-.8 2.9-1.2l-16.9 63.5c-5.6 21.1-.1 43.6 14.7 59.7l70.7 77.1 22 88.1c4.3 17.1 21.7 27.6 38.8 23.3s27.6-21.7 23.3-38.8l-23-92.1c-1.9-7.8-5.8-14.9-11.2-20.8l-49.5-54 19.3-65.5 9.6 23c4.4 10.6 12.5 19.3 22.8 24.5l26.7 13.3c15.8 7.9 35 1.5 42.9-14.3s1.5-35-14.3-42.9L505 232.7l-15.3-36.8C472.5 154.8 432.3 128 387.7 128c-22.8 0-45.3 4.8-66.1 14l-8 3.5c-32.9 14.6-58.1 42.4-69.4 76.5l-2.6 7.8c-5.6 16.8 3.5 34.9 20.2 40.5s34.9-3.5 40.5-20.2l2.6-7.8c5.7-17.1 18.3-30.9 34.7-38.2l8-3.5zm-30 135.1l-25 62.4-59.4 59.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L340.3 441c4.6-4.6 8.2-10.1 10.6-16.1l14.5-36.2-40.7-44.4c-2.5-2.7-4.8-5.6-7-8.6zM256 274.1c-7.7-4.4-17.4-1.8-21.9 5.9l-32 55.4L147.7 304c-15.3-8.8-34.9-3.6-43.7 11.7L40 426.6c-8.8 15.3-3.6 34.9 11.7 43.7l55.4 32c15.3 8.8 34.9 3.6 43.7-11.7l64-110.9c1.5-2.6 2.6-5.2 3.3-8L261.9 296c4.4-7.7 1.8-17.4-5.9-21.9z" />
                      </svg>
                      <span>Hành lý xách tay</span>
                    </div>
                    <div className="flex items-center">
                      <span>1 kiện</span>
                      <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" className="ml-2">
                        <path fill="#999999" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                      </svg>
                    </div>
                  </li>
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
              <h2 className="text-lg font-bold mb-1" style={{ color: '#000000' }}>Chi tiết giá</h2>
              <div className="text-sm" style={{ color: '#000000' }}>
                {flightType === "1" ? (
                  <>
                    {flightDetails.outbound && (
                      <div className="flex justify-between">
                        <p>Giá vé chiều đi</p>
                        <p>{flightDetails.outbound.price?.toLocaleString() || 'Không có'} .đ</p>
                      </div>
                    )}
                    {flightDetails.return && (
                      <div className="flex justify-between">
                        <p>Giá vé chiều về</p>
                        <p>{flightDetails.return.price?.toLocaleString() || 'Không có'} .đ</p>
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
                        <p>{flightDetails.outbound.price?.toLocaleString() || 'Không có'} .đ</p>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <p>Thuế và phí</p>
                      <p>Không có</p>
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 relative">
                <div className="absolute -left-9 top-4 transform -translate-y-1/2 w-10 h-10 rounded-full" style={{ backgroundColor: '#f0f0f0' }}></div>
                <div className="absolute -right-9 top-4 transform -translate-y-1/2 w-10 h-10 rounded-full" style={{ backgroundColor: '#f0f0f0' }}></div>
                <div className="w-full border-t border-dashed border-gray-500 mx-4"></div>
              </div>
              <div className="flex items-center justify-between mt-2" style={{ marginTop: '30px' }}>
                <h2 className="text-xl font-bold" style={{ color: '#000000' }}>Tổng Giá:</h2>
                <h2 className="text-xl font-bold" style={{ color: '#000000' }}> <span className='text-red-500'>{totalPrice.toLocaleString()} .đ</span></h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
