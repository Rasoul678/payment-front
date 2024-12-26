export type PaymentsListRType = {
  entities: PaymentRType[];
  total: number;
  page: number;
  limit: number;
};

export type PaymentRType = {
  id: string;
  type: PayVarietyType;
  value: number;
  paid_at: string;
  status: PayStatusType;
  description: string | null;
};

export enum PayVarietyType {
  SALARY = "salary",
  BONUS = "bonus",
  COMMISSION = "commission",
  TRANSPORTATION = "transportation",
  OVERTIME = "overtime",
}

export enum PayStatusType {
  SUCCESS = "success",
  PENDING = "pending",
  FAILED = "failed",
}

export type APIResponseType = {
  result: PaymentsListRType | PaymentRType | null;
  error: string | null;
  status: number;
};
