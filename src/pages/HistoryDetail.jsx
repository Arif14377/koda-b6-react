import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { BsPerson } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { FaRegCreditCard } from "react-icons/fa6";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GrCycle } from "react-icons/gr";

function OrderDetail() {
    return (
        <div>
            <Navbar variants={"black"} />
            <div className="mt-17.5 py-20 px-20">
                <h1 className="text-5xl font-medium">Order #12345-09876</h1>
                <p>21 March 2023 at 10.30 AM</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 px-20 gap-4">
                {/* Bagian kiri */}
                <div>
                    <h2>Order Information</h2>
                    <table className="w-full">
                        <tbody className="[&>tr]:h-15 [&>tr]:flex [&>tr]:items-center [&>tr]:justify-between [&>tr]:border-b [&>tr]:border-b-gray-300">
                            <tr>
                                <td className="flex gap-2 items-center"><BsPerson /> Full Name</td>
                                <td>Arif Rahman</td>
                            </tr>
                            <tr>
                                <td className="flex gap-2 items-center"><IoLocationOutline /> Address</td>
                                <td>Depok</td>
                            </tr>
                            <tr>
                                <td className="flex gap-2 items-center"><FiPhoneCall /> Phone</td>
                                <td>082112345678</td>
                            </tr>
                            <tr>
                                <td className="flex gap-2 items-center"><FaRegCreditCard /> Payment Method</td>
                                <td>Cash</td>
                            </tr>
                            <tr>
                                <td className="flex gap-2 items-center"><LiaShippingFastSolid /> Shipping</td>
                                <td>Dine In</td>
                            </tr>
                            <tr>
                                <td className="flex gap-2 items-center w-fit"><GrCycle /> Status</td>
                                <td><p className="bg-[#74edb4] text-[#00a055] w-fit rounded-full px-2">Done</p></td>
                            </tr>
                            <tr className="border-none">
                                <td className="flex gap-2 items-center w-fit">Total Transaction</td>
                                <td>Idr 40.000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* Bagian kanan */}
                <div>
                    
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default OrderDetail