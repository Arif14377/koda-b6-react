import brandLogo from "../../assets/images/brand-brown.png"
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { TiSocialInstagram } from "react-icons/ti";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-8 py-16 px-8 md:px-16 justify-center gap-4">
            <div className="flex flex-col gap-6 md:col-span-3">
                <img src={brandLogo} alt="Logo Coffee Shop" className="w-fit"/>
                <p>Coffee Shop is a store that sells some good meals, and especially coffee. We provide high quality beans</p>
                <p>&copy; 2026</p>
            </div>
            <div className="flex flex-col gap-4 w-fit"> 
                <h2 className="font-medium [&~a]:text-[#6d6d6d] text-lg">Product</h2>
                <Link to={"/product"} className="cursor-pointer">Our Product</Link>
                <a href="#">Pricing</a>
                <a href="#">Locations</a>
                <a href="#">Countries</a>
                <a href="#">Blog</a>
            </div>
            <div className="flex flex-col w-fit gap-4"> 
                <h2 className="font-medium [&~a]:text-[#6d6d6d] text-lg">Engage</h2>
                <a href="#">Partner</a>
                <a href="#">FAQ</a>
                <a href="#">Locations</a>
                <a href="#">Countries</a>
                <a href="#">Blog</a>
            </div>
            <div className="flex flex-col md:col-span-3 gap-4">
                <h2 className="font-medium [&~a]:text-[#6d6d6d] text-lg">Social Media</h2>
                <div className="flex gap-8">
                    <FaFacebookF size={32} className="bg-[#FF8906] p rounded-full p-1.5" />
                    <FaTwitter size={32} className="bg-[#FF8906] p rounded-full p-1.5" />
                    <TiSocialInstagram size={32} className="bg-[#FF8906] p rounded-full p-1.5"/>
                </div>
            </div>
        </div>
    )
}

export default Footer