import { AppRoutePaths } from "@/constants";
import React from "react";
import { Navigate, useParams } from "react-router";

type IProps = {};
type DetailsParams = {
  id: string;
};

const PaymentDetails: React.FC<IProps> = () => {
  let { id } = useParams<DetailsParams>();
  const numericID = Number(id);

  if (isNaN(numericID)) {
    return <Navigate to={AppRoutePaths.NOT_FOUND} replace={false} />;
  }

  return <h1>Payment Details: {numericID}</h1>;
};

export default PaymentDetails;
