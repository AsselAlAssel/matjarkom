import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectUser } from "../../Stores/project/auth";
import {
  useMerchantUpdate,
  useStoreProfile,
  useUpdateStoreInfo,
} from "../../hooks/useMerchant";
import MatjarkomField from "../MatjarkomField/MatjarkomField";
import { useDropzone } from "react-dropzone";
import axiosClient from "../../Plugins/axios";

export default function MerchantProfile() {
  const user = useSelector(selectUser);
  const { data, mutate } = useStoreProfile(user?.email);
  const profile = data?.data;
  const { trigger: updateMerchant, isMutating: isUpdating } = useMerchantUpdate(
    user.email,
  );
  const [uploading, setUploading] = React.useState(false);
  const { trigger: updateStoreInfo, isMutating: isUpdatingStoreInfo } =
    useUpdateStoreInfo(user.email);
  const { open } = useDropzone({
    onDrop: async (acceptedFiles) => {
      setUploading(true);
      const email = user.email;
      const imageFile = acceptedFiles[0]; // Assuming only one file is dropped
      console.log(imageFile);

      try {
        const formData = new FormData();
        formData.append("avatar", imageFile);
        formData.append("email", email);

        const response = await axiosClient.post("/store-avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            email: email,
          },
        });

        mutate();

        // Handle success response
      } catch (error) {
        console.error(error);
        // Handle error response
      }
      setUploading(false);
    },
    multiple: false,
  });
  return (
    <Box my={4}>
      <Stack spacing={2} direction="row" key={profile.Avatar}>
        {uploading ? (
          <CircularProgress />
        ) : (
          <Avatar
            key={profile.storeAvatar}
            src={profile.storeAvatar}
            alt={profile?.storeName || "profile"}
            sx={{
              width: 80,
              height: 80,
              cursor: "pointer",
              "&:hover": {
                opacity: 0.7,
              },
            }}
            onClick={(e) => {
              open();
            }}
          />
        )}
        <Box>
          <MatjarkomField
            variant="standard"
            defaultValue={profile?.storeName}
            fullWidth
            sx={{
              border: "none",
              outline: "none",
              "& .MuiInputBase-input": {
                py: 0,
                px: 0,
              },
            }}
            InputProps={{
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
              const value = e.target.value;
              if (!value) {
                e.target.value = profile?.storeName;
                return;
              }
              await updateStoreInfo({
                ...profile,
                storeName: value,
              });
              mutate();
            }}
          />
          <MatjarkomField
            variant="standard"
            defaultValue={profile?.storeDescription}
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
              const value = e.target.value;
              if (!value) {
                e.target.value = profile?.storeDescription;
                return;
              }
              await updateStoreInfo({
                ...profile,
                storeDescription: value,
              });
              mutate();
            }}
          />
        </Box>
      </Stack>
      <Divider
        sx={{
          my: 2,
        }}
      />
      <Stack spacing={2}>
        <MatjarkomField
          defaultValue={profile?.phone}
          fullWidth
          label="Phone Number"
          onClick={(e) => {
            const value = e.target.value;
            if (value.length === 0) {
              e.target.value = profile?.phone;
              return;
            }
          }}
          onBlur={async (e) => {
            const value = e.target.value;
            if (!value) {
              e.target.value = profile?.phone;
              return;
            }
            await updateMerchant({
              ...profile,
              phone: value,
            });
            mutate();
          }}
        />
        <MatjarkomField
          defaultValue={profile?.country}
          fullWidth
          label="country"
          onBlur={async (e) => {
            const value = e.target.value;
            if (!value) {
              e.target.value = profile?.country;
              return;
            }

            await updateMerchant({
              ...profile,
              country: value,
            });
            mutate();
          }}
        />
        <MatjarkomField
          defaultValue={profile?.merchantname}
          fullWidth
          label="Merchant Name"
          onBlur={async (e) => {
            const value = e.target.value;
            if (!value) {
              e.target.value = profile?.merchantname;
              return;
            }
            await updateMerchant({
              ...profile,
              merchantname: value,
            });
            mutate();
          }}
        />
        <MatjarkomField
          defaultValue={profile?.storeCategory}
          fullWidth
          label="Store Category"
          onBlur={async (e) => {
            const value = e.target.value;
            if (!value) {
              e.target.value = profile?.storeCategory;
              return;
            }
            await updateStoreInfo({
              ...profile,
              storeCategory: value,
            });
            mutate();
          }}
        />
      </Stack>
    </Box>
  );
}
