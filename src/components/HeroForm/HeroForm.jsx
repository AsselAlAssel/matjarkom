import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";
import MatjarkomField from "../MatjarkomField/MatjarkomField";

const defaultValues = {
  title: "",
  title2: "",
  img: "",
};

export default function HeroForm({ open, handleClose, selectedHero }) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
  });
  const handleCloseDialog = () => {
    handleClose();
    reset(defaultValues);
  };
  useEffect(() => {
    if (selectedHero) {
      reset({
        title: selectedHero.title,
        title2: selectedHero.title2,
      });
    }
  }, [selectedHero]);
  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
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
        Add Category
        <Typography
          mt={0.5}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Add a new category to your store
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ p: 3, mt: 2.5, pb: 4 }}>
        <form>
          <Stack spacing={2.5}>
            <Controller
              name="img"
              control={control}
              rules={{
                required: "Image is required",
              }}
              render={({ field }) => (
                <MatjarkomField
                  type="file"
                  {...field}
                  label="Image"
                  variant="outlined"
                  fullWidth
                  className="dark:text-white"
                  required
                />
              )}
            />
            <Controller
              name="title"
              control={control}
              rules={{
                required: "Title is required",
              }}
              render={({ field }) => (
                <MatjarkomField
                  {...field}
                  label="Title"
                  variant="outlined"
                  fullWidth
                  className="dark:text-white"
                  required
                />
              )}
            />
            <Controller
              name="title2"
              control={control}
              rules={{
                required: "Title 2 is required",
              }}
              render={({ field }) => (
                <MatjarkomField
                  {...field}
                  label="Title 2"
                  variant="outlined"
                  fullWidth
                  className="dark:text-white"
                  required
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
              console.log(data);
              reset(defaultValues);
            })}
          >
            Save
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
