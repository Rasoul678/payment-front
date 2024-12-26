import AppLayout from "@/components/App.layout";
import PaymentLayout from "@/components/Payment.layout";
import { AppRoutePaths } from "@/constants";
import NotFound from "@/views/404";
import Home from "@/views/home";
import PaymentList from "@/views/payments";
import PaymentDetails from "@/views/payments/details";
import { Route, Routes } from "react-router";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path={AppRoutePaths.BASE} element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path={AppRoutePaths.PAYMENTS} element={<PaymentLayout />}>
          <Route index element={<PaymentList />} />
          <Route path=":id" element={<PaymentDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
