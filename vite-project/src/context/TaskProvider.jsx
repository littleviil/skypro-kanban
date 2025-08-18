import { useState, useCallback, useEffect, useMemo } from "react";
import { TaskContext } from "./TaskContext";
import {
  fetchKanbanTasks,
  deleteKanbanTask,
  updateKanbanTask,
  createKanbanTask,
} from "../services/api";

const STATUS_UI = {
  NO_STATUS: "Без статуса",
  TODO: "Нужно сделать",
  IN_PROGRESS: "В работе",
  TESTING: "Тестирование",
  DONE: "Готово",
};

const statusApiToUi = (apiStatus) => {
  const key = (apiStatus || "").toLowerCase();
  switch (key) {
    case "no-status":
    case "nostatus":
      return STATUS_UI.NO_STATUS;
    case "todo":
      return STATUS_UI.TODO;
    case "in-progress":
    case "inprogress":
      return STATUS_UI.IN_PROGRESS;
    case "testing":
      return STATUS_UI.TESTING;
    case "done":
      return STATUS_UI.DONE;
    default:
      return STATUS_UI.NO_STATUS;
  }
};

const statusUiToApi = (uiStatus) => {
  switch (uiStatus) {
    case STATUS_UI.NO_STATUS:
      return "no-status";
    case STATUS_UI.TODO:
      return "todo";
    case STATUS_UI.IN_PROGRESS:
      return "in-progress";
    case STATUS_UI.TESTING:
      return "testing";
    case STATUS_UI.DONE:
      return "done";
    default:
      return "no-status";
  }
};

const CATEGORY_UI = ["Web Design", "Copywriting", "Research", "Без категории"];

const categoryApiToUi = (apiCategory) => {
  const v = (apiCategory || "").toLowerCase().trim();
  if (v === "web design" || v === "design") return "Web Design";
  if (v === "copywriting") return "Copywriting";
  if (v === "research") return "Research";
  return "Без категории";
};

const categoryUiToApi = (uiCategory) => {
  switch (uiCategory) {
    case "Web Design":
      return "web design";
    case "Copywriting":
      return "copywriting";
    case "Research":
      return "research";
    case "Без категории":
    default:
      return ""; 
  }
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = useMemo(() => localStorage.getItem("token"), []);

  const normalizeTaskFromApi = (task) => {
    const status = statusApiToUi(task.status);
    let category = "Без категории";

    if (task.category) {
      category = categoryApiToUi(task.category);
    } else if (task.title) {
      const t = task.title.toLowerCase();
      if (t.includes("дизайн") || t.includes("design")) category = "Web Design";
      else if (t.includes("копирайт") || t.includes("writing"))
        category = "Copywriting";
      else if (t.includes("исслед") || t.includes("research"))
        category = "Research";
    }

    return {
      ...task,
      status,
      category,
    };
  };

  const refreshTasks = useCallback(async () => {
    if (!token) return [];
    try {
      setLoading(true);
      const data = await fetchKanbanTasks(token);
      const tasksArray = Array.isArray(data) ? data : data.tasks || [];
      const normalized = tasksArray.map(normalizeTaskFromApi);
      setTasks(normalized);
      setError("");
      return normalized;
    } catch (err) {
      console.error("Ошибка при загрузке задач:", err);
      setError("Не удалось загрузить задачи");
      setTasks([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, [token]);

  const removeTask = async (id) => {
    try {
      await deleteKanbanTask(id);
      await refreshTasks();
    } catch (err) {
      console.error("Ошибка удаления задачи:", err);
    }
  };

  const editTask = async (id, updatesUi) => {
    try {
      const updatesApi = {
        ...updatesUi,
        status: statusUiToApi(updatesUi.status),
        category: categoryUiToApi(updatesUi.category),
      };

      if (updatesUi.date) {
        updatesApi.date = new Date(updatesUi.date).toISOString();
      }

      await updateKanbanTask(id, updatesApi);
      await refreshTasks();
    } catch (err) {
      console.error("Ошибка обновления задачи:", err);
    }
  };

  const addTask = async (newTaskUi) => {
    try {
      const payload = {
        title: newTaskUi.title?.trim() || "",
        description: newTaskUi.description || "",
        status: statusUiToApi(newTaskUi.status || STATUS_UI.TODO),
        category: categoryUiToApi(newTaskUi.category || "Без категории"),
        date: newTaskUi.date ? new Date(newTaskUi.date).toISOString() : undefined,
      };

      await createKanbanTask(payload);
      await refreshTasks();
    } catch (err) {
      console.error("Ошибка создания задачи:", err);
    }
  };

  useEffect(() => {
    if (token) refreshTasks();
  }, [token, refreshTasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        loading,
        error,
        refreshTasks,
        removeTask,
        editTask,
        addTask,
        STATUS_UI,
        CATEGORY_UI,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
