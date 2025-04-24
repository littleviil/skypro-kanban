import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CardPage from './pages/CardPage';
import EditCardPage from './pages/EditCardPage';
import NewCardPage from './pages/NewCardPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';

function AppRoutes({ isAuth, setIsAuth }) {
  return (
    <Routes>
      <Route element={<PrivateRoute isAuth={isAuth} />}>
        <Route path="/" element={<MainPage setIsAuth={setIsAuth} />} />
        <Route path="/card/add" element={<NewCardPage />} />
        <Route path="/card/:id" element={<CardPage />} />
        <Route path="/card/edit/:id" element={<EditCardPage />} />
      </Route>
      <Route path="/login" element={<LoginPage setIsAuth={setIsAuth} />} />
      <Route path="/register" element={<RegisterPage setIsAuth={setIsAuth} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;