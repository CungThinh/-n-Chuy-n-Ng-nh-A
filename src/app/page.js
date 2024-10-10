'use client'

import { useState, useRef, useEffect } from 'react';
import { FaPlane, FaExchangeAlt, FaCalendarAlt, FaSearch, FaUser, FaCaretDown, FaCheck, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import FlightSearchSection from '@/components/home/FlightSearchSection';
import AdSection from '@/components/home/AdSection';
import DiscountSection from '@/components/home/DiscountSection';

// Hàm bỏ dấu tiếng Việt

export default function HomePage() {
  return (
    <div className='bg-[#fff]'>
      <FlightSearchSection/>
      <AdSection/>
      <DiscountSection/>
    </div>
  );
}