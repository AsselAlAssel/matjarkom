import React, { useCallback, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { Grid, Stack, Typography } from "@mui/material";
import Button from "../components/Shared/Button";
import MatjarkomField from "../components/MatjarkomField/MatjarkomField";
import { digitsOnly } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../Stores/project/orders";
import { selectUser } from "../Stores/project/auth";
import {
  useDeleteProduct,
  useStoreProducts,
  useUpdateProductMutation,
} from "../hooks/useMerchant";
import { mutate } from "swr";
import { useDropzone } from "react-dropzone";
import axiosClient from "../Plugins/axios";
import { enqueueSnackbar } from "notistack";
import DeleteDialog from "../components/DeleteDialog/DeleteDialog";

export default function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const email = new URLSearchParams(location.search).get("email");
  const user = useSelector(selectUser);
  const isOwner = user?.email === email && user?.isMerchant;
  const { data } = useStoreProducts(email);
  const profile = data?.data;
  const products = data?.data?.type;
  const product = products?.find((product) => product._id === id);
  const index = products?.findIndex((product) => product._id === id);
  const { trigger: updateProduct, isMutating: isUpdating } =
    useUpdateProductMutation(email);
  const [isUploading, setIsUploading] = React.useState(false);
  const isLogged = user?.email;
  const {
    trigger: deleteProduct,
    isMutating: isDeleting,
    error: deleteError,
  } = useDeleteProduct(email);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const navigate = useNavigate();

  const onDrop = useCallback(async (acceptedFiles) => {
    setIsUploading(true);
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("email", email);
    formData.append("index", index);

    try {
      const response = await axiosClient.post(
        "/cart-upload-primary-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(response.data);
      setIsUploading(false);
      mutate(`test-get-merchant-cart/${email}`);
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error
    }
  }, []);
  const {
    getRootProps,
    getInputProps,
    open: openFileChooser,
  } = useDropzone({
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg"],
    },
    onDrop,
  });

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
            {product.cartPrimaryImage ===
            "https://th.bing.com/th/id/OIP.gP1tVKJUehx7kX43qmrSswHaHa?w=176&h=180&c=7&r=0&o=5&pid=1.7" ? (
              <div className="h-full w-full bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">No Image</p>
              </div>
            ) : (
              <img
                src={product?.cartPrimaryImage}
                alt="product"
                height={"100%"}
                width={"100%"}
              />
            )}
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
                  readOnly: !isOwner,
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
                onBlur={async (e) => {
                  await updateProduct({
                    ...product,
                    cartName: e.target.value,
                    index,
                  });
                  mutate(`test-get-merchant-cart/${email}`);
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
                  readOnly: !isOwner,
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
                onBlur={async (e) => {
                  await updateProduct({
                    ...product,
                    cartPrice: e.target.value,
                    index,
                  });
                  mutate(`test-get-merchant-cart/${email}`);
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
                  readOnly: !isOwner,
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
                onBlur={async (e) => {
                  await updateProduct({
                    ...product,
                    cartDescription: e.target.value,
                    index,
                  });
                  mutate(`test-get-merchant-cart/${email}`);
                }}
              />
            </Stack>
            <Stack
              gap={1.5}
              direction={"row"}
              alignItems={"center"}
              flexWrap={"wrap"}
            >
              <Button
                text="Add to Cart"
                bgColor={"bg-primary"}
                textColor={"text-white"}
                onClick={() => {
                  console.log("product", isLogged);
                  if (!isLogged) {
                    enqueueSnackbar("Please login to add to cart", {
                      variant: "error",
                    });
                    return;
                  }
                  dispatch(
                    addOrder({
                      ...product,
                      qty: 1,
                    }),
                  );
                }}
              />
              {isOwner ? (
                <Button
                  text={isUploading ? "Uploading..." : "Change Image"}
                  bgColor={isUploading ? "bg-gray-300" : "bg-black"}
                  textColor={isUploading ? "text-black" : "text-white"}
                  onClick={openFileChooser}
                />
              ) : null}
              {isOwner ? (
                <Button
                  text="Delete"
                  bgColor={"bg-red-500"}
                  textColor={"text-white"}
                  onClick={() => setShowDeleteDialog(true)}
                />
              ) : null}
            </Stack>
          </Grid>
        </Grid>
        <Footer />
      </div>
      <DeleteDialog
        deleteDialogOpen={showDeleteDialog}
        handleDeleteDialogClose={() => setShowDeleteDialog(false)}
        handleDelete={async () => {
          try {
            await deleteProduct({ index, email });
            mutate(`test-get-merchant-cart/${email}`);
            setShowDeleteDialog(false);
            enqueueSnackbar("Product deleted successfully", {
              variant: "success",
            });
            navigate("/products?email=" + email);
          } catch (error) {
            enqueueSnackbar(
              error?.response?.data?.message ?? "Something went wrong",
              {
                variant: "error",
              },
            );
          }
        }}
        title="Delete Product"
        description="Are you sure you want to delete this product?"
        isDeleting={isDeleting}
      />
    </div>
  );
}
