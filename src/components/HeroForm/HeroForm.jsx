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
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloseSharp } from "react-icons/io5";
import MatjarkomField from "../MatjarkomField/MatjarkomField";
import { useLocation } from "react-router-dom";
import axios from "axios";
import axiosClient from "../../Plugins/axios";

const defaultValues = {
  img: "",
};

export default function HeroForm({ open, handleClose, selectedHero }) {
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
  const [uploadedImage, setUploadedImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    // Assuming only one file is allowed to be uploaded
    const file = acceptedFiles[0];
    setUploadedImage(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("avatar", uploadedImage);
      formData.append("email", email);

      const response = await axiosClient.post(
        "/matjarcom/api/v1/store-slider-images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log(response.data);
      // Handle success response
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error
    }
  };
  const handleCloseDialog = () => {
    handleClose();
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
        Add Image
        <Typography
          mt={0.5}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Add a new image to the hero section
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ p: 3, mt: 2.5, pb: 4 }}>
        <input
          type="text"
          placeholder="Email"
          value={"Image"}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div
          {...getRootProps()}
          style={{
            border: "2px dashed #cccccc",
            borderRadius: "4px",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop an image here, or click to select an image</p>
        </div>
        {uploadedImage && (
          <div>
            <p>Selected Image:</p>
            <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded" />
          </div>
        )}
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
            onClick={handleUpload}
          >
            Save
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
