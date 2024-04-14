import { createBrowserRouter } from "react-router-dom";
import Products from "./Products";
import ProductDetails from "./ProductDetails";
import Login from "./Login";
import Register from "./Register";
import Store from "./Store";
import Home from "./Home";
import Stores from "./Stores";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/stores",
    element: <Stores />,
  },
  {
    path: "/store/:storeName",
    element: <Store />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
