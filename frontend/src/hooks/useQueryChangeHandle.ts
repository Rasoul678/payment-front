import { QueryParams } from "@/types";
import { useCallback } from "react";
import { useSearchParams } from "react-router";

/**
 * A React hook that provides a function to handle changes to the URL query parameters.
 *
 * The `useQueryChangeHandle` hook returns a function `handle` that can be used to update the URL query parameters.
 * The `handle` function takes two arguments: `key` (the name of the query parameter to update) and `value` (the new value for the query parameter).
 * If the `value` is falsy, the corresponding query parameter will be removed from the URL.
 * The hook uses the `useSearchParams` hook from `react-router` to update the URL query parameters.
 */
export const useQueryChangeHandle = () => {
  const [_, setSearchParams] = useSearchParams();

  const handle = useCallback((key: keyof QueryParams, value: string) => {
    const params = new URLSearchParams(location.search);

    params.set(key, value);

    if (!value) {
      params.delete(key, value);
    }

    setSearchParams(params);
  }, []);

  return handle;
};
