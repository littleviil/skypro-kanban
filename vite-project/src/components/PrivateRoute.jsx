import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

function PrivateRoute({ isAuth }) {
  const [isChecked, setIsChecked] = useState(false);
  const [auth, setAuth] = useState(isAuth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuth(!!token);
    setIsChecked(true);
  }, [isAuth]);

  if (!isChecked) return null;

  return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
