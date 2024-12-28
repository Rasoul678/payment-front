import DynamicPagination from "@/components/DynamicPagination";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/shadcn-ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import Spinner from "@/components/Spinner";
import { usePersistQueryParams, useTypedSelector } from "@/hooks";
import { formatCurrency, formatDate, getColor } from "@/lib/utils";
import APIService from "@/services/APIService";
import { APIResType, PaymentsListRType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { NavLink } from "react-router";

type IProps = {};
type PaymentsQueryType = APIResType<PaymentsListRType>;

const PaymentList: React.FC<IProps> = () => {
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

  usePersistQueryParams(totalCount);

  return (
    <section>
      <div className="flex sticky top-[3rem] z-10 justify-between items-center bg-background">
        <h1 className="w-[25rem] hidden lg:block">Payments List</h1>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center content-start gap-4 mt-2 mb-[1rem]">
              {payments?.map((pay) => {
                const color = getColor(pay.status, "bg");
                return (
                  <Card className="w-auto h-[10rem]" key={pay.id}>
                    <NavLink to={`/payments/${pay.id}`}>
                      <CardHeader className="p-3 text-justify border-0 border-b-2">
                        <CardTitle>
                          <div className="relative inline-flex">
                            <span className="capitalize ml-3">
                              {pay.status}
                            </span>
                            <span
                              className={`absolute top-2 -left-1 grid min-h-[0.5rem] min-w-[0.5rem] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full ${color} py-1 px-1 text-xs text-white`}
                            ></span>
                          </div>
                        </CardTitle>
                        <CardTitle className="capitalize">
                          Type: {pay.type}
                        </CardTitle>
                        <CardTitle>
                          Amount: {formatCurrency(pay.value)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 text-left h-[2.5rem] truncate italic">
                        {pay.description || '"No description provided"'}
                      </CardContent>
                      <CardFooter className="p-1 justify-center text-sm opacity-80">
                        🗓️ {formatDate(pay.paid_at)}
                      </CardFooter>
                    </NavLink>
                  </Card>
                );
              })}
            </div>
            {payments?.length === 0 && <h1>No such payments exist yet!</h1>}
          </>
        )}
        <DynamicPagination totalCount={totalCount} />
      </div>
    </section>
  );
};

export default PaymentList;
