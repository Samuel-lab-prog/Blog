import { Navigate, Outlet } from "react-router-dom";
import useIsAdmin from "../hooks/useIsAdmin";

export default function ProtectedRoute() {
  const isAuth = useIsAdmin();

  if (isAuth === null) {
    return <div>Verificando...</div>;
  }

  return isAuth ? <Outlet /> : <Navigate to="/signin" replace />;
}
