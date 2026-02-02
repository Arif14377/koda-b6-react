import React from 'react';
import { useForm } from 'react-hook-form';

const FilterSidebar = ({ onSearch }) => {
  const { register } = useForm({ defaultValues: { search: "" } })
  return (
    <div className="bg-black text-white p-6 rounded-xl h-fit w-full lg:w-72 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg">Filter</h3>
        <button className="text-xs text-gray-400 hover:text-white">Reset Filter</button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-bold mb-2">Search</label>
        <input 
            type="text" 
            placeholder="Search Your Product" 
            className="w-full bg-white text-sm text-gray-600 px-4 py-3 rounded-lg focus:outline-none"
            {...register("search", { onChange: (e) => onSearch && onSearch(e.target.value) })}
        />
      </div>

      {/* Category */}
      <div className="mb-6">
        <h4 className="font-bold mb-3">Category</h4>
        <div className="space-y-3 text-sm text-gray-300">
            {['Favorite Product', 'Coffee', 'Non-Coffee', 'Foods', 'Add-On'].map((cat, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer hover:text-white">
                    <input type="checkbox" defaultChecked={cat === 'Coffee'} className="accent-orange-500 w-4 h-4 rounded" />
                    <span>{cat}</span>
                </label>
            ))}
        </div>
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <h4 className="font-bold mb-3">Sort By</h4>
        <div className="space-y-3 text-sm text-gray-300">
            {['Buy 1 get 1', 'Flash Sale', 'Birthday Package', 'Cheap'].map((sort, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer hover:text-white">
                     <input type="checkbox" defaultChecked={sort === 'Flash Sale'} className="accent-orange-500 w-4 h-4 rounded" />
                    <span>{sort}</span>
                </label>
            ))}
        </div>
      </div>

      {/* Range Price (Visual Simulation) */}
      <div className="mb-8">
        <h4 className="font-bold mb-3">Range Price</h4>
        <div className="relative w-full h-1 bg-gray-600 rounded mt-4">
            <div className="absolute left-0 top-0 h-full bg-orange-500 w-2/3"></div>
            <div className="absolute left-0 -top-1.5 w-4 h-4 bg-white rounded-full shadow cursor-pointer border-2 border-orange-500"></div>
            <div className="absolute left-2/3 -top-1.5 w-4 h-4 bg-white rounded-full shadow cursor-pointer border-2 border-orange-500"></div>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-4">
            <span>IDR 10k</span>
            <span>IDR 100k</span>
        </div>
      </div>

      <button className="w-full bg-orange-500 py-3 rounded-lg font-bold text-black hover:bg-orange-600 transition shadow-lg shadow-orange-500/30">
        Apply Filter
      </button>
    </div>
  );
};

export default FilterSidebar;