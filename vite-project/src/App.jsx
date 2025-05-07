import { useState } from 'react';
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
  const [isPopNewCardOpen, setIsPopNewCardOpen] = useState(false);
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      <GlobalStyles />
      <GlobalAuthStyles />
      {!isAuthPage && (
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