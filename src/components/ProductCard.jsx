import Button from "./Button"
import { BsCart3 } from 'react-icons/bs';
import { Link } from "react-router-dom";

const ProductCard = ({ image, title, desc, price, id }) => {
  function addToCart() {
    const pullCart = JSON.parse(localStorage.getItem("cart")) || []
    const productToCart = {
      id,
      name: title,
      price,
      qty: 1,
      size: "Regular",
      variant: "Ice",
      img: image
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
    alert("Produk berhasil ditambahkan ke keranjang")
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 border border-gray-100 flex flex-col h-full">
      {/* Image */}
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
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
        <div className="flex gap-3 w-full">
          <Link to={`/product-detail/${id+1}`} className="flex-1"><Button label={"Buy"} variant={"primary"} className={"w-full"}/></Link>
          <button onClick={addToCart} className="border border-orange-500 text-orange-500 p-2 rounded cursor-pointer">
            <BsCart3 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;