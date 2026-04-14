import {useEffect, useState} from "react"
import http from "../lib/http"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useParams, useNavigate } from "react-router-dom"
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiThumbsUp } from "react-icons/fi";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { BsCart3 } from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";
import {addCart, updateCart} from '../redux/reducers/cartReducer'
import ProductCardUpdated from "../components/ProductCardUpdated"
import ReusableTitle from "../components/ReusableTitle"

const URL = "http://localhost:8888/products"

function ProductDetail() {
    const [dataToShow, setDataToShow] = useState(null)
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState(null)
    const [variant, setVariant] = useState(null)
    const [bigImage, setBigImage] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [recommendations, setRecommendations] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 3
    const user = useSelector(state => state.session.user)
    const isLogin = useSelector(state => state.session.isLogin)
    const token = useSelector(state => state.session.token)
    const cart = useSelector(state => state.cart.carts)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {id} = useParams()

    // ambil data product
    useEffect(() => {
        async function fetchData() {
            try {
                const result = await http({
                    url: `/products/${id}`,
                    opts: { method: "GET" }
                })
                if (result.success) {
                    setDataToShow(result.results)
                    if (result.results.image) {
                        setBigImage(result.results.image)
                    } else if (result.results.images && result.results.images.length > 0) {
                        setBigImage(result.results.images[0].path)
                    }
                    if (result.results.sizes && result.results.sizes.length > 0) {
                        setSize({name: result.results.sizes[0].name, addPrice: result.results.sizes[0].addPrice})
                    }
                    if (result.results.variants && result.results.variants.length > 0) {
                        setVariant({name: result.results.variants[0].name, addPrice: result.results.variants[0].addPrice})
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

    // Ambil data rekomendasi
    useEffect(() => {
        if (dataToShow) {
            async function fetchRecommendations() {
                try {
                    const result = await http({
                        url: "/products",
                        opts: { method: "GET" }
                    })
                    if (result.success) {
                        const filtered = result.results.filter(item => {
                            const isSameCategory = item.category?.some(cat => dataToShow.category?.includes(cat))
                            return isSameCategory && item.id !== dataToShow.id
                        })
                        setRecommendations(filtered)
                        setCurrentPage(1)
                    }
                } catch (error) {
                    console.error("Gagal mengambil rekomendasi:", error)
                }
            }
            fetchRecommendations()
        }
    }, [dataToShow]);

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
    const dynamicPrice = dataToShow.price + (size?.addPrice || 0) + (variant?.addPrice || 0)
    const productToCart = {
        UID: user?.id || "",
        id: Number(id),
        name: dataToShow.name,
        price: dynamicPrice,
        qty: qty,
        size: size?.name || null,
        variant: variant?.name || null,
        img: dataToShow.image || (dataToShow.images && dataToShow.images.length > 0 ? dataToShow.images[0].path : ""),
        isFlashSale: dataToShow.isFlashSale || false
    }
    // let newCart = []

    async function addToCart(redirect = false) {
        // jika belum login
        if(!isLogin) {
            alert("Anda belum login. Login terlebih dahulu.")
            navigate("/login")
            return
        }

        try {
            // Persiapkan data untuk backend
            const cartData = {
                productId: productToCart.id,
                quantity: productToCart.qty,
                sizeId: size ? dataToShow.sizes?.find(s => s.name === size.name)?.id : null,
                variantId: variant ? dataToShow.variants?.find(v => v.name === variant.name)?.id : null
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
                if (redirect) navigate("/checkout-product")
            }
        } catch (error) {
            console.error("Gagal menambah ke keranjang:", error)
            alert(error.message || "Gagal menambahkan produk ke keranjang. Silakan coba lagi.")
        }
    }

    // Logic Pagination
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = recommendations.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(recommendations.length / itemsPerPage)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

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
                        {dataToShow.oldPrice && Number(dataToShow.oldPrice) > 0 ? (
                            <p className="text-[#D00000] text-lg line-through">IDR {Number(dataToShow.oldPrice).toLocaleString("id-ID")}</p>
                        ) : null}
                        <p className="text-[#FF8906] text-2xl">IDR {(parseInt(dataToShow.price) + (parseInt(size?.addPrice) || 0) + (parseInt(variant?.addPrice) || 0)).toLocaleString("id-ID")}</p>
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
                        <button onClick={addQty} className="w-8 h-8 cursor-pointer bg-[#FF8906] rounded">+</button>
                    </div>
                    {
                        dataToShow.sizes && dataToShow.sizes.length > 0 && (
                            <div className="flex flex-col gap-3">
                                <h2 className="font-bold">Choose Size</h2>
                                <div className="flex gap-3">
                                    {
                                        dataToShow.sizes.map((item, idx) => {
                                            return (
                                                <button key={idx} onClick={()=> setSize({name: item.name, addPrice: item.addPrice})} className={`border px-3 py-1 w-full cursor-pointer ${size?.name === item.name ? "border-[#FF8906]" : "border-[#E8E8E8]"}`}>{item.name}</button>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }
                    {
                        dataToShow.variants && dataToShow.variants.length > 0 && (
                            <div className="flex flex-col gap-3">
                                <h2 className="font-bold">Choose Variant</h2>
                                <div className="flex gap-3">
                                    {
                                        dataToShow.variants.map((item, idx) => {
                                            return (
                                                <button key={idx} onClick={()=> setVariant({name: item.name, addPrice: item.addPrice})} className={`border px-3 py-1 w-full cursor-pointer ${variant?.name === item.name ? "border-[#FF8906]" : "border-[#E8E8E8]"}`}>{item.name}</button>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }
                    <div className="flex gap-3 *:w-full">
                        <Button label={"Buy"} variant={"primary"} onClick={() => addToCart(true)} />
                        <button className="flex items-center gap-2 md:gap-4 justify-center border border-[#FF8906] text-[#FF8906] p-2 rounded hover:bg-orange-50 cursor-pointer" onClick={() => addToCart(false)}>
                            <BsCart3 size={20} /> add to cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Recommendation Section */}
            <div className="flex flex-col px-8 md:px-16 lg:px-24 py-12 gap-12">
                <ReusableTitle>Recommendation <span>For You</span></ReusableTitle>
                
                {recommendations.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {currentItems.map((item) => (
                                <ProductCardUpdated 
                                    key={item.id} 
                                    {...item} 
                                    variants={item.variants}
                                    sizes={item.sizes}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-4 mt-8">
                                <button 
                                    onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`p-2 rounded-full border ${currentPage === 1 ? "text-gray-300 border-gray-300" : "text-[#FF8906] border-[#FF8906] cursor-pointer hover:bg-orange-50"}`}
                                >
                                    <FaChevronLeft size={20} />
                                </button>
                                
                                <div className="flex gap-2">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => paginate(i + 1)}
                                            className={`w-10 h-10 rounded-full font-bold transition-all ${
                                                currentPage === i + 1 
                                                ? "bg-[#FF8906] text-white" 
                                                : "text-gray-500 hover:bg-orange-100 cursor-pointer"
                                            }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>

                                <button 
                                    onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`p-2 rounded-full border ${currentPage === totalPages ? "text-gray-300 border-gray-300" : "text-[#FF8906] border-[#FF8906] cursor-pointer hover:bg-orange-50"}`}
                                >
                                    <FaChevronRight size={20} />
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-center text-gray-500">No recommendations found for this category.</p>
                )}
            </div>

            <Footer/>
        </div>
    )
}

export default ProductDetail
