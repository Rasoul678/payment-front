import { actionCreators } from "@/store";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

/**
 * A React hook that provides access to the action creators defined in the Redux store.
 *
 * This hook uses the `useDispatch` hook from `react-redux` to get the Redux dispatch function,
 * and the `bindActionCreators` function from `redux` to bind the action creators to the dispatch
 * function. The resulting object of bound action creators is memoized using `useMemo` to avoid
 * unnecessary re-renders.
 *
 * This hook is useful for easily dispatching actions from your React components without having
 * to manually call the `dispatch` function.
 */
export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
};
