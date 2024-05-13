import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Img1 from "../assets/product/p-1.jpg";
import Img2 from "../assets/product/p-2.jpg";
import Img3 from "../assets/product/p-3.jpg";
import Img4 from "../assets/product/p-4.jpg";
import Heading from "../components/Shared/Heading";
import ProductCard from "../components/Products/ProductCard";
import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import { StoreCategories } from "./Stores";
import { useStoreProducts } from "../hooks/useMerchant";
import { useLocation } from "react-router-dom";
import { selectUser } from "../Stores/project/auth";
import { useSelector } from "react-redux";
import Button from "../components/Shared/Button";
import ProductForm from "../components/ProductForm/ProductForm";

export default function Products() {
  const location = useLocation();
  const [category, setCategory] = React.useState();
  const email = new URLSearchParams(location.search).get("email");
  const user = useSelector(selectUser);
  const isOwner = user?.email === email && user?.isMerchant;
  const { data } = useStoreProducts(email);
  const profile = data?.data;
  const products = data?.data?.type;
  const filteredProducts = useMemo(() => {
    if (!category) return products;
    return products?.filter((product) => product.cartCategory === category);
  });
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
      <Navbar logo={profile?.storeName} logoLink={`/store?email=${email}`} />
      <div>
        <div className="container">
          <Heading title="Our Products" subtitle={"Explore Our Products"} />
          <Stack
            justifyContent={"space-between"}
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            flexWrap={"wrap"}
            sx={{
              my: 2,
            }}
          >
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
                options={profile?.specificStoreCategories}
                getOptionLabel={(option) => option}
                style={{ maxWidth: 300, minWidth: 200 }}
                size="small"
                renderInput={(params) => <TextField {...params} />}
                value={category}
                onChange={(e, newValue) => setCategory(newValue)}
              />
            </Stack>
            {isOwner && (
              <Button
                text="Add Product"
                bgColor={"bg-primary"}
                textColor={"text-white"}
                onClick={() => setOpen(true)}
              />
            )}
          </Stack>
          <div className="mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center">
              {filteredProducts?.map((data) => (
                <ProductCard
                  data={data}
                  key={data.id}
                  noFadeUp={true}
                  email={email}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <ProductForm open={open} handleClose={() => setOpen(false)} />
    </div>
  );
}
