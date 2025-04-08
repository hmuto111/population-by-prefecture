import { Outlet } from "react-router";
import { Header } from "@/components/header/header";

const AppRoot = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default AppRoot;
