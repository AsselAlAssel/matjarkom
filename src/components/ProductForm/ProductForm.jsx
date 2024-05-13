import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateProduct, useStoreProducts } from "../../hooks/useMerchant";
import { Controller, useForm } from "react-hook-form";
import MatjarkomField from "../MatjarkomField/MatjarkomField";
import { enqueueSnackbar } from "notistack";
import { mutate } from "swr";

const defaultValues = {
  cartName: "",
  cartPrice: "",
  cartDescription: "",
  cartCategory: "",
};

export default function ProductForm(props) {
  const { open, handleClose } = props;
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
  const { data } = useStoreProducts(email);
  const profile = data?.data;
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
  });
  const {
    trigger: createProduct,
    isMutating: isCreating,
    error: createError,
  } = useCreateProduct(email);

  const onSubmit = async (data) => {
    try {
      const res = await createProduct(data);
      const id = res.data.cart._id;
      mutate(`test-get-merchant-cart/${email}`);
      reset(defaultValues);
      handleClose();
      enqueueSnackbar("Product added successfully", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message ?? "Something went wrong",
        {
          variant: "error",
        },
      );
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        className: "dark:bg-gray-900",
        style: {
          maxWidth: 688,
          borderRadius: 12,
        },
      }}
    >
      <Box position="absolute" right={24} top={24}>
        <IconButton color="default" size="small" onClick={handleClose}>
          <IoCloseSharp className="text-gray-400 dark:text-gray-500" />
        </IconButton>
      </Box>
      <DialogTitle className="p-3 pb-2.5 text-xl leading-7 border-b border-solid border-gray-300 dark:text-white dark:border-gray-700">
        Add product
        <Typography
          mt={0.5}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Add a new product to the store
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ p: 3, mt: 2.5, pb: 4 }}>
        <form>
          <Stack spacing={2}>
            <Controller
              name="cartName"
              control={control}
              rules={{ required: "Product Name is required" }}
              render={({ field, fieldState: { error } }) => (
                <MatjarkomField
                  {...field}
                  label="Product Name"
                  variant="outlined"
                  fullWidth
                  required
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
            <Controller
              name="cartPrice"
              control={control}
              rules={{ required: "Price is required" }}
              render={({ field, fieldState: { error } }) => (
                <MatjarkomField
                  {...field}
                  label="Price"
                  variant="outlined"
                  fullWidth
                  required
                  error={!!error}
                  helperText={error ? error.message : null}
                  type="number"
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                  }}
                />
              )}
            />
            <Controller
              name="cartDescription"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field, fieldState: { error } }) => (
                <MatjarkomField
                  {...field}
                  label="Description"
                  variant="outlined"
                  fullWidth
                  required
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
            <Controller
              name="cartCategory"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field, fieldState: { error } }) => (
                <Autocomplete
                  options={profile?.specificStoreCategories}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <MatjarkomField
                      {...params}
                      helperText={error ? error.message : null}
                      error={!!error}
                      label="Category"
                    />
                  )}
                  value={field.value}
                  onChange={(e, newValue) => field.onChange(newValue)}
                />
              )}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions
        className="border-t border-solid border-gray-300 dark:text-white dark:border-gray-700"
        sx={{
          p: 3,
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          width={"100%"}
          justifyContent="space-between"
        >
          <Button
            onClick={handleClose}
            color="primary"
            variant="outlined"
            className="dark:text-white"
            fullWidth
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="dark:bg-violet-500 dark:hover:bg-violet-600"
            fullWidth
            onClick={handleSubmit((data) => {
              onSubmit(data);
            })}
            disabled={isCreating}
          >
            Save
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
