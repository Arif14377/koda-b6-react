import Navbar from "../components/Navbar"
import bgBanner from "../assets/images/bg-gradient-black.png"
import imgBanner from "../assets/images/img-banner.png"
import ReusableTitle from "../components/ReusableTitle"
import ambassador from "../assets/images/ambassador.png"
import { FaCheckCircle } from "react-icons/fa";
import ProductCard from "../components/ProductCard"
import hazelnut from "../assets/images/hazelnut-latte.png"
import cappucino from "../assets/images/cappucino.png"
import gorengan from "../assets/images/gorengan.png"
import caramelMacchiato from "../assets/images/caramel-macchiato.png"
import affogato from "../assets/images/cappucino.png"
import stores from "../assets/images/stores-map.png"
import viez from "../assets/images/img-viez.png"
import { IoStar, IoArrowForwardCircle, IoArrowBackCircleSharp } from "react-icons/io5";
import bgTesti from "../assets/images/bg-testimonial.png"

export function Home() {
    const data = [
        {
            id: 1,
            alt: "Hazelnut Latte",
            name: "Hazelnut Latte",
            description: "You can explore the menu that we provide with fun and have their own taste and make your day better.",
            price: 30000,
            promoPrice: 26000,
            imgUrl: hazelnut,
            flashSale: true
        },
        {
            id: 2,
            alt: "Cappucino",
            name: "Cappucino",
            description: "You can explore the menu that we provide with fun and have their own taste and make your day better.",
            price: 35000,
            promoPrice: 29000,
            imgUrl: cappucino,
            flashSale: false
        },
        {
            id: 3,
            alt: "Gorengan",
            name: "Gorengan",
            description: "You can explore the menu that we provide with fun and have their own taste and make your day better.",
            price: 31000,
            promoPrice: 25000,
            imgUrl: gorengan,
            flashSale: true
        },
        {
            id: 4,
            alt: "Caramel Macchiato",
            name: "Caramel Macchiato",
            description: "You can explore the menu that we provide with fun and have their own taste and make your day better.",
            price: 27000,
            promoPrice: 24000,
            imgUrl: caramelMacchiato,
            flashSale: true
        },
        {
            id: 5,
            alt: "Affogato",
            name: "Affogato",
            description: "You can explore the menu that we provide with fun and have their own taste and make your day better.",
            price: 20000,
            promoPrice: 17000,
            imgUrl: affogato,
            flashSale: true
        }
    ]


    return (
        <div>
            <Navbar variants={"black"}/>
            <main>
                {/* Hero Banner */}
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12" style={{ backgroundImage: `url(${bgBanner})` }}>
                        <h1 className="text-5xl text-white md:text-6xl font-semibold leading-tight mb-6">
                        Start Your Day with <br />
                        Coffee and Good <br />
                        Meals
                        </h1>
                        <p className="text-gray-400 text-sm md:text-base mb-10 leading-relaxed max-w-md">
                        We provide high quality beans, good taste, and healthy meals made by love just for you. Start your day with us for a bigger smile!
                        </p>
                        <div className="mb-12">
                            <button className="bg-orange-500 text-black font-semibold px-8 py-4 rounded shadow-lg hover:bg-orange-600 transition">
                            Get Started
                            </button>
                        </div>
                        <div className="flex gap-8 md:gap-12">
                            <div>
                                <h3 className="text-4xl font-bold text-orange-500">90+</h3>
                                <p className="text-gray-400 mt-1">Staff</p>
                            </div>
                            <div className="w-px h-12 bg-gray-600 self-center"></div>
                            <div>
                                <h3 className="text-4xl font-bold text-orange-500">30+</h3>
                                <p className="text-gray-400 mt-1">Stores</p>
                            </div>
                            <div className="w-px h-12 bg-gray-600 self-center"></div>
                            <div>
                                <h3 className="text-4xl font-bold text-orange-500">800+</h3>
                                <p className="text-gray-400 mt-1">Customer</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img
                        src={imgBanner}
                        alt="Coffee"
                        className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                {/* Values Proposition */}
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="w-2/3 flex flex-col justify-center items-center m-auto gap-6">
                        <ReusableTitle>We Provide <span>Good Coffee</span> and <span>Healthy Meals</span></ReusableTitle>
                        <p>You can explore the menu that we provide with fun and have their own taste and make your day better.</p>
                        <div className="flex flex-col gap-6 text-[#464646]">
                            <div className="flex gap-4">
                                <FaCheckCircle color="#2FAB73" size={20}/>
                                <p>High quality beans</p>
                            </div>
                            <div className="flex gap-4">
                                <FaCheckCircle color="#2FAB73" size={20}/>
                                <p>Healthy meals, you can request the ingredients</p>
                            </div>
                            <div className="flex gap-4">
                                <FaCheckCircle color="#2FAB73" size={20}/>
                                <p>Chat with our staff to get better experience for ordering</p>
                            </div>
                            <div className="flex gap-4">
                                <FaCheckCircle color="#2FAB73" size={20}/>
                                <p>Free member card with a minimum purchase of IDR 200.000.</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src={ambassador} alt="ambassador" />
                    </div>
                </div>
                {/* Recommended Product */}
                <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 gap-8">
                    <div className="flex flex-col items-center gap-6">
                        <ReusableTitle>Here is People’s <span>Favorite</span></ReusableTitle>
                        <p>Let’s choose and have a bit taste of poeple’s favorite. It might be yours too!</p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-4">
                        {
                            data.map((data, idx)=>{
                                return (
                                    <ProductCard key={data.id} image={data.imgUrl} title={data.name} desc={data.description} price={data.price}/>
                                )
                            })
                        }
                    </div>
                </div>
                {/* Map Stores */}
                <div className="flex flex-col px-8 md:px-16 lg:px-24 py-12 gap-12 items-center">
                    <ReusableTitle><span>Visit Our Store</span> in the Spot on the Map Below</ReusableTitle>
                    <p>You can explore the menu that we provide with fun and have their own taste and make your day better.</p>
                    <img src={stores} alt="store location" />
                </div>
                {/* Testimonial */}
                <div className="flex flex-col md:flex-row gap-4 px-16 py-12" style={{ backgroundImage: `url(${bgTesti})` }}>
                    <img src={viez} alt="Viez Robert - Customer" />
                    <div className="flex flex-col gap-5 text-white">
                        <p>Testimonial</p>
                        <h2 className="text-white font-medium text-4xl">Viez Robert</h2>
                        <p className="text-[#FF8906]">Manager coffee shop</p>
                        <p>“Wow... I am very happy to spend my whole day here. the Wi-fi is good, and the coffee and meals tho. I like it here!! Very recommended!</p>
                        <div className="flex gap-2 items-center">
                            <IoStar className="text-[#FF8906]"/>
                            <IoStar className="text-[#FF8906]"/>
                            <IoStar className="text-[#FF8906]"/>
                            <IoStar className="text-[#FF8906]"/>
                            <IoStar className="text-[#FF8906]"/>
                            <span>5.0</span>
                        </div>
                        <div className="flex gap-2">
                            <IoArrowBackCircleSharp size={45}/>
                            <IoArrowForwardCircle size={45} color="#FF8906"/>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-8 h-2.5 bg-[#FF8906] rounded-full cursor-pointer"></span>
                            <span className="w-2.5 h-2.5 bg-gray-500 rounded-full hover:bg-gray-400 cursor-pointer"></span>
                            <span className="w-2.5 h-2.5 bg-gray-500 rounded-full hover:bg-gray-400 cursor-pointer"></span>
                            <span className="w-2.5 h-2.5 bg-gray-500 rounded-full hover:bg-gray-400 cursor-pointer"></span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}