import React from "react";
import Navbar from "../components/Navbar/Navbar";
import StoreCard from "../components/StoreCard/StoreCard";
import Heading from "../components/Shared/Heading";
import Button from "../components/Shared/Button";
import { Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import useStores from "../hooks/useStores";

export default function Home() {
  const { data, error, isLoading, mutate } = useStores();
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
        <Box
          className="py-8"
          sx={{
            minHeight: "calc(100vh - 200px)",
          }}
        >
          <Heading title="Stores" subtitle="Explore Our Stores" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:px-10 gap-8">
            {data?.slice(0, 6).map((store, index) => (
              <StoreCard key={index} storeData={store} />
            ))}
          </div>
          <Stack direction="row" mt={2} justifyContent="center">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <Button
                text={"View All Stores"}
                bgColor={"bg-primary"}
                textColor={"text-white"}
                onClick={() => {
                  navigate("/stores");
                }}
              />
            )}
          </Stack>
        </Box>
      </div>
      <Footer
        logo={"MATJARKOM"}
        logoLink={"/"}
        companyDetails="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores alias cum"
      />
    </div>
  );
}
