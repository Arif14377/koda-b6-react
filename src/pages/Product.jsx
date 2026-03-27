import Navbar from "../components/Navbar"
import bgTitle from "../../public/assets/images/bg-header-product.jpg"
import PromoSlider from '../components/PromoSlider';
import FilterSidebar from '../components/FilterSidebar';
import ProductCardUpdated from '../components/ProductCardUpdated';
import { IoArrowForward } from 'react-icons/io5';
import { getData } from "../lib/fetch";
import Footer from "../components/Footer";
import ReusableTitle from "../components/ReusableTitle"
import {useEffect, useState} from "react";

const URL = "http://localhost:8888/products"

function Product() {
    // Dummy Data Product (hasil fetch JSON)
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState({ search: '', category: [], promo: [] });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await getData(URL);
                console.log("API Result:", result); // Debug log
                if (result.success) {
                    setProducts(result.results);
                }
            } catch (error) {
                console.error("Gagal mengambil produk:", error);
            }
        }
        fetchProducts();
    }, []);

    function onFilter(values) {
        setFilter(values);
    }

    // console.log(filter);

    const filtered = products.filter(item => {
        const nameMatch = item.name.toLowerCase().includes(filter.search.toLowerCase().trim());
        
        // filter category dan promo kosong, return berdasarkan pencarian saja (default string kosong)
        if (!filter.category || !filter.promo || (filter.category.length === 0 && filter.promo.length === 0)) {
            return nameMatch;
        }
        
        // Selebihnya biarkan karena API baru mungkin belum sedia kategori di list.
        // Namun kita harus pastikan item.category dan item.promo ada (atau default ke [])
        const itemCategories = item.category || [];
        const itemPromo = item.promo || [];

        const categoryMatch = filter.category.length === 0 || filter.category.some(cat => {
            return itemCategories.includes(cat)
        });

        const promoMatch = filter.promo.length === 0 || filter.promo.some(promo => {
            return itemPromo.includes(promo)
        });

        return nameMatch && categoryMatch && promoMatch;
    })

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
                <ReusableTitle>Today <span>Promo</span></ReusableTitle>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="shrink-0 hidden md:block">
                        <FilterSidebar onFilter={onFilter}/>
                    </div>
                    <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filtered.map(product => (
                                <ProductCardUpdated
                                    key={product.id}
                                    id={product.id}
                                    image={product.image}
                                    name={product.name}
                                    description={product.description}
                                    rating={product.rating}
                                    oldPrice={product.oldPrice}
                                    price={product.price}
                                    isFlashSale={product.isFlashSale}
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