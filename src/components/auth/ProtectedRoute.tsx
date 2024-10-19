import { useSelector } from "react-redux";
import { RootState } from "../../stores";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { loading, userInfo } = useSelector((state: RootState) => state.auth);

  if (!loading && !userInfo?.email) {
    return <Navigate to="/signIn" />;
  }
  return <>{children}</>;
};
