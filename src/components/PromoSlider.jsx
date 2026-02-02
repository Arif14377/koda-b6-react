import React from 'react';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';

const PromoSlider = () => {
  const promos = [
    { id: 1, name: "Happy Mother's Day!", desc: "Get one of our favorite menu for free!", bg: "bg-green-100", img: "👩‍🦳" },
    { id: 2, name: "Happy Mother's Day!", desc: "Get one of our favorite menu for free!", bg: "bg-green-100", img: "🧔" },
    { id: 3, name: "Happy Mother's Day!", desc: "Get one of our favorite menu for free!", bg: "bg-green-100", img: "🧕" },
    { id: 4, name: "Sunday Morning", desc: "Get free coffee for free on sunday morning", bg: "bg-yellow-100", img: "☕" },
  ];

  return (
    <div className="mb-12">
      {/* Header Promo */}
      <div className="flex justify-between items-center mb-6 px-16 md:px-20 py-12">
        <h2 className="text-3xl font-bold text-[#8B5E3C]">
          Today <span className="text-[#8B5E3C] border-b-4 border-orange-500">Promo</span>
        </h2>
        <div className="flex gap-2">
           <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"><IoArrowBack /></button>
           <button className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition"><IoArrowForward /></button>
        </div>
      </div>

      {/* Slider Container */}
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide px-4 md:px-0">
        {promos.map((item) => (
          <div 
            key={item.id} 
            className={`min-w-70 md:min-w-[320px] h-32 rounded-xl p-4 flex items-center gap-4 shadow-md hover:scale-105 transition duration-300 ${item.bg}`}
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-800/10 rounded-full flex items-center justify-center text-4xl">
                {/* Placeholder Image/Emoji */}
                {item.img}
            </div>
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