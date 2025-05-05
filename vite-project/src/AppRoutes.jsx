import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EditCardPage from './pages/EditCardPage';
import NewCardPage from './pages/NewCardPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';
import PopNewCard from './components/popus/PopNewCard/PopNewCard';
import PopBrowse from './components/popus/PopBrowse/PopBrowse';

function AppRoutes({ isAuth, setIsAuth }) {
  return (
    <Routes>
      <Route element={<PrivateRoute isAuth={isAuth} />}>
        <Route path="/" element={<MainPage setIsAuth={setIsAuth} />}>
          <Route path="new" element={<PopNewCard onClose={() => window.history.back()} />} />
          <Route path="card/:id" element={<PopBrowse onClose={() => window.history.back()} />} />
        </Route>
        <Route path="/card/add" element={<NewCardPage />} />
        <Route path="/card/edit/:id" element={<EditCardPage />} />
      </Route>
      <Route path="/login" element={<LoginPage setIsAuth={setIsAuth} />} />
      <Route path="/register" element={<RegisterPage setIsAuth={setIsAuth} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;