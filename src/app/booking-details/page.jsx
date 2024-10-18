'use client';

import { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import DatePicker from 'react-datepicker';
import { FaAngleDown } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';

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

  const [flightDetails, setFlightDetails] = useState({ outbound: null, return: null });
  const [isOutboundDetailVisible, setIsOutboundDetailVisible] = useState(false);
  const [isReturnDetailVisible, setIsReturnDetailVisible] = useState(false);
  const [flightType, setFlightType] = useState("1");  // Mặc định là khứ hồi (1: khứ hồi, 2: một chiều)
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Lấy thông tin chuyến bay từ localStorage
    const outboundFlight = localStorage.getItem('selectedOutboundFlight');
    const returnFlight = localStorage.getItem('selectedReturnFlight');
    const storedFlightType = localStorage.getItem('flightType');  // Lấy loại vé từ localStorage
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

    setFlightType(storedFlightType || "1");  // Cập nhật loại vé (1: khứ hồi, 2: một chiều)
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
      <div className="w-full bg-blue-900 text-white py-4 px-8 flex items-center justify-between relative" style={{ height: '150px' }}>
        {/* Bạn có thể thêm logo hoặc thông tin khác ở đây */}
      </div>

      <div className="flex justify-center items-start -mt-20" style={{ backgroundColor: '#f0f0f0' }}>
        <div className="w-full max-w-7xl p-4 grid grid-cols-1 lg:grid-cols-3 gap-4 relative">
          {/* Phần nội dung chính, thông tin hành khách, thông tin liên hệ */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md mb-4">
              {/* Nội dung chính của trang */}
              <div className="bg-orange-100 p-3 rounded-md mb-4">
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

          {/* Thông tin hành lý */}
          <div className="lg:col-span-1">
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
                {flightType === "1" ? (
                  <>
                    {flightDetails.outbound && (
                      <p>Giá vé chiều đi: {flightDetails.outbound.price?.toLocaleString() || 'Không có'} .đ</p>
                    )}
                    {flightDetails.return && (
                      <p>Giá vé chiều về: {flightDetails.return.price?.toLocaleString() || 'Không có'} .đ</p>
                    )}
                    {flightDetails.outbound && flightDetails.return && (
                      <p>Thuế và phí: Không có</p>
                    )}
                  </>
                ) : (
                  <>
                    {flightDetails.outbound && (
                      <p>Giá vé chiều đi: {flightDetails.outbound.price?.toLocaleString() || 'Không có'} .đ</p>
                    )}
                    <p>Thuế và phí: Không có</p>
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
