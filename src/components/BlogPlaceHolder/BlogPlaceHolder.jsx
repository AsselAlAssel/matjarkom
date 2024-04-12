import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { IoIosAddCircle } from "react-icons/io";

export default function BlogPlaceHolder({ onClickAddBlog }) {
  return (
    <Box
      className="bg-gray-100 dark:bg-gray-800 rounded-3xl h-[320px] flex justify-center items-center cursor-pointer"
      onClick={onClickAddBlog}
    >
      <IconButton aria-label="">
        <IoIosAddCircle className="text-5xl text-gray-400 dark:text-gray-500" />
      </IconButton>
    </Box>
  );
}
