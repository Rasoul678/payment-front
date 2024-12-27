import { PaymentsStateType } from "@/types";
import { Action, ActionType } from "../actions/actions";

const initialState: PaymentsStateType = {
  payments: null,
  error: null,
  query: {
    search: "",
    type: "",
    status: "",
    page: 1,
    limit: 10,
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

export default paymentsReducer;
