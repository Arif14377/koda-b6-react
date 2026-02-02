import React from 'react';
import { BsCart3 } from 'react-icons/bs';
import { IoStar } from 'react-icons/io5';

const ProductCardUpdated = ({ id, image, title, desc, rating, oldPrice, price, isFlashSale, onAdd }) => {
  function addToCart() {
    const pullCart = JSON.parse(localStorage.getItem("cart")) || []
    const productToCart = {
      id,
      name: title,
      price,
      qty: 1,
      size: "Regular",
      variant: "Ice",
      img: image,
      isFlashSale: !!isFlashSale
    }

    const isExist = pullCart.find(item =>
      Number(item.id) === Number(productToCart.id) &&
      item.size === productToCart.size &&
      item.variant === productToCart.variant
    )

    let newCart = []
    if (isExist) {
      newCart = pullCart.map(item => {
        if (
          Number(item.id) === Number(productToCart.id) &&
          item.size === productToCart.size &&
          item.variant === productToCart.variant
        ) {
          return { ...item, qty: (item.qty || 0) + productToCart.qty }
        }
        return item
      })
    } else {
      newCart = [productToCart, ...pullCart]
    }

    localStorage.setItem("cart", JSON.stringify(newCart))
    if (onAdd) onAdd(); else alert("Produk berhasil ditambahkan ke keranjang")
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 border border-gray-100 flex flex-col relative">
      
      {/* Flash Sale Badge */}
      {isFlashSale && (
        <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-br-lg z-10">
            FLASH SALE!
        </div>
      )}

      {/* Gambar */}
      <div className="h-48 overflow-hidden relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover hover:scale-110 transition duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
        
        {/* Deskripsi Singkat */}
        <p className="text-gray-500 text-xs mb-3 line-clamp-2">
            You can explore the menu that we provide with fun and have their own taste.
        </p>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3 text-orange-500 text-sm">
            {[1,2,3,4,5].map(i => <IoStar key={i} />)}
            <span className="text-gray-400 ml-1 text-xs">({rating})</span>
        </div>

        {/* Harga */}
        <div className="flex items-center gap-2 mb-4">
            <span className="text-red-400 text-xs line-through decoration-red-500 decoration-1">IDR {oldPrice}</span>
            <span className="text-orange-500 font-bold text-lg">IDR {price}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <button className="flex-1 bg-orange-500 text-black font-bold py-2 rounded-lg hover:bg-orange-600 transition shadow-md">
            Buy
          </button>
          <button onClick={addToCart} className="border border-orange-500 text-orange-500 px-3 rounded-lg hover:bg-orange-50 transition">
            <BsCart3 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardUpdated;