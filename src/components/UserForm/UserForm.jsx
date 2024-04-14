import { Box, Button, Stack } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import MatjarkomField from "../MatjarkomField/MatjarkomField";

const defaultValues = {
  name: "",
  email: "",
  password: "",
};

export default function UserForm() {
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
