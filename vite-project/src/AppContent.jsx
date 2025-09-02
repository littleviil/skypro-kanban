import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Wrapper } from "./App.styled";
import AppRoutes from "./AppRoutes";
import GlobalStyles from "./GlobalStyles";
import GlobalAuthStyles from "./auth.styled";
import "./App.css";
import { Header } from "./components/Header/Header";
import PopNewCard from "./components/popus/PopNewCard/PopNewCard";
import { AuthContext } from "./context/AuthContext";

function AppContent() {
  const { isAuth } = useContext(AuthContext);

  const [authChecked, setAuthChecked] = useState(false);
  const [isPopNewCardOpen, setIsPopNewCardOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Web Design",
    status: "Без статуса",
    date: new Date().toISOString(),
  });

  const location = useLocation();
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
            setFormData({
              title: "",
              description: "",
              category: "Web Design",
              status: "Без статуса",
              date: new Date().toISOString(),
            });
            setIsPopNewCardOpen(true);
          }}
        />
      )}

      {isPopNewCardOpen && (
        <PopNewCard
          formData={formData}
          setFormData={setFormData}
          onClose={() => setIsPopNewCardOpen(false)}
        />
      )}

      <Wrapper>
        <AppRoutes />
      </Wrapper>
    </>
  );
}

export default AppContent;