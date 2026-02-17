import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa6";
import { CiCircleRemove } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import BCA from "../../public/assets/images/bca.svg"
import BRI from "../../public/assets/images/bri.svg"
import DANA from "../../public/assets/images/dana.svg"
import GoPay from "../../public/assets/images/gopay.svg"
import OVO from "../../public/assets/images/ovo.svg"
import Paypal from "../../public/assets/images/paypal.svg"
import Footer from "../components/Footer"
import { useDispatch, useSelector } from "react-redux";
import { removeCart, resetCart } from "../redux/reducers/cartReducer"

const PPN = 0.1

function CheckoutProduct() {
    // DONE: ubah cart dari getItem dengan local storage menjadi ambil dari cart redux.
    // DONE: hanya tampilkan cart berdasarkan session user saat ini.
    // const [cart, setCart] = useState([])
    const navigate = useNavigate()
    const user = useSelector(state => state.session.user)
    const isLogin = useSelector(state => state.session.isLogin)
    const dispatch = useDispatch()
    // cart seluruhnya
    useEffect(()=>{
        if(!isLogin) {
            alert("Silahkan login terlebih dahulu.")
            navigate("/login", {replace: true})
        }
    }, [])
    const carts = useSelector(state => state.cart.carts)
    // cart user saat ini

    const cart = carts.filter(item => item.UID === user.id)
    // console.log(cart)

    // useEffect(()=>{
    //     const pullCart = JSON.parse(localStorage.getItem("cart")) || []
    //     setCart(pullCart)
    // }, [])

    const subTotal = cart.reduce((total, item) => total + (item.price * (item.qty || 1)), 0);
    const tax = subTotal * PPN;
    const grandTotal = subTotal + tax; 

    function removeItem(target) {
        dispatch(removeCart(target))
        // const newCart = cart.filter(item => !(Number(item.id) === Number(target.id) && item.size === target.size && item.variant === target.variant));
        // DONE: ubah handle remove ke redux.
        // setCart(newCart);
        // localStorage.setItem("cart", JSON.stringify(newCart));
    }

    function checkout() {
        if (!cart || cart.length === 0) {
            alert("Cart kosong")
            return
        }

        const order = {
            UID: user.id,
            id: Date.now(),
            items: cart,
            subtotal: subTotal,
            tax: tax,
            total: grandTotal,
            date: new Date().toISOString()
        }

        const pullHistory = JSON.parse(localStorage.getItem("history")) || []
        const newHistory = [order, ...pullHistory]
        localStorage.setItem("history", JSON.stringify(newHistory))

        // clear cart
        // localStorage.removeItem("cart")
        // setCart([])
        dispatch(resetCart(user.id))

        alert("Checkout berhasil, order disimpan ke history")
        navigate('/history')
    }

    return (
        // Item terluar
        <div>
            <Navbar variants={"black"}/>
            <div className="mt-17.5 grid grid-cols-3 md:grid-cols-5 py-20 px-20 gap-4">
                <h1 className="text-5xl font-medium col-span-5">Payment Details</h1>
                {/* Kiri */}
                <div className="col-span-3 flex flex-col gap-12">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center w-full justify-between">
                            <h2 className="text-lg font-medium">Your Order</h2>
                            <Link to="/product" className="flex items-center gap-2 bg-[#FF8906] px-2 py-1 rounded text-sm">
                                <FaPlus/> Add Menu
                            </Link>
                        </div>
                        {/* Card product in cart */}
                        {cart && cart.length > 0 ? (
                            cart.map((item, idx) => (
                                <div key={`${item.id}-${item.size}-${item.variant}-${idx}`} className="flex gap-3 items-center justify-between bg-[#E8E8E84D] py-2 px-2">
                                    <div className="flex gap-6">
                                        <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                        <div>
                                            {item.isFlashSale && <p className="text-sm text-red-600 font-semibold">Flash Sale</p>}
                                            <h3 className="font-medium">{item.name}</h3>
                                            <p className="text-sm text-gray-500">{item.qty || 1}pcs | {item.size} | {item.variant}</p>
                                            <p className="font-semibold">IDR {(item.price * (item.qty || 1)).toLocaleString("id-ID")}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => removeItem(item)} className="cursor-pointer">
                                        <CiCircleRemove color="red" size={36}/>
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>Your cart is empty</p>
                        )}
                    </div>
                </div>

                {/* Kanan - Total */}
                <div className="col-span-2">
                    <div className="bg-[#E8E8E84D] p-4 sticky top-24">
                        <h2 className="text-lg font-medium mb-4">Total</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span>Order</span>
                                <span>IDR {subTotal.toLocaleString("id-ID")}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Delivery</span>
                                <span>IDR 0</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>IDR {tax.toLocaleString("id-ID")}</span>
                            </div>

                            <div className="flex justify-between font-bold">
                                <span>Sub Total</span>
                                <span>IDR {grandTotal.toLocaleString("id-ID")}</span>
                            </div>
                        </div>
                        <button onClick={checkout} className="mt-6 w-full bg-[#FF8906] py-2 rounded font-semibold cursor-pointer">Checkout</button>
                        <div className="mt-4 text-sm text-gray-500">
                            <p>We Accept</p>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-2 h-8">
                            <img src={BRI} alt="Bank BRI" />
                            <img src={DANA} alt="DANA" />
                            <img src={BCA} alt="Bank BCA" />
                            <img src={GoPay} alt="GoPay" />
                            <img src={OVO} alt="OVO" />
                            <img src={Paypal} alt="Paypal" />
                        </div>
                        <div className="mt-4 text-xs text-gray-500">
                            <p>*Get Discount if you pay with Bank Central Asia</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default CheckoutProduct