import {useEffect, useState} from "react"
import { getData } from "../lib/fetch"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useParams } from "react-router-dom"
import { FaStar } from "react-icons/fa";
import { FiThumbsUp } from "react-icons/fi";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { BsCart3 } from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";
import {addCart, updateCart} from '../redux/reducers/cartReducer'

const URL = "http://localhost:8888/products"

function ProductDetail() {
    const [dataToShow, setDataToShow] = useState(null)
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("Regular")
    const [variant, setVariant] = useState("Ice")
    const [bigImage, setBigImage] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const user = useSelector(state => state.session.user)
    const isLogin = useSelector(state => state.session.isLogin)
    const cart = useSelector(state => state.cart.carts)
    const dispatch = useDispatch()

    const {id} = useParams()

    // ambil data product
    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getData(`${URL}/${id}`)
                if (result.success) {
                    setDataToShow(result.results)
                    if (result.results.image) {
                        setBigImage(result.results.image)
                    } else if (result.results.images && result.results.images.length > 0) {
                        setBigImage(result.results.images[0].path)
                    }
                    if (result.results.sizes && result.results.sizes.length > 0) {
                        setSize(result.results.sizes[0].name)
                    }
                    if (result.results.variants && result.results.variants.length > 0) {
                        setVariant(result.results.variants[0].name)
                    }
                }
            } catch (error) {
                console.error("Gagal mengambil detail produk:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [id]);

    if(isLoading) {
        return (
            <div>
                <Navbar variants={"black"}/>
                <div className="flex justify-center items-center h-screen">
                    <h1 className="font-bold text-4xl">Loading...</h1>
                </div>
            </div>
        )
    }
    
    if(!dataToShow) {
        return (
            <div>
                <Navbar variants={"black"}/>
                <div className="flex justify-center items-center h-screen">
                    <h1 className="font-bold text-4xl">Data tidak ditemukan</h1>
                </div>
            </div>
        )
    }
    
    // Fungsi tambah kurang qty product
    function minQty() {
        if (qty > 1) {
            setQty(qty - 1)
        }
    }

    function addQty() {
        setQty(qty + 1)
    }

    // fungsi tambah produk ke keranjang
    // const pullCart = JSON.parse(localStorage.getItem("cart"))
    // TODO : Mengubah handle menjadi redux.
    const productToCart = {
        UID: user?.id || "",
        id: id,
        name: dataToShow.name,
        price: dataToShow.price,
        qty: qty,
        size: size,
        variant: variant,
        img: dataToShow.image || (dataToShow.images && dataToShow.images.length > 0 ? dataToShow.images[0].path : ""),
        isFlashSale: dataToShow.isFlashSale || false
    }
    // let newCart = []

    function addToCart() {
        // jika belum login
        if(!isLogin) {
        alert("Anda belum login. Login terlebih dahulu.")
        navigate("/login")
        return
        }

        // jika cart kosong -> dispatch objek item untuk dipush ke state redux.
        if(cart.length < 1) {
            dispatch(addCart(productToCart))
            alert("Produk berhasil ditambahakan ke keranjang.")
            return
        }
        
        // Cek apakah ada produk ada di cart?
        const isExist = cart.find(item => 
            Number(item.UID) === Number(productToCart.id) &&
            Number(item.id) === productToCart.id &&
            item.size === productToCart.size &&
            item.variant === productToCart.variant
        )

        // Produk ada di cart, maka buat array of object cart baru
        if(isExist) {
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
            return
        } else {  //Product tidak ada di cart, dispatch(addCart(...))
            dispatch(addCart(productToCart))
            alert("Produk berhasil ditambahakan ke keranjang.")
            return
        }
    }

    return (
        <div>
            <Navbar variants={"black"}/>
            {/* Product Detail */}
            <div className="grid grid-cols-1 md:grid-cols-2 mt-17.5 py-20 px-32 gap-4">
                {/* Left */}
                <div className="grid grid-cols-3 grid-rows-4 gap-4 h-fit">
                    <img src={bigImage || (dataToShow.images && dataToShow.images.length > 0 ? dataToShow.images[0].path : "")} alt={dataToShow.name} className="col-span-3 row-span-3 object-cover w-full" />
                    {
                        dataToShow.images && dataToShow.images.length > 0 &&
                        dataToShow.images.map((item, idx) => {
                            return (
                                <img 
                                    key={idx} 
                                    src={item.path} 
                                    alt={`${dataToShow.name} ${idx + 1}`} 
                                    className={`object-cover w-full aspect-square cursor-pointer border-2 ${bigImage === item.path ? "border-[#FF8906]" : "border-transparent"}`} 
                                    onClick={() => setBigImage(item.path)} 
                                />
                            )
                        })
                    }
                </div>
                {/* Right */}
                <div className="flex flex-col gap-3">
                    {dataToShow.isFlashSale && (
                            <div className="flex justify-center items-center px-2 py-1 text-white font-bold bg-[#D00000] rounded-full w-fit">
                                <p>FLASH SALE</p>
                            </div>
                    )}
                    <h1 className="text-5xl font-medium">{dataToShow.name}</h1>
                    <div className="flex items-start gap-4 [&>p]:font-medium">
                        <p className="text-[#D00000] text-lg line-through">IDR {dataToShow.oldPrice.toLocaleString("id-ID")}</p>
                        <p className="text-[#FF8906] text-2xl">IDR {dataToShow.price.toLocaleString("id-ID")}</p>
                    </div>
                    <div className="flex gap-2">
                        <FaStar color="#FF8906"/>
                        <FaStar color="#FF8906"/>
                        <FaStar color="#FF8906"/>
                        <FaStar color="#FF8906"/>
                        <FaStar color="#FF8906"/>
                    </div>
                    <div className="flex gap-3 items-center [&>p]:text-[#4F5665]">
                        <p>200+ Reviews</p>
                        <div className="h-5 w-px border border-[#4F5665]"></div>
                        <p>Recommendation</p>
                        <FiThumbsUp size={24} color="#FF8906"/>
                    </div>
                    <p className="text-[#4F5665]">{dataToShow.description}</p>
                    <div className="flex gap-8 w-fit items-center">
                        <button onClick={minQty} className="w-8 h-8 cursor-pointer border border-[#FF8906] rounded">-</button>
                        <p>{qty}</p>
                        <button onClick={addQty}className="w-8 h-8 cursor-pointer bg-[#FF8906] rounded">+</button>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h2 className="font-bold">Choose Size</h2>
                        <div className="flex gap-3">
                            {
                                dataToShow.sizes && dataToShow.sizes.length > 0 ? (
                                    dataToShow.sizes.map((item, idx) => {
                                        return (
                                            <button key={idx} onClick={()=> setSize(item.name)} className={`border px-3 py-1 w-full cursor-pointer ${size === item.name ? "border-[#FF8906]" : "border-[#E8E8E8]"}`}>{item.name}</button>
                                        )
                                    })
                                ) : (
                                    ["Regular", "Medium", "Large"].map((item, idx) => {
                                        return (
                                            <button key={idx} onClick={()=> setSize(item)} className={`border px-3 py-1 w-full cursor-pointer ${size === item ? "border-[#FF8906]" : "border-[#E8E8E8]"}`}>{item}</button>
                                        )
                                    })
                                )
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h2 className="font-bold">Choose Variant</h2>
                        <div className="flex gap-3">
                            {
                                dataToShow.variants && dataToShow.variants.length > 0 ? (
                                    dataToShow.variants.map((item, idx) => {
                                        return (
                                            <button key={idx} onClick={()=> setVariant(item.name)} className={`border px-3 py-1 w-full cursor-pointer ${variant === item.name ? "border-[#FF8906]" : "border-[#E8E8E8]"}`}>{item.name}</button>
                                        )
                                    })
                                ) : (
                                    ["Ice", "Hot"].map((item, idx) => {
                                        return (
                                            <button key={idx} onClick={()=> setVariant(item)} className={`border px-3 py-1 w-full cursor-pointer ${variant === item ? "border-[#FF8906]" : "border-[#E8E8E8]"}`}>{item}</button>
                                        )
                                    })
                                )
                            }
                        </div>
                    </div>
                    <div className="flex gap-3 *:w-full">
                        <Link to={'/checkout-product'}><Button label={"Buy"} variant={"primary"} onClick={addToCart} /></Link>
                        <button className="flex items-center gap-2 md:gap-4 justify-center border border-[#FF8906] text-[#FF8906] p-2 rounded hover:bg-orange-50 cursor-pointer" onClick={addToCart}>
                            <BsCart3 size={20} /> add to cart
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default ProductDetail
