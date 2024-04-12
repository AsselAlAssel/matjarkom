import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Products from "./Products";
import ProductDetails from "./ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
  },
]);

export default router;
