import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { useLocation, useParams } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { Grid, Stack, Typography } from "@mui/material";
import Button from "../components/Shared/Button";
import MatjarkomField from "../components/MatjarkomField/MatjarkomField";
import { digitsOnly } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../Stores/project/orders";
import { selectIsMerchant } from "../Stores/project/auth";
import { useStoreProducts } from "../hooks/useMerchant";

export default function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
  const dispatch = useDispatch();
  const isMerchant = useSelector(selectIsMerchant);
  const { data } = useStoreProducts(email);
  const profile = data?.data;
  const products = data?.data?.type;
  const product = products?.find((product) => product._id === id);

  return (
    <div className="container">
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
        <Navbar logo={profile?.storeName} logoLink={`/store?email=${email}`} />
        <Grid
          container
          justifyContent="center"
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{
            py: 5,
            minHeight: "calc(100vh - 200px)",
          }}
        >
          <Grid item xs={12} sm={4}>
            <img
              src={product?.cartPrimaryImage}
              alt="product"
              height={"100%"}
              width={"100%"}
            />
            {product?.cartSecondaryImagesSlider?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="product"
                height={"100%"}
                width={"100%"}
              />
            ))}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1} mb={5}>
              <MatjarkomField
                variant="standard"
                defaultValue={product?.cartName}
                fullWidth
                multiline
                sx={{
                  border: "none",
                  outline: "none",
                  "& .MuiInputBase-input": {
                    py: 0,
                    px: 0,
                  },
                }}
                InputProps={{
                  readOnly: !isMerchant,
                  disableUnderline: true,
                  sx: {
                    fontSize: "24px",
                    fontWeight: 600,
                    color: "#101828",
                    lineHeight: "32px",
                    px: 0,
                    textWrap: "wrap",
                  },
                }}
              />
              <MatjarkomField
                variant="standard"
                defaultValue={product?.cartPrice}
                fullWidth
                sx={{
                  border: "none",
                  outline: "none",
                  bgColor: "red",

                  "& .MuiInputBase-input": {
                    py: 0,
                    px: 0,
                  },
                }}
                InputProps={{
                  readOnly: !isMerchant,
                  disableUnderline: true,
                  sx: {
                    fontSize: "30px",
                    fontWeight: 700,
                    color: "#101828",
                    lineHeight: "32px",
                    px: 0,
                    textWrap: "wrap",
                  },
                  startAdornment: "$",
                }}
                onChange={(e) => {
                  {
                    const value = e.target.value;
                    if (!digitsOnly.test(value)) {
                      e.target.value = value.slice(0, -1);
                    }
                  }
                }}
              />
              <MatjarkomField
                variant="standard"
                defaultValue={product?.cartDescription}
                fullWidth
                multiline
                sx={{
                  border: "none",
                  outline: "none",
                  "& .MuiInputBase-input": {
                    py: 0,
                    px: 0,
                  },
                }}
                InputProps={{
                  readOnly: !isMerchant,
                  disableUnderline: true,
                  sx: {
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#101828",
                    lineHeight: "24px",
                    px: 0,
                    textWrap: "wrap",
                  },
                }}
              />
            </Stack>
            <Button
              text="Add to Cart"
              bgColor={"bg-primary"}
              textColor={"text-white"}
              onClick={() => {
                dispatch(
                  addOrder({
                    ...product,
                    qty: 1,
                  }),
                );
              }}
            />
          </Grid>
        </Grid>
        <Footer />
      </div>
    </div>
  );
}
