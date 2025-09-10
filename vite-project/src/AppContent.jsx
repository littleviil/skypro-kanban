import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Wrapper } from "./App.styled";
import AppRoutes from "./AppRoutes";
import GlobalStyles from "./GlobalStyles";
import GlobalAuthStyles from "./auth.styled";
import "./App.css";
import { Header } from "./components/Header/Header";
import { AuthContext } from "./context/AuthContext";

function AppContent() {
  const { isAuth } = useContext(AuthContext);
  const [authChecked, setAuthChecked] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    setAuthChecked(true);
  }, []);

  if (!authChecked) return null;

  return (
    <>
      <GlobalStyles />
      <GlobalAuthStyles />

      {!isAuthPage && isAuth && (
        <Header
          onNewCardClick={() => {
            navigate("/card/new"); // теперь через роутинг
          }}
        />
      )}

      <Wrapper>
        <AppRoutes />
      </Wrapper>
    </>
  );
}

export default AppContent;