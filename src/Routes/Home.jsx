import React from "react";
import Navbar from "../components/Navbar/Navbar";
import StoreCard from "../components/StoreCard/StoreCard";
import Heading from "../components/Shared/Heading";
import Button from "../components/Shared/Button";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const stores = [
  {
    name: "Store 1",
    image: "https://via.placeholder.com/150",
    description: "This is store 1",
  },
  {
    name: "Store 2",
    image: "https://via.placeholder.com/150",
    description: "This is store 2",
  },
  {
    name: "Store 3",
    image: "https://via.placeholder.com/150",
    description: "This is store 3",
  },
  {
    name: "Store 4",
    image: "https://via.placeholder.com/150",
    description: "This is store 4",
  },
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
        <Navbar
          hideCart={true}
          links={[{ to: "/stores", title: "Stores" }]}
          logo={"MATJARKOM"}
          logoLink={"/"}
        />
        <div className="py-8">
          <Heading title="Stores" subtitle="Explore Our Stores" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:px-10 gap-8">
            {stores.map((store, index) => (
              <StoreCard key={index} storeData={store} />
            ))}
          </div>
          <Stack direction="row" mt={2} justifyContent="center">
            <Button
              text={"View All Stores"}
              bgColor={"bg-primary"}
              textColor={"text-white"}
              onClick={() => {
                navigate("/stores");
              }}
            />
          </Stack>
        </div>
      </div>
    </div>
  );
}
