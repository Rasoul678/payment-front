import PaginationDemo from "@/components/DynamicPagination";
import Spinner from "@/components/Loader";
import { Button } from "@/components/shadcn-ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import useActions from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import APIService from "@/services/APIService";
import { APIResType, PaymentsListRType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type IProps = {};

const PaymentList: React.FC<IProps> = () => {
  const { setQueryParams } = useActions();
  const {
    query: { limit, page },
  } = useTypedSelector((state) => state.default);

  const { data, isLoading, isFetching, refetch } = useQuery<
    APIResType<PaymentsListRType>
  >({
    queryKey: ["payments", page, limit],
    queryFn: () => APIService.fetchPayments({ page, limit }),
    refetchOnWindowFocus: false,
    retry: false,
  });

  const payments = data?.result?.entities;
  const err = data?.error;

  return (
    <section className="w-[calc(100vw-10rem)]">
      <h1>Payments List</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 items-center content-start gap-2 mt-2 mb-[1rem]">
          {payments?.map((pay) => (
            <Card className="w-auto h-[8.5rem]" key={pay.id}>
              <CardHeader>
                <CardTitle>{`${pay.value} (post ${pay.id})`}</CardTitle>
              </CardHeader>
              <CardContent>{pay.description}</CardContent>
            </Card>
          ))}
        </div>
        <PaginationDemo />
      </div>
    </section>
  );
};

export default PaymentList;
