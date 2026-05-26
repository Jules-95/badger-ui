import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export function NeedAuth() {
  const location = useLocation();

  // useSelector lit le token directement depuis le store Redux
  const token = useSelector((state: any) => state.auth.token);

  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} />;
  }
}