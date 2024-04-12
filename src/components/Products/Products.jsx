import React from "react";
import Heading from "../Shared/Heading";
import ProductCard from "./ProductCard";

// images import
import Img1 from "../../assets/product/p-1.jpg";
import Img2 from "../../assets/product/p-2.jpg";
import Img3 from "../../assets/product/p-3.jpg";
import Img4 from "../../assets/product/p-4.jpg";
import Img5 from "../../assets/product/p-5.jpg";
import Img6 from "../../assets/product/p-9.jpg";
import Img7 from "../../assets/product/p-7.jpg";
import Button from "../Shared/Button";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Boat Headphone",
    price: "120",
  },
  {
    id: 2,
    img: Img2,
    title: "Rocky Mountain",
    price: "420",
  },
  {
    id: 3,
    img: Img3,
    title: "Goggles",
    price: "320",
  },
  {
    id: 4,
    img: Img4,
    title: "Printed ",
    price: "220",
  },
];
const Products = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="container">
        {/* Header section */}
        <Heading title="Our Products" subtitle={"Explore Our Products"} />
        {/* Body section */}
        <div className="mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center">
            {ProductsData.map((data, index) => (
              <ProductCard data={data} aosDelay={index * 150} />
            ))}
          </div>
        </div>
        <div className="mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center">
            {ProductsData.map((data, index) => (
              <ProductCard data={data} aosDelay={index * 150} />
            ))}
          </div>
        </div>
        <div
          data-aos={"fade-up"}
          data-aos-delay={100}
          className="flex justify-center"
        >
          <Button
            text={"View All Products"}
            bgColor={"bg-primary"}
            textColor={"text-white"}
            onClick={() => {
              navigate("/products");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
