import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple CSS class names into a single string.
 *
 * This function takes an array of class values (strings, numbers, booleans, or objects) and
 * returns a single string of class names. It uses the `clsx` and `twMerge` libraries to
 * handle conditional class names and merge duplicate class names.
 *
 * @param inputs - An array of class values to be combined.
 * @returns A single string of combined class names.
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

/**
 * Formats a date string as a medium-style date and short-time in the UTC time zone.
 *
 * @param value - A date string to be formatted.
 * @returns The formatted date and time string.
 */
export const formatDate = (value: string) => {
  const date = new Date(Date.parse(value));

  const options: Intl.DateTimeFormatOptions = {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

/**
 * Formats a number as a currency value in US dollars.
 *
 * @param value - The number to be formatted as a currency value.
 * @returns The formatted currency value as a string.
 */
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};
