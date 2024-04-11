import { combineReducers } from "redux";
import auth from "./project/auth";
import orders from "./project/orders";

const rootReducer = combineReducers({
  auth,
  orders,
});

export default rootReducer;
