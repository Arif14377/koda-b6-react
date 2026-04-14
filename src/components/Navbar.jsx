import { FiSearch, FiShoppingCart } from "react-icons/fi";
import brandWhite from "../../assets/images/brand-white.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdOutlineHistoryEdu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from "react";
import { logout } from "../redux/reducers/sessionReducer";

function Navbar({ variants }) {
  const isLogin = useSelector((state) => state.session.isLogin);
  const user = useSelector((state) => state.session.user);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate()
  // console.log(isLogin)

  const dispatch = useDispatch();

  const base =
    "fixed top-0 right-0 left-0 grid grid-cols-2 px-6 py-4 text-white z-999";
  const variant = {
    transparant: "bg-[#20202080]",
    black: "bg-[#202020]",
  };
  return (
    <nav className={`${base} ${variant[variants]}`}>
      <div className="flex justify-between items-center">
        <Link to="/">
          <img src={brandWhite} alt="logo coffee shop" />
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <NavLink to="/" end className={({ isActive }) => isActive ? "text-white" : "text-gray-400 hover:text-white"}>
            Home
          </NavLink>
          <NavLink to="/product" className={({ isActive }) => isActive ? "text-white" : "text-gray-400 hover:text-white"}>
            Product
          </NavLink>
        </div>
      </div>
      {!isLogin ? (
        <div className={"flex items-center justify-end gap-6"}>
          <div className="hidden md:flex gap-4 ml-2">
            <Link
              to="/login"
              className="px-5 py-2 border border-gray-500 rounded text-sm hover:border-white transition cursor-pointer"
            >
              SignIn
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 bg-[#FF8906] rounded text-sm font-medium"
            >
              Sign Up
            </Link>
          </div>
          <RxHamburgerMenu className="md:hidden block" size={24} />
        </div>
      ) : (
        <div className={"flex items-center justify-end gap-6"}>
          <Link to="/history">
            <MdOutlineHistoryEdu className="text-xl cursor-pointer hover:text-orange-500" />
          </Link>
          <Link to="/checkout-product" className="text-xl cursor-pointer">
            <FiShoppingCart />
          </Link>
          <div className="hidden md:flex md:flex-col ml-2 md:elative cursor-pointer">
            <div
              className="text-sm font-medium"
              onClick={() => setShowLogout(!showLogout)}
            >
              <FaRegUserCircle size={20} />
            </div>
            {showLogout && (
              <div className="absolute top-12 right-4 mt-2 bg-black text-white px-3 py-1 rounded">
                <Link to={'/profile'}>Profile</Link>
                <p onClick={() => {
                  dispatch(logout());
                  localStorage.removeItem("token");
                  alert("Berhasil logout.")
                  navigate("/")
                }}>Logout</p>
              </div>
            )}
          </div>
          <RxHamburgerMenu className="md:hidden block" size={24} />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
