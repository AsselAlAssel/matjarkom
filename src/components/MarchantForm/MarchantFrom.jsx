import { Autocomplete, Box, Button, Stack } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import MatjarkomField from "../MatjarkomField/MatjarkomField";

const typeOptions = [
  { id: "food", label: "Food" },
  { id: "clothes", label: "Clothes" },
  { id: "electronics", label: "Electronics" },
  { id: "accessories", label: "Accessories" },
  { id: "other", label: "Other" },
];

const defaultValues = {
  name: "",
  email: "",
  password: "",
  phone: "",
  country: "",
  store_name: "",
  store_description: "",
  type: "",
};

export default function MarchantForm() {
  const { control, reset, handleSubmit } = useForm({ defaultValues });
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
            name="name"
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
            name="store_name"
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
            name="store_description"
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
            name="type"
            control={control}
            rules={{ required: "Type is required" }}
            render={({ field, fieldState: { error } }) => (
              <Autocomplete
                {...field}
                options={typeOptions}
                getOptionLabel={(option) => option.label}
                value={typeOptions.find((option) => option.id === field.value)}
                renderInput={(params) => (
                  <MatjarkomField
                    {...params}
                    label="Type"
                    required
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
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
                console.log(data);
                reset(defaultValues);
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