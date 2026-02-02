import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import brandWhite from "../../public/assets/images/brand-white.png"
import { RxHamburgerMenu } from "react-icons/rx"
import { Link } from 'react-router-dom';

function Navbar ({variants}) {
    const base = "fixed top-0 right-0 left-0 grid grid-cols-2 px-6 py-4 text-white z-10"
    const variant = {
        transparant: "bg-[#20202080]",
        black: "bg-[#202020]"
    }
    return (
    <nav className={`${base} ${variant[variants]}`} >
        <div className='flex justify-between items-center'>
            <img src={brandWhite} alt="logo coffee shop" />
            <div className='hidden md:flex gap-8 text-sm font-medium'>
                <Link to='/' className='text-white'>Home</Link>
                <Link to='/product' className='text-gray-400 hover:text-white'>Product</Link>
            </div>
        </div>
        <div className="flex items-center justify-end gap-6">
            <FiSearch className="text-xl cursor-pointer hover:text-orange-500 transition" />
            <FiShoppingCart className="text-xl cursor-pointer hover:text-orange-500 transition" />
            
            <div className="hidden md:flex gap-4 ml-2">
                <Link to='/login' className="px-5 py-2 border border-gray-500 rounded text-sm hover:border-white transition cursor-pointer">
                    SignIn
                </Link>
                <Link to='/register' className="px-5 py-2 bg-orange-500 rounded text-sm font-medium hover:bg-orange-600 transition shadow-lg shadow-orange-500/30 cursor-pointer">
                    Sign Up
                </Link>
            </div>
            <RxHamburgerMenu className='md:hidden block' size={24}/>
        </div>
    </nav>
    );
};

export default Navbar;