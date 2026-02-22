import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import CheckoutProduct from "./pages/CheckoutProduct";
import History from "./pages/History";
import OrderDetail from "./pages/HistoryDetail";
import Profile from "./pages/Profile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ForgotPassword } from "./pages/ForgotPassword";
import store, { persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/product",
    element: <Product />,
  },
  {
    path: "/product-detail/:id",
    element: <ProductDetail />,
  },
  {
    path: "/checkout-product",
    element: <CheckoutProduct />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/order-detail/:orderId",
    element: <OrderDetail/>
  }
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
