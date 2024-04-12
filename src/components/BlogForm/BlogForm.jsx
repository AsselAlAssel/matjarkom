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
  subtitle: "",
  image: "",
  link: "",
};

export default function BlogForm({ open, handleClose, selectedBlog }) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
  });
  const handleCloseDialog = () => {
    handleClose();
    reset(defaultValues);
  };
  useEffect(() => {
    if (selectedBlog) {
      reset({
        title: selectedBlog.title,
        subtitle: selectedBlog.subtitle,
        link: selectedBlog.link,
        image: "",
      });
    }
  }, [selectedBlog]);
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
        Add Blog
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
              name="image"
              control={control}
              render={({ field }) => (
                <MatjarkomField
                  label="Image"
                  placeholder="Enter image URL"
                  {...field}
                  required
                  type="file"
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
                  label="Title"
                  placeholder="Enter title"
                  {...field}
                  required
                />
              )}
            />
            <Controller
              name="subtitle"
              control={control}
              rules={{
                required: "Subtitle is required",
              }}
              render={({ field }) => (
                <MatjarkomField
                  label="Subtitle"
                  placeholder="Enter subtitle"
                  {...field}
                  required
                />
              )}
            />
            <Controller
              name="link"
              control={control}
              rules={{
                required: "Link is required",
              }}
              render={({ field }) => (
                <MatjarkomField
                  label="Link"
                  placeholder="Enter link"
                  {...field}
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
