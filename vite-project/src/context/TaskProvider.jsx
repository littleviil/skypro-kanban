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

const CATEGORY_UI = ["Web Design", "Copywriting", "Research", "Без категории"];

const STATUS_API_TO_UI = {
  "no-status": STATUS_UI.NO_STATUS,
  "nostatus": STATUS_UI.NO_STATUS,
  "todo": STATUS_UI.TODO,
  "in-progress": STATUS_UI.IN_PROGRESS,
  "inprogress": STATUS_UI.IN_PROGRESS,
  "testing": STATUS_UI.TESTING,
  "done": STATUS_UI.DONE,
};

const STATUS_UI_TO_API = {
  [STATUS_UI.NO_STATUS]: "no-status",
  [STATUS_UI.TODO]: "todo",
  [STATUS_UI.IN_PROGRESS]: "in-progress",
  [STATUS_UI.TESTING]: "testing",
  [STATUS_UI.DONE]: "done",
};

const statusApiToUi = (apiStatus) => {
  const key = (apiStatus || "").toLowerCase().trim();
  return STATUS_API_TO_UI[key] || STATUS_UI.NO_STATUS;
};

const statusUiToApi = (uiStatus) => {
  return STATUS_UI_TO_API[uiStatus] || "no-status";
};

const CATEGORY_API_TO_UI = {
  "web design": "Web Design",
  "design": "Web Design",
  "copywriting": "Copywriting",
  "research": "Research",
  "no-category": "Без категории",
  "": "Без категории",
};

const CATEGORY_UI_TO_API = {
  "Web Design": "web design",
  "Copywriting": "copywriting",
  "Research": "research",
  "Без категории": "",
};

const categoryApiToUi = (apiCategory) => {
  const key = (apiCategory || "").toLowerCase().replace("_", " ").trim();
  return CATEGORY_API_TO_UI[key] || "Без категории";
};

const categoryUiToApi = (uiCategory) => {
  return CATEGORY_UI_TO_API[uiCategory] ?? "";
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = useMemo(() => localStorage.getItem("token"), []);

  const normalizeTaskFromApi = (task) => {
    return {
      ...task,
      status: statusApiToUi(task.status),
      category: categoryApiToUi(task.topic),
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
        topic: categoryUiToApi(updatesUi.category),
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
        topic: categoryUiToApi(newTaskUi.category || "Без категории"),
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
