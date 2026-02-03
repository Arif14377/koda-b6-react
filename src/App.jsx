import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Product from "./pages/Product"
import ProductDetail from "./pages/ProductDetail"
import CheckoutProduct from "./pages/CheckoutProduct"
import History from "./pages/History"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/product",
    element: <Product/>
  },
  {
    path: "/product-detail/:id",
    element: <ProductDetail />
  },
  {
    path: "/checkout-product",
    element: <CheckoutProduct />
  },
  {
    path: "/history",
    element: <History />
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App