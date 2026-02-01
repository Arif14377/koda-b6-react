import Button from "./Button"
import { BsCart3 } from 'react-icons/bs';

const ProductCard = ({ image, title, desc, price }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 border border-gray-100 flex flex-col h-full">
      {/* Image */}
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover hover:scale-110 transition duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-4 flex-1 leading-relaxed">
          {desc}
        </p>
        
        <div className="text-orange-500 font-bold text-lg mb-4">
          IDR {price}
        </div>

        {/* CTA */}
        <div className="flex gap-3 mt-auto">
          <Button label={"Buy"} variant={"primary"}/>
          <button className="border border-orange-500 text-orange-500 p-2 rounded hover:bg-orange-50 transition">
            <BsCart3 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;