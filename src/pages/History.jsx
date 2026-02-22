import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function History() {
    const [history, setHistory] = useState([])
    const user = useSelector(state => state.session.user)
    
    useEffect(()=>{
        const pull = JSON.parse(localStorage.getItem("history")) || []
        if (pull.length === 0) {
            setHistory(pull)
        } else {
            const hist = pull.filter(item => {
                return item.UID === user.id
            })
            setHistory(hist)
        }
    }, [user.id])
    
    
    return (
        <div>
            <Navbar variants={"black"} />
            <div className="mt-17.5 py-20 px-20">
                <h1 className="text-5xl font-medium">History Order</h1>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-2">
                        {history.length === 0 ? (
                            <div className="p-6 bg-[#F5F5F5] rounded">No history found.</div>
                        ) : (
                            history.map(order => (
                                <div key={order.id} className="flex items-center justify-between bg-[#E8E8E84D] p-4 rounded mb-4">
                                    <div className="flex gap-4 items-center">
                                        <img src={order.items?.[0]?.img} alt={order.items?.[0]?.name || "order"} className="w-20 h-20 object-cover rounded" />
                                        <div>
                                            <p className="text-sm text-gray-500">No. Order <span className="font-medium">#{order.id}</span></p>
                                            <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleString()}</p>
                                            <p className="text-sm font-semibold">IDR {Number(order.total).toLocaleString("id-ID")}</p>
                                        </div>
                                    </div>
                                    <div className="text-sm flex flex-col gap-2">
                                        <span className="px-3 py-1 bg-[#FF8906] text-white rounded">Completed</span>
                                        <Link to={`/order-detail/${order.id}`} className="ml-3 text-[#FF8906] underline">
                                            Lihat Detail
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div>
                        <div className="bg-white p-4 rounded shadow flex flex-col gap-4">
                            <h3 className="font-medium mb-2">Send Us Message</h3>
                            <p className="text-sm text-gray-600">if your unable to find answer or find your product quickly, please describe your problem and tell us. we will give you solution.</p>
                            <a href="#" className="bg-[#FF8906] py-1 px-2 rounded flex justify-center items-center">Send Message</a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default History
