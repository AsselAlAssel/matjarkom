import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { IoCloseSharp } from "react-icons/io5";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useForm, Controller } from "react-hook-form";
import MatjarkomField from "../MatjarkomField/MatjarkomField";

const defaultValues = {
  name: "",
  description: "",
  image: "",
};

const CategoryForm = ({ open, handleClose, selectedCategory }) => {
  const { control, handleSubmit, reset, getValues } = useForm({
    defaultValues: selectedCategory
      ? { ...selectedCategory, image: "" }
      : defaultValues,
  });
  useEffect(() => {
    if (selectedCategory) {
      reset({
        name: selectedCategory.name,
        description: selectedCategory.description,
        image: "",
      });
    }
  }, [selectedCategory]);

  const handleCloseDialog = () => {
    handleClose();
    reset(defaultValues);
  };

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
          <Stack
            spacing={2.5}
            sx={{
              "& .MuiFormControl-root": {
                marginTop: 0,
              },
            }}
          >
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <MatjarkomField
                  {...field}
                  label="Category Image"
                  variant="outlined"
                  fullWidth
                  type="file"
                />
              )}
            />
            <Controller
              name="name"
              control={control}
              rules={{ required: "Category Name is required" }}
              render={({ field, fieldState: { error } }) => (
                <MatjarkomField
                  {...field}
                  label="Category Name"
                  variant="outlined"
                  fullWidth
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <MatjarkomField
                  {...field}
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
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
};

export default CategoryForm;
