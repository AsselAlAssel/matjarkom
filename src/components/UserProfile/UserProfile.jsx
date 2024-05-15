import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../Stores/project/auth";
import { useUpdateUserProfile, useUser } from "../../hooks/useUser";
import {
    Avatar,
    Box,
    CircularProgress,
    Divider,
    Stack,
    TextField,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import MatjarkomField from "../MatjarkomField/MatjarkomField";
import axiosClient from "../../Plugins/axios";

export default function UserProfile() {
    const user = useSelector(selectUser);
    console.log(user);
    const { data: profile, mutate } = useUser(user.email);
    const { isMutating: updating, trigger: updateUserProfile } =
        useUpdateUserProfile(user.email);
    const [uploading, setUploading] = React.useState(false);
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

                const response = await axiosClient.post("/avatar", formData, {
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
        <Box>
            <Stack spacing={2} direction="row" key={profile.Avatar}>
                {uploading ? (
                    <CircularProgress />
                ) : (
                    <Avatar
                        key={profile.Avatar}
                        src={profile.Avatar}
                        alt={profile?.username || "profile"}
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
                        defaultValue={profile?.username}
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
                                e.target.value = profile?.username;
                                return;
                            }
                            await updateUserProfile({
                                ...profile,
                                username: value,
                            });
                        }}
                    />
                    <MatjarkomField
                        variant="standard"
                        defaultValue={profile?.email}
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
                        disabled={true}
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
                    label="Phone Number"
                    defaultValue={profile?.phone}
                    fullWidth
                    onBlur={async (e) => {
                        const value = e.target.value;
                        if (!value) {
                            e.target.value = profile?.phone;
                            return;
                        }
                        await updateUserProfile({
                            ...profile,
                            phone: value,
                        });
                        mutate();
                    }}
                />
                <MatjarkomField
                    label="country"
                    defaultValue={profile?.country}
                    fullWidth
                    onBlur={async (e) => {
                        const value = e.target.value;
                        if (!value) {
                            e.target.value = profile?.country;
                            return;
                        }
                        await updateUserProfile({
                            ...profile,
                            country: value,
                        });
                        mutate();
                    }}
                />
                <MatjarkomField
                    label="street"
                    defaultValue={profile?.street}
                    fullWidth
                    onBlur={async (e) => {
                        const value = e.target.value;
                        if (!value) {
                            e.target.value = profile?.street;
                            return;
                        }
                        await updateUserProfile({
                            ...profile,
                            street: value,
                        });
                        mutate();
                    }}
                />
            </Stack>
        </Box>
    );
}
