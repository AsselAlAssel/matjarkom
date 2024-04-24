import React from "react";
import Button from "../Shared/Button";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ data, noFadeUp, aosDelay, email }) => {
  const navigate = useNavigate();
  return (
    <div
      {...(noFadeUp ? {} : { "data-aos": "fade-up" })}
      data-aos-delay={aosDelay}
      className="group"
      key={data.id}
    >
      <div className="relative">
        <img
          src={data.cartPrimaryImage}
          alt=""
          className="h-[180px] w-[260px] object-cover rounded-md"
        />
        {/* hover button */}
        <div className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-full w-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-200 rounded-md">
          <Button
            text={"Buy Now"}
            bgColor={"bg-primary"}
            textColor={"text-white"}
            onClick={() => navigate(`/product/${data._id}?email=${email}`)}
          />
        </div>
      </div>
      <div className="leading-7">
        <h2 className="font-semibold">{data.cartName}</h2>
        <h2 className="font-bold">${data.cartPrice}</h2>
      </div>
    </div>
  );
};

export default ProductCard;
