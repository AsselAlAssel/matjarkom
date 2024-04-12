import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Img1 from "../assets/product/p-1.jpg";
import Img2 from "../assets/product/p-2.jpg";
import Img3 from "../assets/product/p-3.jpg";
import Img4 from "../assets/product/p-4.jpg";
import Heading from "../components/Shared/Heading";
import ProductCard from "../components/Products/ProductCard";

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

export default function Products() {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
      <Navbar />
      <div>
        <div className="container">
          <Heading title="Our Products" subtitle={"Explore Our Products"} />
          <div className="mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center">
              {ProductsData.map((data) => (
                <ProductCard data={data} key={data.id} noFadeUp={true} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
