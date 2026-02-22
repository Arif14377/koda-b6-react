import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { BsPerson } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { FaRegCreditCard } from "react-icons/fa6";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GrCycle } from "react-icons/gr";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function OrderDetail() {
    const [selectedOrder, setSelectedOrder] = useState(null)
    const user = useSelector(state => state.session.user)
    const { orderId } = useParams()
    
    useEffect(()=>{
        if (!user?.id) {
            setSelectedOrder(null)
            return
        }

        const pull = JSON.parse(localStorage.getItem("history")) || []
        const userOrders = pull.filter(item => item.UID === user.id)
        const detailOrder = userOrders.find(item => String(item.id) === String(orderId))
        setSelectedOrder(detailOrder || null)
    }, [user?.id, orderId])

    const items = selectedOrder?.items || []
    
    return (
        <div>
            <Navbar variants={"black"} />
            <div className="mt-17.5 py-20 px-20">
                <h1 className="text-5xl font-medium">Order #{selectedOrder?.id || "-"}</h1>
                <p>{selectedOrder?.date ? new Date(selectedOrder.date).toLocaleString() : "-"}</p>
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
                                <td>IDR {Number(selectedOrder?.total || 0).toLocaleString("id-ID")}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* Bagian kanan */}
                <div className="flex flex-col gap-2">
                    {items.length > 0 ? (
                        items.map((item, idx) => (
                            <div key={`${item.id}-${item.size}-${item.variant}-${idx}`} className="flex gap-3 items-center justify-between bg-[#E8E8E84D] py-2 px-2">
                                <div className="flex gap-6">
                                    <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                    <div>
                                        {item.isFlashSale && <p className="text-sm text-red-600 font-semibold">Flash Sale</p>}
                                        <h3 className="font-medium">{item.name}</h3>
                                        <p className="text-sm text-gray-500">{item.qty || 1}pcs | {item.size} | {item.variant}</p>
                                        <p className="font-semibold">IDR {(item.price * (item.qty || 1)).toLocaleString("id-ID")}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-[#E8E8E84D] py-4 px-4 rounded">
                            No order detail found.
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default OrderDetail
