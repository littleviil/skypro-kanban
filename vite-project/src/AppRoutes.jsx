import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EditCardPage from './pages/EditCardPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';

function AppRoutes({ isAuth, setIsAuth, tasks, setTasks, refreshTasks }) {
  return (
    <Routes>
      <Route element={<PrivateRoute isAuth={isAuth} />}>
        <Route
          path="/"
          element={
            <MainPage
              setIsAuth={setIsAuth}
              tasks={tasks}
              setTasks={setTasks}
              refreshTasks={refreshTasks}
            />
          }
        >
          <Route path="card/:id" element={<EditCardPage />} />
        </Route>
      </Route>
      <Route path="/login" element={<LoginPage setIsAuth={setIsAuth} />} />
      <Route path="/register" element={<RegisterPage setIsAuth={setIsAuth} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;