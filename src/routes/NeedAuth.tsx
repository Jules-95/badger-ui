import { Navigate, Outlet, useLocation } from "react-router-dom";

//Typage 
interface NeedAuthType {
  token: string;
}

export function NeedAuth({ token }: NeedAuthType) {
  const location = useLocation();

  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} />;
  }
}