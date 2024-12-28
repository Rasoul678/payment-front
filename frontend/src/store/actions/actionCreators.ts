import { PaymentsListRType, QueryParams } from "@/types";
import {
  ActionType,
  FetchPaymentsFailureAction,
  FetchPaymentsSuccessAction,
  SetQueryAction,
} from "./actions";

export const setQueryParams = (query: QueryParams): SetQueryAction => {
  return { type: ActionType.SET_QUERY, payload: query };
};

export const fetchPaymentsSuccess = (
  payments: PaymentsListRType
): FetchPaymentsSuccessAction => {
  return { type: ActionType.FETCH_PAYMENTS_SUCCESS, payload: payments };
};

export const fetchPaymentsFailure = (
  error: string
): FetchPaymentsFailureAction => {
  return { type: ActionType.FETCH_PAYMENTS_FAILURE, payload: error };
};
