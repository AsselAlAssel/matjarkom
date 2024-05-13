import { Autocomplete, Box, Button, Stack } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import MatjarkomField from "../MatjarkomField/MatjarkomField";
import { useRegisterMerchant } from "../../hooks/useMerchant";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const defaultValues = {
  email: "",
  password: "",
  phone: "",
  country: "",
  merchantname: "",
  storeName: "",
  storeDescription: "",
  storeCategory: "",
};

export default function MarchantForm() {
  const { control, reset, handleSubmit } = useForm({ defaultValues });
  const navigate = useNavigate();
  const {
    trigger: registerMerchant,
    isMutating: isRegistering,
    error: registerError,
  } = useRegisterMerchant();

  const onSubmit = async (data) => {
    try {
      await registerMerchant(data);
      enqueueSnackbar("Merchant registered successfully", {
        variant: "success",
      });
      navigate("/login");
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
    <Box
      sx={{
        px: {
          xs: 2,
          sm: 4,
          md: 6,
          lg: 8,
          xl: 10,
        },
      }}
    >
      <form>
        <Stack spacing={2}>
          <Controller
            name="merchantname"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field, fieldState: { error } }) => (
              <MatjarkomField
                {...field}
                label="Name"
                required
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required" }}
            render={({ field, fieldState: { error } }) => (
              <MatjarkomField
                {...field}
                label="Email"
                required
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required" }}
            render={({ field, fieldState: { error } }) => (
              <MatjarkomField
                {...field}
                label="Password"
                type="password"
                required
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            rules={{ required: "Phone is required" }}
            render={({ field, fieldState: { error } }) => (
              <MatjarkomField
                {...field}
                label="Phone"
                required
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
          <Controller
            name="country"
            control={control}
            rules={{ required: "Country is required" }}
            render={({ field, fieldState: { error } }) => (
              <MatjarkomField
                {...field}
                label="Country"
                required
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
          <Controller
            name="storeName"
            control={control}
            rules={{ required: "Store Name is required" }}
            render={({ field, fieldState: { error } }) => (
              <MatjarkomField
                {...field}
                label="Store Name"
                required
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
          <Controller
            name="storeDescription"
            control={control}
            rules={{ required: "Store Description is required" }}
            render={({ field, fieldState: { error } }) => (
              <MatjarkomField
                {...field}
                label="Store Description"
                required
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
          <Controller
            name="storeCategory"
            control={control}
            rules={{ required: "Type is required" }}
            render={({ field, fieldState: { error } }) => (
              <MatjarkomField
                label="Store Category"
                required
                error={!!error}
                helperText={error ? error.message : null}
                {...field}
              />
            )}
          />

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" color="error" onClick={reset}>
              Reset
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit((data) => {
                onSubmit(data);
              })}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}
