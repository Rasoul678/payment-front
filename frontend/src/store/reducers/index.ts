import { combineReducers } from "redux";
import paymentsReducer from "./paymentsReducer";

const rootReducer = combineReducers({
  payments: paymentsReducer,
});

export default rootReducer;
