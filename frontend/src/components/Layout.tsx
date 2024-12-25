import { CSSProperties } from "react";
import { NavLink, Outlet } from "react-router";
import { AppRoutes } from "../constants";

const Layout = () => {
  return (
    <main>
      <nav style={styles}>
        <NavLink to={AppRoutes.HOME}>home</NavLink>
        <NavLink to={AppRoutes.PAYMENTS}>payments</NavLink>
      </nav>
      <Outlet />
    </main>
  );
};

const styles = {
  position: "fixed",
  top: 0,
  left: 0,
  backgroundColor: "cyan",
  width: "100%",
  color: "black",
  height: "50px",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "10px",
  padding: "0 10px",
  fontSize: "1.2rem",
  textTransform: "uppercase",
} as CSSProperties;

export default Layout;
