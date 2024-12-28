import { AppRoutePaths } from "@/constants";
import { NavLink, Outlet } from "react-router";

const AppLayout = () => {
  return (
    <main className="mt-4">
      <nav className="z-10 uppercase px-3 text-[1.2rem] fixed top-0 left-0 w-full bg-teal-500 text-black h-[3rem] flex justify-start items-center gap-4">
        <NavLink to={AppRoutePaths.BASE}>home</NavLink>
        <NavLink to={AppRoutePaths.PAYMENTS}>payments</NavLink>
      </nav>
      <Outlet />
    </main>
  );
};

export default AppLayout;
