import React from "react";
import Button from "../Shared/Button";
import Box from "@mui/material/Box";
import ActionsIconButton from "../ActionsIconButton/ActionsIconButton";
import { useSelector } from "react-redux";
import { selectIsMerchant } from "../../Stores/project/auth";

const CategoryCard = ({ setSelectedCategory, handleOpen, categoryName }) => {
  const isMerchant = useSelector(selectIsMerchant);

  return (
    <Box
      className="py-10 pl-5 text-white rounded-3xl relative h-[320px] flex items-end"
      sx={{
        // add image here
        background: `linear-gradient(rgba(0, 0, 0, 0) -34.58%, rgb(0, 0, 0) 56.09%), url() center center / cover no-repeat, 50% center / cover no-repeat lightgray`,
      }}
    >
      {isMerchant ? (
        <ActionsIconButton
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
          onClick={(e) => {
            setSelectedCategory({
              id: 1,
              name: "Headphone",
              description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            });
            handleOpen(e);
          }}
        />
      ) : null}
      <div>
        <div className="mb-4">
          <p className="mb-[2px] text-gray-400">Enjoy</p>
          <p className="text-2xl font-semibold mb-[2px]">With</p>
          <p className="text-4xl xl:text-5xl font-bold opacity-80 mb-2">
            {categoryName}
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
