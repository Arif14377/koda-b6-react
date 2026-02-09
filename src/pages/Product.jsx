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

const URL = "https://raw.githubusercontent.com/Arif14377/koda-b6-react/refs/heads/main/data.json"

function Product() {
    // Dummy Data Product (hasil fetch JSON)
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState({ search: '', category: [], promo: [] });

    useEffect(() => {
        const fetchProducts = async () => {
            const result = await getData(URL);
            setProducts(result)
        }
        fetchProducts();
    }, []);

    function onFilter(values) {
        setFilter(values);
    }

    console.log(filter);

    const filtered = products.filter(item => {
        console.log("category item : ", item.category);
        console.log("promo item : ", item.promo)
        if (filter.category.length === 0 && filter.promo.length === 0) {
            return item.name.includes(filter.search)
        } else if (filter.category.length >= 1) {
            return item.name.toLowerCase().includes(filter.search.toLowerCase()) && filter.category.some(cat => {
                return item.category.includes(cat)
            })
        } else if (filter.promo.length >= 1) {
            return item.name.toLowerCase().includes(filter.search.toLowerCase()) && filter.promo.some(promo => {
                return item.promo.includes(promo)
            })
        }
        return (
            item.name.toLowerCase().includes(filter.search.toLowerCase()) &&
            filter.category.some(cat => {
                return item.category.includes(cat)
            }) &&
                filter.promo.some(promo => {
                    return item.promo.includes(promo)
                })
        )
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
                                    imgUrl={product.imgUrl}
                                    name={product.name}
                                    desc={product.description}
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