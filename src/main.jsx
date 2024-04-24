import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider as ProviderRedux } from "react-redux";
import Store from "./Stores/Store.js";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/index.jsx";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider>
      <ProviderRedux store={Store}>
        <RouterProvider router={router} />
      </ProviderRedux>
    </SnackbarProvider>
  </React.StrictMode>,
);
