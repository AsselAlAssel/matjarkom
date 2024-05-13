import { Stack } from "@mui/material";
import React from "react";
import { FaMobileAlt } from "react-icons/fa";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
} from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { useStoreProfile } from "../../hooks/useMerchant";

const FooterLinks = [
  {
    title: "Home",
    link: "/#",
  },
  {
    title: "About",
    link: "/#about",
  },
  {
    title: "Contact",
    link: "/#contact",
  },
  {
    title: "Blog",
    link: "/#blog",
  },
];

const Footer = ({ logo, logoLink, companyDetails }) => {
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
  const { data } = useStoreProfile(email);
  const profile = data?.data;

  console.log(data);
  return (
    <div className="dark:bg-gray-950">
      <div className="container">
        <Stack
          className="pb-5 pt-5"
          sx={{
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            justifyContent: "space-between",
          }}
        >
          {/* company details */}
          <div className="py-4 px-4">
            <Link
              to={logoLink ? logoLink : `/store?email=${email}`}
              className="text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl
"
            >
              {logo ? logo : profile?.storeName}
            </Link>
            <p className="text-gray-600 dark:text-white/70  lg:pr-24 pt-3">
              {companyDetails ? companyDetails : profile?.storeDescription}
            </p>
          </div>
          {/* Company Address */}
          <div className="py-4 px-4 col-span-2 sm:col-auto">
            <h1 className="text-xl font-bold sm:text-left mb-3">Address</h1>
            <div>
              <div className="flex items-center gap-3">
                <FaLocationArrow />
                <p>{profile?.country}</p>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <FaMobileAlt />
                <p>{profile?.phone}</p>
              </div>

              {/* social links */}
              <div className="flex items-center gap-3 mt-6">
                <a href="#">
                  <FaInstagram className="text-3xl hover:text-primary duration-300" />
                </a>
                <a href="#">
                  <FaFacebook className="text-3xl hover:text-primary duration-200" />
                </a>
                <a href="#">
                  <FaLinkedin className="text-3xl hover:text-primary duration-200" />
                </a>
              </div>
            </div>
          </div>
        </Stack>
      </div>
    </div>
  );
};

export default Footer;
