import Navbar from "../components/Navbar"
import { useEffect, useState, useCallback } from "react"
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
import http from "../lib/http";

const PPN = 0.1

function CheckoutProduct() {
    const navigate = useNavigate()
    const user = useSelector(state => state.session.user)
    const isLogin = useSelector(state => state.session.isLogin)
    const token = useSelector(state => state.session.token)
    const dispatch = useDispatch()
    
    const [cart, setCart] = useState([])
    const [deliveryMethods, setDeliveryMethods] = useState([])
    const [loading, setLoading] = useState(true)

    // Form states
    const [email, setEmail] = useState(user?.email || "")
    const [fullName, setFullName] = useState(user?.fullName || user?.name || "")
    const [address, setAddress] = useState(user?.address || "")
    const [deliveryMethod, setDeliveryMethod] = useState("Dine in")

    useEffect(() => {
        if (user) {
            setEmail(user.email || "")
            setFullName(user.fullName || user.name || "")
        }
    }, [user])

    const fetchCart = useCallback(async () => {
        if (!token) return;
        try {
            setLoading(true)
            const response = await http({
                url: "/cart",
                opts: {
                    method: "GET",
                    token: token
                }
            })
            if (response.success) {
                setCart(response.results || [])
            }
        } catch (error) {
            console.error("Gagal mengambil data keranjang:", error)
        } finally {
            setLoading(false)
        }
    }, [token])

    const fetchDeliveryMethods = useCallback(async () => {
        try {
            const response = await http({
                url: "/delivery-methods",
                opts: {
                    method: "GET"
                }
            })
            if (response.success) {
                setDeliveryMethods(response.results || [])
                if (response.results?.length > 0) {
                    setDeliveryMethod(response.results[0].name)
                }
            }
        } catch (error) {
            console.error("Gagal mengambil data metode pengiriman:", error)
        }
    }, [])

    useEffect(() => {
        fetchDeliveryMethods()
    }, [fetchDeliveryMethods])

    useEffect(()=>{
        if(!isLogin) {
            alert("Silahkan login terlebih dahulu.")
            navigate("/login", {replace: true})
        } else {
            fetchCart()
        }
    }, [isLogin, navigate, fetchCart])

    const subTotal = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    const selectedDelivery = deliveryMethods.find(m => m.name === deliveryMethod);
    const deliveryFee = selectedDelivery ? selectedDelivery.price : 0;
    const tax = subTotal * PPN;
    const grandTotal = subTotal + tax + deliveryFee; 

    async function removeItem(item) {
        try {
            const response = await http({
                url: `/cart/${item.id}`,
                opts: {
                    method: "DELETE",
                    token: token
                }
            })
            if (response.success) {
                fetchCart()
                // Juga hapus dari redux jika masih ada (opsional untuk sinkronisasi jika komponen lain pakai redux)
                dispatch(removeCart({ id: item.productId, size: item.size, variant: item.variant }))
            }
        } catch (error) {
            console.error("Gagal menghapus item:", error)
            alert("Gagal menghapus item dari keranjang")
        }
    }

    async function checkout() {
        if (!cart || cart.length === 0) {
            alert("Cart kosong")
            return
        }

        const order = {
            delivery_method: deliveryMethod,
            full_name: fullName,
            email: email,
            address: address || "Store Address",
            sub_total: Math.round(subTotal),
            tax: Math.round(tax),
            total: Math.round(grandTotal),
            payment_method: "Cash", // Default
            status: "Pending"
        }

        try {
            const response = await http({
                url: "/history",
                body: order,
                opts: {
                    method: "POST",
                    token: token
                }
            })

            if (response.success) {
                dispatch(resetCart(user.id))
                alert("Checkout berhasil!")
                navigate('/history')
            } else {
                alert("Gagal melakukan checkout: " + (response.message || "Unknown error"))
            }
        } catch (error) {
            console.error("Error during checkout:", error)
            alert("Terjadi kesalahan saat checkout")
        }
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
                        {loading ? (
                            <p>Loading cart...</p>
                        ) : cart && cart.length > 0 ? (
                            cart.map((item, idx) => (
                                <div key={`${item.id}-${idx}`} className="flex gap-3 items-center justify-between bg-[#E8E8E84D] py-2 px-2">
                                    <div className="flex gap-6">
                                        <img src={item.image} alt={item.productName} className="w-20 h-20 object-cover rounded" />
                                        <div>
                                            <h3 className="font-medium">{item.productName}</h3>
                                            <p className="text-sm text-gray-500">
                                                {item.quantity || 1}pcs 
                                                {item.size && ` | ${item.size}`} 
                                                {item.variant && ` | ${item.variant}`}
                                            </p>
                                            <p className="font-semibold">IDR {(item.price * (item.quantity || 1)).toLocaleString("id-ID")}</p>
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
                                <span>IDR {deliveryFee.toLocaleString("id-ID")}</span>
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

                {/* Payment Info & Delivery */}
                <div className="col-span-3 flex flex-col gap-6">
                    <h2 className="text-lg font-medium">Payment Info & Delivery</h2>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Your Email"
                            className="border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-[#FF8906]"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold">Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Enter Your Full Name"
                            className="border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-[#FF8906]"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold">Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter Your Address"
                            className="border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-[#FF8906]"
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <label className="text-sm font-semibold">Delivery</label>
                        <div className="flex gap-4">
                            {deliveryMethods.map((method) => (
                                <button
                                    key={method.id}
                                    onClick={() => setDeliveryMethod(method.name)}
                                    className={`flex-1 py-2 px-4 rounded border transition-all cursor-pointer text-sm ${
                                        deliveryMethod === method.name
                                            ? "border-[#FF8906] text-[#FF8906] font-semibold"
                                            : "border-gray-300 text-gray-500"
                                    }`}
                                >
                                    {method.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default CheckoutProduct