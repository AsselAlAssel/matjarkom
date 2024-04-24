import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const existingOrder = state.orders.find(
        (order) => order._id === action.payload._id,
      );
      if (existingOrder) {
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id,
        );
        state.orders[index] = {
          ...state.orders[index],
          qty: state.orders[index].qty + 1,
        };
      } else {
        state.orders.push(action.payload);
      }
    },
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order._id !== action.payload,
      );
    },
    updateOrder: (state, action) => {
      state.orders = state.orders.map((order) =>
        order.id === action.payload._id ? action.payload : order,
      );
    },
  },
});

export const getOrder = (state) => state.orders.orders;

export const { addOrder, removeOrder, updateOrder } = orderSlice.actions;
export default orderSlice.reducer;
