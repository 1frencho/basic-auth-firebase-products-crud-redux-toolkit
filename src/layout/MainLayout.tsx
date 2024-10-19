import { lazy } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../stores";
import { toast } from "react-toastify";

const NavBar = lazy(() => import("../components/navigation/NavBar"));

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { loading, error, success, userInfo } = useSelector(
    (state: RootState) => state.auth,
  );
  if (error) {
    toast.error("Error authenticating user");
    console.log(error);
  }

  return (
    <>
      <NavBar loading={loading} success={success} userInfo={userInfo} />
      {children}
    </>
  );
};
