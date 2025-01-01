import { PayStatusType, PayVarietyType } from "@/types";

export enum AppRoutePaths {
  BASE = "/",
  PAYMENTS = "/payments",
  DETAILS = "/payments/:id",
  NOT_FOUND = "/404",
}

export const API_URL = "http://localhost:8000";

export const typeOptions: PayVarietyType[] = [
  PayVarietyType.SALARY,
  PayVarietyType.BONUS,
  PayVarietyType.COMMISSION,
  PayVarietyType.TRANSPORTATION,
  PayVarietyType.OVERTIME,
];

export const statusOptions: PayStatusType[] = [
  PayStatusType.FAILED,
  PayStatusType.SUCCESS,
  PayStatusType.PENDING,
];

export const validPageLimitOptions = [10, 15, 20];
