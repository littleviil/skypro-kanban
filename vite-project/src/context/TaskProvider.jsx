import { useState, useCallback, useEffect } from "react";
import { TaskContext } from "./TaskContext";
import {
  fetchKanbanTasks,
  deleteKanbanTask,
  updateKanbanTask,
  createKanbanTask,
} from "../services/api";

  export const STATUS_UI = {
    NO_STATUS: "Без статуса",
    TODO: "Нужно сделать",
    IN_PROGRESS: "В работе",
    TESTING: "Тестирование",
    DONE: "Готово",
  };

  export const CATEGORY_UI = ["Web Design", "Copywriting", "Research"];

  const STATUS_UI_TO_API = {
    [STATUS_UI.NO_STATUS]: "no-status",
    [STATUS_UI.TODO]: "todo",
    [STATUS_UI.IN_PROGRESS]: "in-progress",
    [STATUS_UI.TESTING]: "testing",
    [STATUS_UI.DONE]: "done",
  };

  const STATUS_API_TO_UI = Object.fromEntries(
    Object.entries(STATUS_UI_TO_API).map(([k, v]) => [v, k])
  );

  const normalizeCategory = (topic) => {
    if (!topic) return "";
    const lower = topic.toLowerCase();
    switch (lower) {
      case "web design":
        return "Web Design";
      case "copywriting":
        return "Copywriting";
      case "research":
        return "Research";
      default:
        return topic;
    }
  };

  const statusUiToApi = (uiStatus) => STATUS_UI_TO_API[uiStatus] ?? "no-status";

  const normalizeTaskFromApi = (task) => {
    const statusFromServer = task.status || "no-status";
    const statusApi = statusFromServer === "Без статуса" ? "no-status" : statusFromServer.toLowerCase();
    const statusUi = STATUS_API_TO_UI[statusApi] || STATUS_UI.NO_STATUS;

    const dateValue =
      task.date instanceof Date
        ? task.date
        : task.date
        ? new Date(task.date)
        : new Date();

    let taskId = task.id ?? task._id ?? "";
    if (!taskId) {
      taskId = `generated-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      console.warn("Задача получена без ID, сгенерирован новый:", taskId);
    }

    return {
      id: String(taskId),
      title: task.title ?? task.name ?? "",
      description: task.description ?? "",
      statusApi,
      statusUi,
      topicApi: task.topic ?? "",
      categoryUi: normalizeCategory(task.topic),
      date: dateValue,
    };
  };

  export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [token, setToken] = useState(() => localStorage.getItem("token"));

    const refreshTasks = useCallback(async () => {
      if (!token) return [];
      try {
        setLoading(true);
        const data = await fetchKanbanTasks(token);
        const tasksArray = Array.isArray(data) ? data : data.tasks || [];
        
        const normalized = tasksArray.map(normalizeTaskFromApi);
        const seenIds = new Set();
        const uniqueTasks = [];
        
        for (const task of normalized) {
          if (seenIds.has(task.id)) {
            task.id = `duplicate-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          }
          seenIds.add(task.id);
          uniqueTasks.push(task);
        }
        
        setTasks(uniqueTasks);
        setError("");
        return uniqueTasks;
      } catch (err) {
        console.error("Ошибка при загрузке задач:", err);
        setError("Не удалось загрузить задачи");
        return [];
      } finally {
        setLoading(false);
      }
    }, [token]);

    useEffect(() => {
      const handleStorageChange = () => {
        const newToken = localStorage.getItem("token");
        setToken(newToken);
      };
      
      const handleTokenChange = (event) => {
        const newToken = event.detail.token;
        setToken(newToken);
      };
      
      window.addEventListener("storage", handleStorageChange);
      window.addEventListener("tokenChanged", handleTokenChange);
      
      return () => {
        window.removeEventListener("storage", handleStorageChange);
        window.removeEventListener("tokenChanged", handleTokenChange);
      };
    }, []);

    const updateToken = useCallback(() => {
      const newToken = localStorage.getItem("token");
      setToken(newToken);
    }, []);

    useEffect(() => {
      if (token) {
        refreshTasks();
      } else {
        setTasks([]);
      }
    }, [token, refreshTasks]);

    const removeTask = async (id) => {
      if (!id) {
        console.error("removeTask called with undefined id");
        return;
      }

      try {
        await deleteKanbanTask(id);
        setTasks((prev) => prev.filter((t) => String(t.id) !== String(id)));
      } catch (err) {
        console.error("Ошибка при удалении задачи:", err);
      }
    };

    const editTask = async (id, updatesUi) => {
      if (!id) {
        console.error("editTask called with undefined id", updatesUi);
        return null;
      }

      const updatesApi = {
        title: updatesUi.title?.trim() ?? "",
        description: updatesUi.description ?? "",
        status: statusUiToApi(updatesUi.statusUi),
        topic: updatesUi.categoryUi,
        date: updatesUi.date
          ? new Date(updatesUi.date).toISOString()
          : undefined,
      };

      try {
        await updateKanbanTask(id, updatesApi);
        
        const updatedTask = {
          id: String(id),
          title: updatesUi.title?.trim() ?? "",
          description: updatesUi.description ?? "",
          statusApi: statusUiToApi(updatesUi.statusUi),
          statusUi: updatesUi.statusUi,
          topicApi: updatesUi.categoryUi,
          categoryUi: normalizeCategory(updatesUi.categoryUi),
          date: updatesUi.date ? new Date(updatesUi.date) : new Date(),
        };
        
        setTasks((prev) => {
          const updated = prev.map((task) => 
            String(task.id) === String(id) ? { ...task, ...updatedTask } : task
          );
          return updated;
        });
        
        return updatedTask;
      } catch (error) {
        console.error("Ошибка при обновлении задачи:", error);
        throw error;
      }
    };

  const addTask = async (newTaskUi) => {   
    const payload = {
      title: newTaskUi.title.trim(),
      description: newTaskUi.description ?? "",
      status: statusUiToApi(STATUS_UI.NO_STATUS),
      topic: newTaskUi.category,                
      date: newTaskUi.date
        ? new Date(newTaskUi.date).toISOString()
        : new Date().toISOString(),
    };

    try {
      await createKanbanTask(payload);
      const refreshedTasks = await refreshTasks();

      const newTask = refreshedTasks.find(task => 
        task.title === payload.title && 
        task.description === payload.description
      ) || refreshedTasks[refreshedTasks.length - 1];
      return newTask;
    } catch (e) {
      console.error("Ошибка при создании задачи:", e);
      throw e;
    }
  };

  const clearTasks = useCallback(() => {
    setTasks([]);
  }, []);

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
        clearTasks,
        updateToken,
        STATUS_UI,
        CATEGORY_UI,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};