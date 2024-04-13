import { Box, IconButton } from "@mui/material";
import React from "react";
import { IoIosAddCircle } from "react-icons/io";

export default function HeroPlaceHolder({ openForm }) {
  return (
    <Box
      className="bg-gray-100 dark:bg-gray-800 h-[400px] flex justify-center items-center cursor-pointer  rounded-2xl"
      onClick={openForm}
    >
      <IconButton aria-label="">
        <IoIosAddCircle className="text-5xl text-gray-400 dark:text-gray-500" />
      </IconButton>
    </Box>
  );
}
