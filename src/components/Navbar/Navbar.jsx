import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown, FaCartShopping } from "react-icons/fa6";
import DarkMode from "./DarkMode";
import orders, { getOrder } from "../../Stores/project/orders";
import { useSelector } from "react-redux";
import {
  Link,
  useLocation,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import { Button, Drawer } from "@mui/material";
import SideBar from "../SideBar/SideBar";
import { selectUser } from "../../Stores/project/auth";

const MenuLinks = [
  {
    id: 1,
    name: "products",
    link: "/products",
  },
];
const Navbar = ({ hideCart, links, logo, logoLink, hideSignIn }) => {
  const orders = useSelector(getOrder);
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
  const [openDrawer, setOpenDrawer] = useState(false);
  const { pathname } = useLocation();
  const user = useSelector(selectUser);
  const ifUserLoggedIn = user?.email;

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      <div className="py-4">
        <div className="container flex justify-between items-center">
          {/* Logo and Links section */}
          <div className="flex items-center gap-4">
            {/* TODO:add link for store here */}
            <Link
              to={logoLink ? logoLink : "/"}
              className="text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl
              w-[150px] truncate"
            >
              {logo ? logo : "LOGO here"}
            </Link>
            {/* Menu Items */}
            <div className="hidden lg:block">
              <ul className="flex items-center gap-4">
                {links
                  ? links.map((data, index) => (
                      <li key={index}>
                        <Link
                          to={data.to}
                          className="inline-block px-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200"
                        >
                          {data.title}
                        </Link>
                      </li>
                    ))
                  : MenuLinks.map((data, index) => (
                      <li key={index}>
                        <Link
                          to={data.link + `?email=${email}`}
                          className="inline-block px-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200"
                        >
                          {" "}
                          {data.name}
                        </Link>
                      </li>
                    ))}
              </ul>
            </div>
          </div>

          {/* Navbar Right section */}
          <div className="flex justify-between items-center gap-4">
            {/* Order-button section */}
            {hideCart ? null : (
              <button
                className="relative p-3"
                onClick={() => setOpenDrawer(true)}
              >
                <FaCartShopping className="text-xl text-gray-600 dark:text-gray-400" />
                <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
                  {orders.reduce((acc, order) => acc + order.qty, 0)}
                </div>
              </button>
            )}
            {/* Dark Mode section */}
            {hideSignIn || ifUserLoggedIn ? null : (
              <div>
                {/* <DarkMode /> */}
                <Button
                  onClick={() => {
                    console.log(pathname);
                    // navigate(`/login?redirect=${pathname}`);
                  }}
                  sx={{
                    backgroundColor: "black",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "black",
                    },
                  }}
                >
                  Sign In
                </Button>
              </div>
            )}
            {ifUserLoggedIn ? (
              <div>
                {/* <DarkMode /> */}
                <Button
                  // onClick={() => {
                  //   navigate(`/login?redirect=${pathname}`);
                  // }}
                  sx={{
                    backgroundColor: "black",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "black",
                    },
                  }}
                >
                  Sign Out
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <SideBar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </div>
  );
};

export default Navbar;

// overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] flex justify-center items-center
