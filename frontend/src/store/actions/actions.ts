import { PaymentsListRType, QueryParams } from "@/types";

export enum ActionType {
  SET_QUERY = "set-query",
  FETCH_PAYMENTS_SUCCESS = "fetch-payments-success",
  FETCH_PAYMENTS_FAILURE = "fetch-payments-failure",
}

export interface SetQueryAction {
  type: ActionType.SET_QUERY;
  payload: Partial<QueryParams>;
}

export interface FetchPaymentsSuccessAction {
  type: ActionType.FETCH_PAYMENTS_SUCCESS;
  payload: PaymentsListRType;
}

export interface FetchPaymentsFailureAction {
  type: ActionType.FETCH_PAYMENTS_FAILURE;
  payload: string;
}

export type Action =
  | SetQueryAction
  | FetchPaymentsSuccessAction
  | FetchPaymentsFailureAction;
