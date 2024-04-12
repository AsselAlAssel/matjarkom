import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { Grid, Stack, Typography } from "@mui/material";
import Button from "../components/Shared/Button";
import MatjarkomField from "../components/MatjarkomField/MatjarkomField";
import { digitsOnly } from "../utils/constant";

export default function ProductDetails() {
  const { id } = useParams();
  return (
    <div className="container">
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
        <Navbar />
        <Grid
          container
          justifyContent="center"
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{
            py: 5,
          }}
        >
          <Grid item xs={12} sm={4}>
            <img
              src="https://via.placeholder.com/400"
              alt="product"
              height={"100%"}
              width={"100%"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1} mb={5}>
              <MatjarkomField
                variant="standard"
                defaultValue={"Product Name"}
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
                  readOnly: false,
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
                defaultValue={"100"}
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
                  readOnly: false,
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
                defaultValue={"Product Description"}
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
                  readOnly: false,
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
            />
          </Grid>
        </Grid>
        <Footer />
      </div>
    </div>
  );
}
