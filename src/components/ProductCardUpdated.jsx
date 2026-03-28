import { BsCart3 } from 'react-icons/bs';
import { IoStar } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import http from "../lib/http"

const ProductCardUpdated = ({id, image, name, description, price, oldPrice, isFlashSale, rating, variants, sizes}) => {
  const isLogin = useSelector(state => state.session.isLogin);
  const token = useSelector(state => state.session.token);
  const navigate = useNavigate()

  const maxStar = 5;

  async function addToCart() {
    if(!isLogin) {
      alert("Anda belum login. Login terlebih dahulu.")
      navigate("/login")
      return
    }

    try {
      const selectedSize = sizes && sizes.length > 0 ? sizes[0] : null;
      const selectedVariant = variants && variants.length > 0 ? variants[0] : null;

      const cartData = {
        productId: Number(id),
        quantity: 1,
        sizeId: selectedSize?.id || null,
        variantId: selectedVariant?.id || null
      }

      const response = await http({
        url: "/cart",
        body: cartData,
        opts: {
          method: "POST",
          token: token
        }
      })

      if (response.success) {
        alert("Produk berhasil ditambahkan ke keranjang.")
      }
    } catch (error) {
      console.error("Gagal menambah ke keranjang:", error)
      alert(error.message || "Gagal menambahkan produk ke keranjang. Silakan coba lagi.")
    }
  }


  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 border border-gray-100 flex flex-col relative">
      
      {/* Flash Sale Badge */}
      {isFlashSale && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-full z-10">
            FLASH SALE!
        </div>
      )}

      {/* Gambar */}
      <div className="h-48 overflow-hidden relative">
        <img
          src={image || ""}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
        
        {/* Deskripsi Singkat */}
        <p className="text-gray-500 text-xs mb-3 line-clamp-2">
            {description || "You can explore the menu that we provide with fun and have their own taste."}
        </p>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3 text-orange-500 text-sm">
            {Array.from({length: maxStar}).map((_, idx) => <IoStar key={idx} className={idx < rating ? "text-yellow-500" : "text-gray-500"}/>)}
            <span className="text-gray-400 ml-1 text-xs">({rating})</span>
        </div>

        {/* Harga */}
        <div className="flex items-center gap-2 mb-4">
            {oldPrice && Number(oldPrice) > 0 ? (
              <span className="text-red-400 text-xs line-through decoration-red-500 decoration-1">IDR {Number(oldPrice).toLocaleString("id-ID")}</span>
            ) : null}
            <span className="text-orange-500 font-bold text-lg">IDR {Number(price).toLocaleString("id-ID")}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <Link to={`/product-detail/${id}`} className="flex-1">
            <button className="w-full bg-orange-500 text-black font-bold py-2 rounded-lg cursor-pointer">
              Buy
            </button>
          </Link>
          <button onClick={addToCart} className="border border-orange-500 text-orange-500 px-3 rounded-lg cursor-pointer">
            <BsCart3 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardUpdated;
