import DynamicPagination from "@/components/DynamicPagination";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/shadcn-ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import Spinner from "@/components/Spinner";
import useActions from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import APIService from "@/services/APIService";
import { APIResType, PaymentsListRType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useLocation, useSearchParams } from "react-router";

type IProps = {};
type PaymentsQueryType = APIResType<PaymentsListRType>;

const PaymentList: React.FC<IProps> = () => {
  const { setQueryParams } = useActions();
  const location = useLocation();
  const [_, setSearchParams] = useSearchParams();

  const {
    query: { limit, page, search, type, status },
  } = useTypedSelector((state) => state.payments);

  const { data, isLoading, isFetching, refetch } = useQuery<PaymentsQueryType>({
    queryKey: ["payments", page, limit, search, type, status],
    queryFn: () =>
      APIService.fetchPayments<PaymentsListRType>({
        page,
        limit,
        search,
        type,
        status,
      }),
    refetchOnWindowFocus: false,
    retry: false,
  });

  const payments = data?.result?.entities;
  const err = data?.error;
  const totalCount = data?.result?.total!;

  React.useEffect(() => {
    const urlQuery = new URLSearchParams(location.search);

    let limit = parseInt(urlQuery.get("limit") || "10", 10);
    const validPageLimitOptions = [5, 10, 15];

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

  return (
    <section className="w-[calc(100vw-10rem)]">
      <div className="flex justify-between items-center">
        <h1>Payments List</h1>
        <SearchBar />
      </div>
      <div className="flex flex-col justify-between min-h-[calc(100vh-11rem)]">
        {(isLoading || isFetching) && <Spinner />}
        {err && !isFetching && (
          <div>
            <h2>{err}</h2>
            <Button variant="destructive" onClick={() => refetch()}>
              refresh
            </Button>
          </div>
        )}
        {!isFetching && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 items-center content-start gap-y-4 gap-x-8 mt-2 mb-[1rem]">
              {payments?.map((pay) => (
                <Card className="w-auto h-[7.5rem]" key={pay.id}>
                  <CardHeader>
                    <CardTitle>{`${pay.value} (post ${pay.id})`}</CardTitle>
                  </CardHeader>
                  <CardContent>{pay.description}</CardContent>
                </Card>
              ))}
            </div>
            {payments?.length === 0 && <h1>No such payments found</h1>}
          </>
        )}
        <DynamicPagination totalCount={totalCount} />
      </div>
    </section>
  );
};

export default PaymentList;
