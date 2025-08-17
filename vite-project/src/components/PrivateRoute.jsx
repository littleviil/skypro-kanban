import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ isAuth }) {
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default PrivateRoute;