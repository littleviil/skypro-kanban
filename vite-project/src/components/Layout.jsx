import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { useLocation } from 'react-router-dom';

const Layout = ({ setIsAuth }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="layout">
      <Header setIsAuth={setIsAuth} isAuthPage={isAuthPage} />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;