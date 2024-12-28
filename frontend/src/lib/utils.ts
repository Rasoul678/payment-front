import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatDate = (value: string) => {
  const date = new Date(Date.parse(value));

  const options: Intl.DateTimeFormatOptions = {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const getColor = (status: string, type: "text" | "border" | "bg") => {
  if (status === "failed") return `${type}-red-500`;
  if (status === "pending") return `${type}-yellow-500`;
  return `${type}-teal-500`;
};
