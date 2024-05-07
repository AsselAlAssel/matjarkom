import { Box, Drawer, Stack } from "@mui/material";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";
import {
  getOrder,
  removeOrder,
  updateOrder,
} from "../../Stores/project/orders";
import { useDispatch, useSelector } from "react-redux";

export default function SideBar({ openDrawer, setOpenDrawer }) {
  const orders = useSelector(getOrder);
  const dispatch = useDispatch();

  return (
    <Drawer
      open={openDrawer}
      anchor="right"
      onClose={() => setOpenDrawer(false)}
      transitionDuration={{
        appear: 400,
        enter: 400,
        exit: 400,
      }}
      sx={{
        zIndex: 99,
      }}
      PaperProps={{
        sx: {
          width: {
            xs: "100%",
            sm: "100%",
            md: "100%",
            lg: "400px",
            xl: "400px",
          },
          p: 2,
        },
      }}
    >
      <Box className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Cart</h2>
        <IoMdClose
          className="text-2xl cursor-pointer"
          onClick={() => setOpenDrawer(false)}
        />
      </Box>
      <Box
        sx={{
          overflowY: "auto",
          height: "calc(100vh - 100px)",
          pt: 2,
        }}
      >
        {orders.map((order, index) => (
          <Stack
            key={index}
            spacing={2}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ borderBottom: "1px solid #ccc", pb: 2 }}
          >
            <Stack direction={"row"} spacing={2}>
              <Box>
                <img
                  src={order.cartPrimaryImage}
                  alt={order.cartName}
                  className="w-20 h-20"
                />
              </Box>
              <Box>
                <h3 className="text-lg font-semibold">{order.cartName}</h3>
                <p className="text-sm">Qty: {order.qty}</p>
                <p className="text-sm">Price: ${order.cartPrice}</p>
              </Box>
            </Stack>
            <Box>
              <IoMdClose
                className="text-2xl cursor-pointer"
                onClick={() => dispatch(removeOrder(order._id))}
              />
              <IoMdAdd
                className="text-2xl cursor-pointer"
                onClick={() =>
                  dispatch(updateOrder({ ...order, qty: order.qty + 1 }))
                }
              />
              <IoMdRemove
                className="text-2xl cursor-pointer"
                onClick={() => {
                  if (order.qty > 1) {
                    dispatch(updateOrder({ ...order, qty: order.qty - 1 }));
                  } else {
                    dispatch(removeOrder(order.id));
                  }
                }}
              />
            </Box>
          </Stack>
        ))}
      </Box>
      <Box>
        <h2 className="text-xl font-semibold">
          Total: $
          {orders.reduce((acc, order) => acc + order.qty * order.cartPrice, 0)}
        </h2>
      </Box>
    </Drawer>
  );
}
