import React from 'react';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import ReusableTitle from './ReusableTitle.jsx'
import illustration from "../../public/assets/images/illustration.png"

const PromoSlider = () => {
  const promos = [
    { id: 1, name: "Happy Mother's Day!", desc: "Get one of our favorite menu for free!", bg: "bg-[#88B788]", img: illustration },
    { id: 2, name: "Happy Mother's Day!", desc: "Get one of our favorite menu for free!", bg: "bg-[#88B788]", img: illustration },
    { id: 3, name: "Happy Mother's Day!", desc: "Get one of our favorite menu for free!", bg: "bg-[#88B788]", img: illustration },
    { id: 4, name: "Sunday Morning", desc: "Get free coffee for free on sunday morning", bg: "bg-[#88B788]", img: illustration },
  ];

  return (
    <div className="mb-12">
      {/* Header Promo */}
      <div className="flex justify-between items-center mb-6 px-16 md:px-20 py-12">
        <ReusableTitle>Today <span>Promo</span></ReusableTitle>
        <div className="flex gap-2">
           <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"><IoArrowBack /></button>
           <button className="bg-orange-500 text-white p-2 rounded-full"><IoArrowForward /></button>
        </div>
      </div>

      {/* Slider Container */}
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide px-4 md:px-0">
        {promos.map((item) => (
          <div 
            key={item.id} 
            className={`min-w-70 md:min-w-[320px] h-32 rounded-xl p-4 flex items-center gap-4 shadow-md ${item.bg}`}
          >
            <img src={item.img} alt={item.name} className="w-fit object-cover" />
            <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-sm md:text-base mb-1">{item.name}</h3>
                <p className="text-gray-600 text-xs md:text-sm leading-tight">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination Dots */}
      <div className="flex gap-2 mt-4 px-16 md:px-20 py-12">
        <span className="w-8 h-2 bg-orange-500 rounded-full"></span>
        <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
        <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
      </div>
    </div>
  );
};

export default PromoSlider;