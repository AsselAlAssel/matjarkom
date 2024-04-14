import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Heading from "../components/Shared/Heading";
import { stores } from "./Home";
import StoreCard from "../components/StoreCard/StoreCard";
import Button from "../components/Shared/Button";
import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import Footer from "../components/Footer/Footer";
export const StoreCategories = [
  {
    title: "All",
    value: "all",
  },
  {
    title: "Grocery",
    value: "grocery",
  },
  {
    title: "Electronics",
    value: "electronics",
  },
  {
    title: "Fashion",
    value: "fashion",
  },
  {
    title: "Furniture",
    value: "furniture",
  },
  {
    title: "Pharmacy",
    value: "pharmacy",
  },
  {
    title: "Others",
    value: "others",
  },
];

export default function Stores() {
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
          sx={{
            py: 4,
          }}
        >
          <Heading title="Stores" subtitle="Explore Our Stores" />

          <Stack
            sx={{
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              alignItems: "center",
              gap: {
                xs: 1,
                sm: 2,
              },
              my: 2,
            }}
          >
            <Typography variant="h6">Filter by Category:</Typography>
            <Autocomplete
              options={StoreCategories}
              getOptionLabel={(option) => option.title}
              style={{ maxWidth: 300, minWidth: 200 }}
              size="small"
              renderInput={(params) => <TextField {...params} />}
              defaultValue={StoreCategories[0]}
            />
          </Stack>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:px-10 gap-8">
            {stores.map((store, index) => (
              <StoreCard key={index} storeData={store} />
            ))}
          </div>
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
