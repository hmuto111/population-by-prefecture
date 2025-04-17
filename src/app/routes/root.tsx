import { Outlet } from "react-router";
import { Header } from "@/components/header/header";

const AppRoot = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default AppRoot;
