import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "./components/Layout";
import { AppRoutes } from "./constants";
import NotFound from "./views/404";
import Home from "./views/home";
import Payments from "./views/payments";
import PaymentDetails from "./views/payments/details";

const App = () => {
  return (
    <Routes>
      <Route path={AppRoutes.HOME} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={AppRoutes.PAYMENTS}>
          <Route index element={<Payments />} />
          <Route path=":id" element={<PaymentDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
