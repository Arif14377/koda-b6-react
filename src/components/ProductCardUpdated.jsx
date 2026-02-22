import { BsCart3 } from 'react-icons/bs';
import { IoStar } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {addCart, updateCart} from '../redux/reducers/cartReducer'

const ProductCardUpdated = ({id, imgUrl, name, description, price, oldPrice, isFlashSale, rating}) => {
// TODO: fitur add to cart dengan redux
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart.carts);
  console.log(cart)
  const isLogin = useSelector(state => state.session.isLogin);
  const user = useSelector(state => state.session.user);
  const navigate = useNavigate()
  console.log(isLogin)
  console.log(user)

  const maxStar = 5;
  // const pullCart = JSON.parse(localStorage.getItem("cart")) || []

  //
  function addToCart() {
    if(!isLogin) {
      alert("Anda belum login. Login terlebih dahulu.")
      navigate("/login")
      return
    }

    const productToCart = {
      UID: user.id,
      id: id,
      name: name,
      price,
      qty: 1,
      size: "Regular",
      variant: "Ice",
      img: imgUrl,
      isFlashSale: isFlashSale
    }
    // console.log("productToCart: ", productToCart) ## berhasil masuk datanya
    
    // jika tidak ada, lanjut no.5
    // [v] 2. cek apakah productToCart sudah ada di keranjang?
    // [] 3. Jika ada, maka tambahkan qty saja bersama isian keranjang lainnya
    // [v] 4. jika tidak ada, maka tambahkan productToCart bersama isian keranjang lainnya
    // [v] 5. jika keranjang kosong, push productToCart.
    
    // cart kosong -> push addToCart
    if (!cart) {
      dispatch(addCart(productToCart))
      alert("Produk berhasil ditambahkan ke keranjang")
      return
    }

    // cart ada isinya -> cek apakah ada produk yang sama (by id, size, variant)
    const isExist = cart.find(item =>
      Number(item.UID) === Number(productToCart.id) &&
      Number(item.id) === Number(productToCart.id) &&
      item.size === productToCart.size &&
      item.variant === productToCart.variant
    )

    // tidak ada yang sama -> push langsung ke cart
    if(!isExist) {
      dispatch(addCart(productToCart))
      alert("Produk berhasil ditambahkan ke keranjang")
      return
    }

    // kalau ada yang sama, tambahkan qtynya saja
    // map cart, tambahkan qty jika ada isExist, updateCart() - reducer
    const newCart = cart.map(item => {
      if (
        Number(item.UID) === Number(productToCart.id) &&
        Number(item.id) === Number(productToCart.id) &&
        item.size === productToCart.size &&
        item.variant === productToCart.variant
      ) {
        return {...item, qty: item.qty + productToCart.qty}
      }
      return item
    })
    // console.log(newCart)
    dispatch(updateCart(newCart))
    alert("Produk berhasil ditambahkan ke keranjang")
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
          src={imgUrl[0]}
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
            {oldPrice ? (
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