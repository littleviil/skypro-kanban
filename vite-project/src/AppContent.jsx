import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider as SCThemeProvider } from "styled-components";
import { Wrapper } from "./App.styled";
import AppRoutes from "./AppRoutes";
import GlobalStyles from "./GlobalStyles";
import GlobalAuthStyles from "./auth.styled";
import "./App.css";
import { Header } from "./components/Header/Header";
import { AuthContext } from "./context/AuthContext";
import { ThemeContext } from "./context/ThemeContext";
import { lightTheme, darkTheme } from "./themes";

function AppContent() {
  const { isAuth } = useContext(AuthContext);
  const { isDark } = useContext(ThemeContext);
  const [authChecked, setAuthChecked] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    setAuthChecked(true);
  }, []);

  if (!authChecked) return null;

  const currentTheme = isDark ? darkTheme : lightTheme;

  return (
    <SCThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <GlobalAuthStyles />

      {!isAuthPage && isAuth && (
        <Header
          onNewCardClick={() => {
            navigate("/card/new");
          }}
        />
      )}

      <Wrapper>
        <AppRoutes />
      </Wrapper>
    </SCThemeProvider>
  );
}

export default AppContent;