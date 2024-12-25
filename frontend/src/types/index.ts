export enum PaymentVarietyType {
  SALARY = "salary",
  BONUS = "bonus",
  COMMISSION = "commission",
  TRANSPORTATION = "transportation",
  OVERTIME = "overtime",
}

export enum PaymentStatusType {
  SUCCESS = "success",
  PENDING = "pending",
  FAILED = "failed",
}

export type PaymentsResponseType = {
  entities: Entity[];
  total: number;
  page: number;
  limit: number;
};

export type Entity = {
  id: string;
  type: PaymentVarietyType;
  value: number;
  paid_at: string;
  status: PaymentStatusType;
  description: string | null;
};
