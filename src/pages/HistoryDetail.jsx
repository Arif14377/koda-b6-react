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
import http from "../lib/http";

function OrderDetail() {
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const token = useSelector(state => state.session.token)
    const { orderId } = useParams()
    
    useEffect(() => {
        const fetchOrderDetail = async () => {
            if (!token || !orderId) {
                setLoading(false)
                return
            }
            try {
                const response = await http(`http://localhost:8888/history/${orderId}`, "GET", null, token)
                if (response.success) {
                    setSelectedOrder(response.results)
                }
            } catch (error) {
                console.error("Gagal mengambil detail order:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchOrderDetail()
    }, [token, orderId])

    const items = selectedOrder?.items || []
    
    return (
        <div>
            <Navbar variants={"black"} />
            {loading ? (
                <div className="mt-17.5 py-20 px-20 text-center min-h-screen">
                    <p className="text-2xl animate-pulse">Loading order detail...</p>
                </div>
            ) : !selectedOrder ? (
                <div className="mt-17.5 py-20 px-20 text-center min-h-screen">
                    <p className="text-2xl">Order not found.</p>
                </div>
            ) : (
                <>
                    <div className="mt-17.5 py-20 px-20">
                        <h1 className="text-5xl font-medium">Order #{selectedOrder?.trx_code || selectedOrder?.id}</h1>
                        <p>{selectedOrder?.date ? new Date(selectedOrder.date).toLocaleString() : "-"}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 px-20 gap-4 mb-20">
                        {/* Bagian kiri */}
                        <div>
                            <h2>Order Information</h2>
                            <table className="w-full">
                                <tbody className="[&>tr]:h-15 [&>tr]:flex [&>tr]:items-center [&>tr]:justify-between [&>tr]:border-b [&>tr]:border-b-gray-300">
                                    <tr>
                                        <td className="flex gap-2 items-center"><BsPerson /> Full Name</td>
                                        <td>{selectedOrder?.full_name || "-"}</td>
                                    </tr>
                                    <tr>
                                        <td className="flex gap-2 items-center"><IoLocationOutline /> Address</td>
                                        <td>{selectedOrder?.address || "-"}</td>
                                    </tr>
                                    <tr>
                                        <td className="flex gap-2 items-center"><FiPhoneCall /> Email</td>
                                        <td>{selectedOrder?.email || "-"}</td>
                                    </tr>
                                    <tr>
                                        <td className="flex gap-2 items-center"><FaRegCreditCard /> Payment Method</td>
                                        <td>{selectedOrder?.payment_method || "-"}</td>
                                    </tr>
                                    <tr>
                                        <td className="flex gap-2 items-center"><LiaShippingFastSolid /> Shipping</td>
                                        <td>{selectedOrder?.delivery_method || "-"}</td>
                                    </tr>
                                    <tr>
                                        <td className="flex gap-2 items-center w-fit"><GrCycle /> Status</td>
                                        <td><p className={`w-fit rounded-full px-2 ${selectedOrder?.status === 'Completed' ? 'bg-[#74edb4] text-[#00a055]' : 'bg-orange-100 text-orange-600'}`}>{selectedOrder?.status || "Processing"}</p></td>
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
                                    <div key={`${item.id}-${item.size_name}-${item.variant_name}-${idx}`} className="flex gap-3 items-center justify-between bg-[#E8E8E84D] py-2 px-2">
                                        <div className="flex gap-6">
                                            <img src={item.image || "https://placehold.co/200x200?text=No+Image"} alt={item.product_name} className="w-20 h-20 object-cover rounded" />
                                            <div>
                                                <h3 className="font-medium">{item.product_name}</h3>
                                                <p className="text-sm text-gray-500">
                                                    {item.quantity}pcs 
                                                    {item.size_name && ` | ${item.size_name}`} 
                                                    {item.variant_name && ` | ${item.variant_name}`}
                                                </p>
                                                <p className="font-semibold">IDR {(item.price * item.quantity).toLocaleString("id-ID")}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-[#E8E8E84D] py-4 px-4 rounded">
                                    No items found for this order.
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
            <Footer/>
        </div>
    )
}

export default OrderDetail
