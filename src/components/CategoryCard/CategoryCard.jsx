import React, { useState } from "react";
import image from "../../assets/blogs/blog-1.jpg";
import Button from "../Shared/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { FaEdit } from "react-icons/fa";

const CategoryCard = ({ setSelectedCategory, openCategoryForm }) => {
  return (
    <Box
      className="py-10 pl-5 text-white rounded-3xl relative h-[320px] flex items-end"
      sx={{
        background: `linear-gradient(rgba(0, 0, 0, 0) -34.58%, rgb(0, 0, 0) 56.09%), url(${image}) center center / cover no-repeat, 50% center / cover no-repeat lightgray`,
      }}
    >
      <IconButton
        sx={{
          height: "40px",
          width: "40px",
          borderRadius: "8px",
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "rgba(0, 0, 0, 0.5)",
        }}
        onClick={() => {
          setSelectedCategory({
            name: "Earphone",
            description: "Enjoy with Earphone",
          });
          openCategoryForm();
        }}
      >
        <FaEdit className="text-white" />
      </IconButton>
      <div>
        <div className="mb-4">
          <p className="mb-[2px] text-gray-400">Enjoy</p>
          <p className="text-2xl font-semibold mb-[2px]">With</p>
          <p className="text-4xl xl:text-5xl font-bold opacity-80 mb-2">
            Earphone
          </p>
          <Button
            text="Browse"
            bgColor={"bg-primary"}
            textColor={"text-white"}
          />
        </div>
      </div>
    </Box>
  );
};

export default CategoryCard;
