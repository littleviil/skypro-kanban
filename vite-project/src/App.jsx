import { useState, useEffect } from 'react';
import { Wrapper } from './App.styled';
import AppRoutes from './AppRoutes';
import GlobalStyles from './GlobalStyles';
import GlobalAuthStyles from './auth.styled';
import './App.css';
import { Header } from './components/Header/Header';
import PopNewCard from './components/popus/PopNewCard/PopNewCard';
import { useLocation } from 'react-router-dom';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [isPopNewCardOpen, setIsPopNewCardOpen] = useState(false);
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  // Проверяем токен при монтировании
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuth(!!token);
    setAuthChecked(true);
  }, []);

  // Пока авторизация не проверена — не рендерим ничего
  if (!authChecked) return null;

  return (
    <>
      <GlobalStyles />
      <GlobalAuthStyles />

      {!isAuthPage && isAuth && (
        <Header
          onNewCardClick={() => setIsPopNewCardOpen(true)}
          setIsAuth={setIsAuth}
        />
      )}

      {isPopNewCardOpen && (
        <PopNewCard onClose={() => setIsPopNewCardOpen(false)} />
      )}

      <Wrapper>
        <AppRoutes isAuth={isAuth} setIsAuth={setIsAuth} />
      </Wrapper>
    </>
  );
}

export default App;
