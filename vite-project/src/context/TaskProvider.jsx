import { useState, useCallback, useEffect } from "react";
import { TaskContext } from "./TaskContext";
import { fetchKanbanTasks } from "../services/api";

const statusesList = [
  "Без статуса",
  "Нужно сделать",
  "В работе",
  "Тестирование",
  "Готово",
];

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const refreshTasks = useCallback(async () => {
    if (!token) return [];
    try {
      setLoading(true);
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
      setError("");
      return normalized;
    } catch (err) {
      console.error("Ошибка при загрузке задач:", err);
      setError("Не удалось загрузить задачи");
      return [];
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      refreshTasks();
    }
  }, [token, refreshTasks]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks, loading, error, refreshTasks }}>
      {children}
    </TaskContext.Provider>
  );
};