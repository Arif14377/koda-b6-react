import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function OrderDetail() {
    return (
        <div>
            <Navbar variants={"black"} />
            <div className="grid grid-cols-3 md:grid-cols-5 mt-17.5 py-20 px-20 gap-4">
                <div className="col-span-5">
                    <h1 className="text-5xl font-medium">Order #12345-09876</h1>
                    <p>21 March 2023 at 10.30 AM</p>
                </div>
                {/* Bagian kiri */}
                <div>
                    <h2>Order Information</h2>
                    <table>
                        <td>
                            <tr></tr>
                        </td>
                    </table>
                </div>
                {/* Bagian kanan */}
            </div>
            <Footer/>
        </div>
    )
}

export default OrderDetail