import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import UserForm from "../components/UserForm/UserForm";
import MarchantForm from "../components/MarchantForm/MarchantFrom";

export default function Register() {
  const [value, setValue] = React.useState(0);
  return (
    <div className="container">
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
        <Navbar
          hideCart={true}
          links={[{ to: "/stores", title: "Stores" }]}
          logo={"MATJARKOM"}
          logoLink={"/"}
        />
      </div>
      <Box mt={4}>
        <Tabs value={value} onChange={(e, newValue) => setValue(newValue)}>
          <Tab label="As User" />
          <Tab label="As Marchant" />
        </Tabs>
        <Box
          sx={{
            py: 5,
          }}
        >
          {value === 0 ? <UserForm /> : null}
          {value === 1 ? <MarchantForm /> : null}
        </Box>
      </Box>
    </div>
  );
}
