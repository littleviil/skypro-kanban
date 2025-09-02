import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import ExitPage from "./pages/LogoutPage";
import RegisterPage from "./pages/RegisterPage";
import EditCardPage from "./pages/EditCardPage";
import NewCardPage from "./pages/NewCardPage";
import NotFoundPage from "./pages/NotFoundPage";
import UserPage from "./pages/UserPage";
import PrivateRoute from "./components/PrivateRoute";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function AppRoutes() {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  return (
    <Routes>
      <Route element={<PrivateRoute isAuth={isAuth} />}>
        <Route path="/" element={<MainPage />}>
          <Route path="card/new" element={<NewCardPage />} />
          <Route path="card/:id" element={<EditCardPage />} />
          <Route path="user" element={<UserPage setIsAuth={setIsAuth} />} />
          <Route path="logout" element={<ExitPage setIsAuth={setIsAuth} />} />
        </Route>
      </Route>

      <Route path="/login" element={<LoginPage setIsAuth={setIsAuth} />} />
      <Route path="/register" element={<RegisterPage setIsAuth={setIsAuth} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;