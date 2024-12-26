import PaginationDemo from "@/components/Pagination";
import useActions from "@/hooks/useActions";
import APIService from "@/services/APIService";
import { APIResponseType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type IProps = {};

const PaymentList: React.FC<IProps> = () => {
  const { setQuery } = useActions();
  const [_currentPage, _setCurrentPage] = React.useState(1);

  const { data, isError, isLoading, isSuccess, error, status, refetch } =
    useQuery<APIResponseType>({
      queryKey: ["payments", 1, 10],
      queryFn: () => APIService.fetchPayments({ page: 1, limit: 10 }),
    });

  setQuery({ page: 2 });

  console.log({ data, isError, isLoading, isSuccess, error, status });

  return (
    <section>
      <h1>All Payments</h1>
      <PaginationDemo />
    </section>
  );
};

export default PaymentList;
