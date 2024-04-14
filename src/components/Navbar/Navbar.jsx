import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown, FaCartShopping } from "react-icons/fa6";
import DarkMode from "./DarkMode";
import orders, { getOrder } from "../../Stores/project/orders";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Drawer } from "@mui/material";
import SideBar from "../SideBar/SideBar";

const MenuLinks = [
  {
    id: 1,
    name: "products",
    link: "/products",
  },
  // {
  //   id: 3,
  //   name: "About",
  //   link: "/#about",
  // },
  // {
  //   id: 4,
  //   name: "Blogs",
  //   link: "/#blog",
  // },
];

// const DropdownLinks = [
//   {
//     id: 1,
//     name: "Trending Products",
//     link: "/#",
//   },
//   {
//     id: 2,
//     name: "Best Selling",
//     link: "/#",
//   },
//   {
//     id: 3,
//     name: "Top Rated",
//     link: "/#",
//   },
// ];
const Navbar = ({ hideCart, links, logo, logoLink }) => {
  const orders = useSelector(getOrder);
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
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
"
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
                          to={data.link}
                          className="inline-block px-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200"
                        >
                          {" "}
                          {data.name}
                        </Link>
                      </li>
                    ))}
                {/*     Dropdown 
                <li className="relative cursor-pointer group">
                  <a
                    href="#"
                    className="flex items-center gap-[2px] font-semibold text-gray-500 dark:hover:text-white py-2"
                  >
                    Quick Links
                    <span>
                      <FaCaretDown className="group-hover:rotate-180 duration-300" />
                    </span>
                  </a>

                 Dropdown Links
                  <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white shadow-md dark:bg-gray-900 p-2 dark:text-white ">
                    <ul className="space-y-2">
                      {DropdownLinks.map((data, index) => (
                        <li key={index}>
                          <a
                            className="text-gray-500  dark:hover:text-white duration-200 inline-block w-full p-2 hover:bg-primary/20 rounded-md font-semibold"
                            href={data.link}
                          >
                            {data.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              */}
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
                  {orders.length}
                </div>
              </button>
            )}
            {/* Dark Mode section */}
            <div>
              {/* <DarkMode /> */}
              <Button
                onClick={() => {
                  navigate("/login");
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
          </div>
        </div>
      </div>
      <SideBar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </div>
  );
};

export default Navbar;

// overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] flex justify-center items-center
