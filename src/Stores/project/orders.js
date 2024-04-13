import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [
    {
      id: 1,
      name: "headphone",
      price: 120,
      image: "https://picsum.photos/200/300",
      qty: 1,
    },
  ],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload,
      );
    },
    updateOrder: (state, action) => {
      state.orders = state.orders.map((order) =>
        order.id === action.payload.id ? action.payload : order,
      );
    },
  },
});

export const getOrder = (state) => state.orders.orders;

export const { addOrder, removeOrder, updateOrder } = orderSlice.actions;
export default orderSlice.reducer;
