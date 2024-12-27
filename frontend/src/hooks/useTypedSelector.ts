import { RootState } from "@/store";
import { TypedUseSelectorHook, useSelector } from "react-redux";

/**
 * A typed version of the `useSelector` hook from `react-redux`.
 * This hook ensures that the return type of `useSelector` is correctly typed
 * based on the `RootState` type from the Redux store.
 */
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
