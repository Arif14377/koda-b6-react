import { BiCoffee } from 'react-icons/bi'; // Icon Logo
import { FiSearch, FiShoppingCart } from 'react-icons/fi'; // Icon Search & Cart
import brandWhite from "../assets/images/brand-white.png"

function Navbar ({variants}) {
    const base = "grid grid-cols-2 px-6 py-4 text-white"
    const variant = {
        transparant: "bg-[#20202067]",
        black: "bg-[#202020]"
    }
    return (
    <nav className={`${base} ${variant[variants]}`} >
        <div className='flex justify-between items-center'>
            <img src={brandWhite} alt="logo coffee shop" />
            <div className='hidden md:flex gap-8 text-sm font-medium'>
                <a href='' className='text-white'>Home</a>
                <a href='#' className='text-gray-400 hover:text-white'>Product</a>
            </div>
        </div>
        <div className="flex items-center justify-end gap-6">
            <FiSearch className="text-xl cursor-pointer hover:text-orange-500 transition" />
            <FiShoppingCart className="text-xl cursor-pointer hover:text-orange-500 transition" />
            
            <div className="flex gap-4 ml-2">
                <a className="px-5 py-2 border border-gray-500 rounded text-sm hover:border-white transition cursor-pointer">
                    SignIn
                </a>
                <a className="px-5 py-2 bg-orange-500 rounded text-sm font-medium hover:bg-orange-600 transition shadow-lg shadow-orange-500/30 cursor-pointer">
                    Sign Up
                </a>
            </div>
        </div>
    </nav>
    );
};

export default Navbar;