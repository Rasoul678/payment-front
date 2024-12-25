import { useQuery } from "@tanstack/react-query";
import React from "react";
import { API_URL } from "../../constants";
import { PaymentsResponseType } from "../../types";

type IProps = {};

const fetchPayments = async ({
  queryKey: [_, page, limit],
}: {
  queryKey: [string, number, number];
}): Promise<PaymentsResponseType> => {
  const response = await fetch(
    `${API_URL}/payments?limit=${limit}&page=${page}`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return data;
};

const Payments: React.FC<IProps> = () => {
  const [_currentPage, _setCurrentPage] = React.useState(1);

  const { data, isError, isLoading, isSuccess, error, status, refetch } =
    useQuery<PaymentsResponseType>({
      queryKey: ["payments", 1, 10],
      queryFn: () => fetchPayments({ queryKey: ["payments", 1, 10] }),
      retry: 3,
    });

  console.log({ data, isError, isLoading, isSuccess, error, status });

  return (
    <section>
      <h1>All Payments</h1>
    </section>
  );
};

export default Payments;
