import { useState } from 'react';
import { Wrapper } from './App.styled';
import AppRoutes from './AppRoutes';
import GlobalStyles from './GlobalStyles';
import './App.css';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <AppRoutes isAuth={isAuth} setIsAuth={setIsAuth} />
      </Wrapper>
    </>
  );
}

export default App;