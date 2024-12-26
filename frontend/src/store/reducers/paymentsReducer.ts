import { PaymentsStateType } from "@/types";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import { Action, ActionType } from "../actions/actions";

const initialState: PaymentsStateType = {
  payments: null,
  error: null,
  query: {
    search: "",
    type: "",
    status: "",
    page: 1,
    limit: 5,
  },
};
const paymentsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_QUERY:
      return { ...state, query: action.payload };
    case ActionType.FETCH_PAYMENTS_SUCCESS:
      return { ...state, payments: action.payload };
    case ActionType.FETCH_PAYMENTS_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const paymentsPersistConfig = {
  key: "payments",
  storage: storageSession,
};

const persistedPaymentsReducer = persistReducer(
  paymentsPersistConfig,
  paymentsReducer
);

export default persistedPaymentsReducer;
