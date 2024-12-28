import AppLayout from "@/components/App.layout";
import PaymentLayout from "@/components/Payment.layout";
import { AppRoutePaths } from "@/constants";
import NotFound from "@/views/404";
import Home from "@/views/home";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import PageSkeleton from "./components/PageSkeleton";

const PaymentList = lazy(() => import("@/views/payments"));
const PaymentDetails = lazy(() => import("@/views/payments/details"));

const App = () => {
  return (
    <Routes>
      <Route path={AppRoutePaths.BASE} element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path={AppRoutePaths.PAYMENTS} element={<PaymentLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<PageSkeleton />}>
                <PaymentList />
              </Suspense>
            }
          />
          <Route
            path=":id"
            element={
              <Suspense fallback={<PageSkeleton />}>
                <PaymentDetails />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
