import { Box, Button, Stack } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import MatjarkomField from "../MatjarkomField/MatjarkomField";
import { useRegisterUser } from "../../hooks/useUser";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const defaultValues = {
  username: "",
  email: "",
  password: "",
  phone: "",
  country: "",
  street: "",
};

export default function UserForm() {
  const { control, reset, handleSubmit } = useForm({ defaultValues });
  const { register, data: ds } = useRegisterUser();
  const navigate = useNavigate();
  const handleRegister = async (data) => {
    try {
      await register(data);
      enqueueSnackbar("User registered successfully", { variant: "success" });
      reset();
      navigate("/login");
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" });
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
            name="username"
            control={control}
            rules={{ required: "Username is required" }}
            render={({ field, fieldState: { error } }) => (
              <MatjarkomField
                {...field}
                label="Username"
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
            name="street"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <MatjarkomField
                {...field}
                label="Street"
                error={!!error}
                helperText={error ? error.message : null}
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
                handleRegister(data);
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
