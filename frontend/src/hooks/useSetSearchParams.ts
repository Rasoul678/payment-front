import React from "react";
import { useLocation, useSearchParams } from "react-router";
import { useActions } from "./useActions";

/**
 * A React hook that manages the search parameters in the URL and updates the query parameters (redux) accordingly.
 *
 * @param totalCount - The total number of items to be displayed.
 * @returns void
 */
export const usePersistQueryParams = (totalCount: number) => {
  const { setQueryParams } = useActions();
  const location = useLocation();
  const [_, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    const urlQuery = new URLSearchParams(location.search);

    let limit = parseInt(urlQuery.get("limit") || "10", 10);
    const validPageLimitOptions = [5, 10, 15];

    //! revert to 10 if limit is not in valid options
    //! for example if user manually change limit to 1000 in url
    if (!validPageLimitOptions.includes(limit)) {
      limit = 10;
      urlQuery.set("limit", limit.toString());
      setSearchParams(urlQuery);
    }

    let page = parseInt(urlQuery.get("page") || "1", 10);
    if (totalCount > 0 && page * limit > totalCount + limit) {
      page = 1;
      urlQuery.set("page", page.toString());
      setSearchParams(urlQuery);
    }

    const initialQuery = {
      search: urlQuery.get("search") || "",
      type: urlQuery.get("type") || "",
      status: urlQuery.get("status") || "",
      page,
      limit,
    };

    setQueryParams(initialQuery);
  }, [location.search]);
};
