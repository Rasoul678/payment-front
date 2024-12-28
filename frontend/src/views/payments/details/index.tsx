import Currency from "@/assets/svg/currency.svg";
import Document from "@/assets/svg/document.svg";
import { Button } from "@/components/shadcn-ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import Spinner from "@/components/Spinner";
import { AppRoutePaths } from "@/constants";
import { formatCurrency, formatDate } from "@/lib/utils";
import APIService from "@/services/APIService";
import { APIResType, PaymentRType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Navigate, useParams } from "react-router";

type IProps = {};
type DetailsParams = {
  id: string;
};
type PaymentsQueryType = APIResType<PaymentRType>;

const PaymentDetails: React.FC<IProps> = () => {
  let { id } = useParams<DetailsParams>();

  const { data, isLoading, isFetching, refetch } = useQuery<PaymentsQueryType>({
    queryKey: ["payment:id", id],
    queryFn: () => APIService.fetchPaymentById<PaymentRType>(id!),
    refetchOnWindowFocus: false,
    retry: false,
  });

  const error = data?.error;
  const status = data?.status;
  const payment = data?.result;

  if (isLoading || isFetching) return <Spinner />;

  if (error && status === 404) {
    return <Navigate to={AppRoutePaths.NOT_FOUND} replace={false} />;
  }

  if (error && status === 500 && !isFetching) {
    return (
      <div>
        <h2>{error}</h2>
        <Button variant="destructive" onClick={() => refetch()}>
          refresh
        </Button>
      </div>
    );
  }

  return (
    <Card
      data-effect="border"
      className={`min-h-[calc(100vh-11rem)] w-[100%] sm:w-[80%] md:w-[60%] m-auto ${payment?.status!}`}
    >
      <CardHeader className="border-0 border-b-2 relative flex flex-col sm:flex-row p-2">
        <img
          src={Currency}
          width={50}
          alt="currency icon"
          className="absolute top-[1rem] left-[1rem]"
        />
        <CardTitle
          data-effect="text"
          className={`text-[2rem] flex-1 ${payment?.status!}`}
        >
          {formatCurrency(payment?.value!)}
        </CardTitle>
        <div className="text-left opacity-80">
          <ul>
            <li>Type: {payment?.type}</li>
            <li>Status: {payment?.status}</li>
            <li>Date: {formatDate(payment?.paid_at!)}</li>
          </ul>
        </div>
      </CardHeader>
      <CardContent className="p-8 text-left relative">
        <img
          src={Document}
          width={35}
          alt="currency icon"
          className="absolute top-[1rem] left-[1rem]"
        />
        <p className="ml-10 italic">
          {payment?.description || '"No description provided"'}
        </p>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default PaymentDetails;
