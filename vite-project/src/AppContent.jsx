import { useContext, useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Wrapper } from "./App.styled";
import AppRoutes from "./AppRoutes";
import GlobalStyles from "./GlobalStyles";
import GlobalAuthStyles from "./auth.styled";
import "./App.css";
import { Header } from "./components/Header/Header";
import PopNewCard from "./components/popus/PopNewCard/PopNewCard";
import { fetchKanbanTasks } from "./services/api";
import { AuthContext } from "./context/AuthContext";
import { TaskContext } from "./context/TaskContext";

const statusesList = [
  "Без статуса",
  "Нужно сделать",
  "В работе",
  "Тестирование",
  "Готово",
];

function AppContent() {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const { setTasks } = useContext(TaskContext);

    console.log("🔑 isAuth:", isAuth);

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

  const token = localStorage.getItem("token");

  const capitalizeFirstLetter = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const refreshTasks = useCallback(async () => {
    if (!token) return [];
    try {
      const data = await fetchKanbanTasks(token);
      const tasksArray = Array.isArray(data) ? data : data.tasks || [];

      const normalized = tasksArray.map((task) => {
        const normalizedStatus = capitalizeFirstLetter(
          task.status || "Без статуса"
        );

        let category;
        if (task.category) {
          category = capitalizeFirstLetter(task.category);
        } else {
          const titleLower = task.title ? task.title.toLowerCase() : "";
          if (titleLower.includes("дизайн") || titleLower.includes("design")) {
            category = "Web Design";
          } else if (
            titleLower.includes("копирайт") ||
            titleLower.includes("writing")
          ) {
            category = "Copywriting";
          } else if (
            titleLower.includes("исслед") ||
            titleLower.includes("research")
          ) {
            category = "Research";
          } else {
            category = "Без категории";
          }
        }

        return {
          ...task,
          category,
          status: statusesList.includes(normalizedStatus)
            ? normalizedStatus
            : "Без статуса",
        };
      });

      setTasks(normalized);
      return normalized;
    } catch (error) {
      console.error("Ошибка при загрузке задач:", error);
      return [];
    }
  }, [token, setTasks]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setAuthChecked(true);
    if (storedToken) {
      setIsAuth(true);
      refreshTasks();
    }
  }, [refreshTasks, setIsAuth]);

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
          setIsAuth={setIsAuth}
        />
      )}

      {isPopNewCardOpen && (
        <PopNewCard
          formData={formData}
          setFormData={setFormData}
          onClose={() => setIsPopNewCardOpen(false)}
          refreshTasks={refreshTasks}
        />
      )}

      <Wrapper>
        <AppRoutes />
      </Wrapper>
    </>
  );
}

export default AppContent;