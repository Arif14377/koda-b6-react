import {useEffect, useState} from "react"
import { getData } from "../lib/fetch"
import Navbar from "../components/Navbar"
import { useParams } from "react-router-dom"
import { FaStar } from "react-icons/fa";
import { FiThumbsUp } from "react-icons/fi";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { BsCart3 } from 'react-icons/bs';

const URL = "https://raw.githubusercontent.com/Arif14377/koda-b6-react/refs/heads/main/data.json"

function ProductDetail() {
    const [data, setData] = useState([])
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("Regular")
    const [variant, setVariant] = useState("Ice")
    const [_, setCart] = useState([])

    useEffect(() => {
        async function fetchData() {
            const result = await getData(URL)
            setData(result)
        }
        fetchData()
    }, []);

    const {id} = useParams()
    const isProductExist = data.some(data => data.id === Number(id))
    const dataToShow = data.find(data => data.id === Number(id))
    
    
    if(!isProductExist) {
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
    const pullCart = JSON.parse(localStorage.getItem("cart"))

    const productToCart = {
        id: dataToShow.id,
        name: dataToShow.name,
        oldPrice: dataToShow.oldPrice,
        price: dataToShow.price,
        img: dataToShow.imgUrl,
        isFlashSale: dataToShow.isFlashSale,
        qty: qty,
        size: size,
        variant: variant
    }
    let newCart = []

    function addToCart() {

        if(!pullCart) {
            newCart.push(productToCart)
            setCart(newCart)
            localStorage.setItem("cart", JSON.stringify(newCart))
            return
        }
        
        // Cek apakah ada produk ada di cart?
        const isExist = pullCart.find(item => 
            Number(item.id) === productToCart.id &&
            item.size === productToCart.size &&
            item.variant === productToCart.variant
        )

        if(isExist) {
            newCart = pullCart.map(item => {
                if(
                    Number(item.id) === productToCart.id &&
                    item.size === productToCart.size &&
                    item.variant === productToCart.variant
                ) {
                    return {...item, qty: item.qty + productToCart.qty}
                }
                return item
            })
        } else { 
            newCart = [productToCart, ...pullCart]
        }

        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        setQty(1);
    }

    return (
        <div>
            <Navbar variants={"black"}/>
            {/* Product Detail */}
            <div className="grid grid-cols-1 md:grid-cols-2 mt-17.5 py-20 px-32 gap-4">
                {/* Left */}
                <div className="grid grid-cols-3 grid-rows-4 gap-4">
                    <img src={dataToShow.imgUrl} alt={dataToShow.name} className="col-span-3 row-span-3 object-cover w-full" />
                    <img src={dataToShow.imgUrl} alt={dataToShow.name} className="object-cover w-full" />
                    <img src={dataToShow.imgUrl} alt={dataToShow.name} className="row-span-3 object-cover w-full" />
                    <img src={dataToShow.imgUrl} alt={dataToShow.name} className="row-span-3 object-cover w-full" />
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
                                ["Regular", "Medium", "Large"].map((item, idx) => {
                                    return (
                                        <button key={idx} onClick={()=> setSize(item)} className={`border px-3 py-1 w-full cursor-pointer ${size === item ? "border-[#FF8906]" : "border-[#E8E8E8]"}`}>{item}</button>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h2 className="font-bold">Hot/Ice?</h2>
                        <div className="flex gap-3">
                            {
                                ["Ice", "Hot"].map((item, idx) => {
                                    return (
                                        <button key={idx} onClick={()=> setVariant(item)} className={`border px-3 py-1 w-full cursor-pointer ${variant === item ? "border-[#FF8906]" : "border-[#E8E8E8]"}`}>{item}</button>
                                    )
                                })
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
        </div>
    )
}

export default ProductDetail