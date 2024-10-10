import React from 'react';

export default function AirportInput({ label, value, setValue, icon }) {
  return (
    <div className="relative w-[30%]">
      {icon}
      <input
        type="text"
        placeholder={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pl-10 p-3 w-full rounded-lg bg-[#fff] focus:outline-none focus:ring-2 focus:ring-orange-400 text-black border"
      />
    </div>
  );
}
