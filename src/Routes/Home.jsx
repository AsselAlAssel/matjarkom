import React from "react";
import Navbar from "../components/Navbar/Navbar";
import StoreCard from "../components/StoreCard/StoreCard";
import Heading from "../components/Shared/Heading";
import Button from "../components/Shared/Button";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import useStores from "../hooks/useStores";

export default function Home() {
  const { data, error, isLoading, mutate } = useStores();
  console.log(data);
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
            {data?.map((store, index) => (
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
      <Footer
        logo={"MATJARKOM"}
        logoLink={"/"}
        companyDetails="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores alias cum"
      />
    </div>
  );
}
