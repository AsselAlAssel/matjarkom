import { Box } from "@mui/material";
import React from "react";
import Button from "../Shared/Button";
import { useNavigate } from "react-router-dom";

export default function StoreCard({ storeData }) {
  const navigate = useNavigate();
  return (
    <Box
      className="py-10 pl-5 text-white rounded-3xl relative h-[320px] flex items-end"
      sx={{
        background: `linear-gradient(rgba(0, 0, 0, 0) -34.58%, rgb(0, 0, 0) 56.09%), url(${storeData.storeAvatar}) center center / cover no-repeat, 50% center / cover no-repeat lightgray`,
      }}
    >
      <div>
        <div className="mb-4">
          <p className="mb-[2px] text-gray-400">Enjoy</p>
          <p className="text-2xl font-semibold mb-[2px]">With</p>
          <p className="text-4xl xl:text-5xl font-bold opacity-80 mb-2">
            {storeData.storeName}
          </p>
          <Button
            text="Browse"
            bgColor={"bg-primary"}
            textColor={"text-white"}
            onClick={() => {
              navigate(`/store/:${storeData.storeName}`);
            }}
          />
        </div>
      </div>
    </Box>
  );
}
