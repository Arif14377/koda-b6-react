import Navbar from "../components/Navbar"
import bgTitle from "../../public/assets/images/bg-header-product.jpg"
import PromoSlider from '../components/PromoSlider';
import FilterSidebar from '../components/FilterSidebar';
import ProductCardUpdated from '../components/ProductCardUpdated';
import { IoArrowForward } from 'react-icons/io5';
import { dataFetch } from "../lib/fetch";
import Footer from "../components/Footer";

function Product() {
    // Dummy Data Product
    const products = dataFetch

    return (
        <div>
            <Navbar variants={"black"}/>
            {/* Header */}
            <div style={{backgroundImage:`url(${bgTitle})`}} className="flex items-center w-full h-76.25 mt-6 px-20">
                <h1 className="text-white font-medium text-4xl w-4/6">We Provide Good Coffee and Healthy Meals</h1>
            </div>
            
            {/* Slider */}
            <PromoSlider/>

            {/* List Product */}
            <div className="md:px-30 px-16">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-[#8B5E3C]">
                    Our <span className="text-[#8B5E3C] border-b-4 border-orange-500">Product</span>
                    </h2>
                </div>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="shrink-0 hidden md:block">
                        <FilterSidebar />
                    </div>
                    <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {products.map(product => (
                                <ProductCardUpdated
                                    key={product.id}
                                    name={product.name}
                                    rating={product.rating}
                                    oldPrice={product.oldPrice}
                                    price={product.price}
                                    isFlashSale={product.isFlashSale}
                                    image={product.imgUrl}
                                />
                            ))}
                        </div>
                        {/* Pagination Bottom */}
                        <div className="flex justify-end items-center gap-3 mt-12">
                            <button className="w-10 h-10 rounded-full bg-orange-500 text-white font-bold shadow-lg">1</button>
                            <button className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition">2</button>
                            <button className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition">3</button>
                            <button className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition">4</button>
                            <button className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg">
                            <IoArrowForward />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer/>
        </div>
    )
}

export default Product