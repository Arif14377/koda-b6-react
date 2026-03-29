import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import http from "../lib/http"
import { IoCalendarOutline, IoChevronDownOutline, IoArrowForward } from "react-icons/io5"
import { FiMessageSquare } from "react-icons/fi"
import { BsBoxSeam, BsClipboardCheck } from "react-icons/bs"
import { RiProgress3Line } from "react-icons/ri"

function History() {
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("On Progress")
    const token = useSelector(state => state.session.token)
    
    useEffect(() => {
        const fetchHistory = async () => {
            if (!token) {
                setLoading(false)
                return
            }
            try {
                const response = await http({
                    url: "/history",
                    opts: {
                        method: "GET",
                        token: token
                    }
                })
                if (response.success) {
                    setHistory(response.results || [])
                }
            } catch (error) {
                console.error("Gagal mengambil riwayat belanja:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchHistory()
    }, [token])
    
    const tabs = [
        { name: "On Progress", icon: <RiProgress3Line /> },
        { name: "Sending Goods", icon: <BsBoxSeam /> },
        { name: "Finish Order", icon: <BsClipboardCheck /> }
    ]
    
    return (
        <div className="bg-[#F8F8F8] min-h-screen">
            <Navbar variants={"black"} />
            <div className="pt-32 pb-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-10">
                    <h1 className="text-4xl font-semibold">History Order</h1>
                    <span className="bg-[#E8E8E8] px-3 py-1 rounded text-sm font-medium">{history.length}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        {/* Filter Bar */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="flex bg-white rounded-lg p-1 shadow-sm w-full md:w-auto">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.name}
                                        onClick={() => setActiveTab(tab.name)}
                                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                                            activeTab === tab.name 
                                            ? "bg-[#F8F8F8] text-black shadow-sm" 
                                            : "text-gray-400 hover:text-gray-600"
                                        }`}
                                    >
                                        {tab.name}
                                    </button>
                                ))}
                            </div>

                            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium">
                                <IoCalendarOutline size={18} />
                                <span>January 2023</span>
                                <IoChevronDownOutline size={16} className="ml-2" />
                            </button>
                        </div>

                        {/* History List */}
                        <div className="flex flex-col gap-4">
                            {loading ? (
                                <div className="p-10 bg-white rounded-xl shadow-sm animate-pulse text-center">Loading history...</div>
                            ) : history.length === 0 ? (
                                <div className="p-10 bg-white rounded-xl shadow-sm text-center text-gray-500 font-medium">No history found.</div>
                            ) : (
                                history.map(order => (
                                    <div key={order.id} className="bg-white p-5 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-6">
                                        <div className="w-full md:w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            {order.image ? (
                                                <img src={order.image.startsWith('http') ? order.image : `${import.meta.env.VITE_API_URL || 'http://localhost:8888'}/uploads/products/${order.image}`} alt="Product" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                    <BsBoxSeam size={32} />
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-grow w-full">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-gray-400">
                                                    <BsBoxSeam size={14} />
                                                    <span className="text-[10px] uppercase font-bold tracking-wider">No. Order</span>
                                                </div>
                                                <p className="font-bold text-sm">#{order.trx_code || order.id}</p>
                                                <Link to={`/order-detail/${order.id}`} className="text-[#FF8906] text-xs font-semibold underline">
                                                    Views Order Detail
                                                </Link>
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-gray-400">
                                                    <IoCalendarOutline size={14} />
                                                    <span className="text-[10px] uppercase font-bold tracking-wider">Date</span>
                                                </div>
                                                <p className="font-bold text-sm">{new Date(order.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-gray-400">
                                                    <RiProgress3Line size={14} />
                                                    <span className="text-[10px] uppercase font-bold tracking-wider">Total</span>
                                                </div>
                                                <p className="font-bold text-sm">Idr {Number(order.total).toLocaleString("id-ID")}</p>
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-gray-400">
                                                    <BsClipboardCheck size={14} />
                                                    <span className="text-[10px] uppercase font-bold tracking-wider">Status</span>
                                                </div>
                                                <div>
                                                    <span className="bg-[#FFF5E9] text-[#FF8906] px-3 py-1 rounded-full text-[10px] font-bold">
                                                        {order.status || 'On Progress'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Pagination */}
                        {!loading && history.length > 0 && (
                            <div className="flex items-center justify-center gap-3 mt-4">
                                <button className="w-10 h-10 rounded-full bg-[#FF8906] text-white flex items-center justify-center font-bold">1</button>
                                <button className="w-10 h-10 rounded-full bg-[#E8E8E8] text-gray-500 flex items-center justify-center font-bold hover:bg-gray-300 transition-colors">2</button>
                                <button className="w-10 h-10 rounded-full bg-[#E8E8E8] text-gray-500 flex items-center justify-center font-bold hover:bg-gray-300 transition-colors">3</button>
                                <button className="w-10 h-10 rounded-full bg-[#E8E8E8] text-gray-500 flex items-center justify-center font-bold hover:bg-gray-300 transition-colors">4</button>
                                <button className="w-10 h-10 rounded-full bg-[#FF8906] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                    <IoArrowForward size={20} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6 sticky top-32">
                            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white">
                                <FiMessageSquare size={24} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-bold">Send Us Message</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    if your unable to find answer or find your product quickly, please describe your problem and tell us. we will give you solution.
                                </p>
                            </div>
                            <button className="bg-[#FF8906] hover:bg-[#e07805] text-white py-4 rounded-xl font-bold transition-all shadow-md">
                                Send Message
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default History
