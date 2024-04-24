import React from "react";
import Heading from "../Shared/Heading";
import ProductCard from "./ProductCard";

import Button from "../Shared/Button";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Products = ({ products, email }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="container">
        {/* Header section */}
        <Heading title="Our Products" subtitle={"Explore Our Products"} />
        {products && products.length === 0 && (
          <div className="flex justify-center">
            <p className="text-center text-gray-800">No Products Found</p>
          </div>
        )}
        {/* Body section */}
        <div className="mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center">
            {products?.slice(0, 4)?.map((data, index) => (
              <ProductCard data={data} aosDelay={index * 150} email={email} />
            ))}
          </div>
        </div>
        <div className="mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center">
            {products?.slice(4, 8)?.map((data, index) => (
              <ProductCard data={data} aosDelay={index * 150} email={email} />
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
              navigate(`/products?email=${email}`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
