import { useState, useCallback, useEffect, useMemo } from "react";
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
    const statusApi = (task.status || "no-status").toLowerCase();
    const statusUi = STATUS_API_TO_UI[statusApi] || STATUS_UI.NO_STATUS;

    const dateValue =
      task.date instanceof Date
        ? task.date
        : task.date
        ? new Date(task.date)
        : new Date();

    return {
      id: String(task.id ?? task._id ?? ""),
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
    const token = useMemo(() => localStorage.getItem("token"), []);

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
        console.error(err);
        setError("Не удалось загрузить задачи");
        return [];
      } finally {
        setLoading(false);
      }
    }, [token]);

    useEffect(() => {
      if (token) refreshTasks();
    }, [token, refreshTasks]);

    const removeTask = async (id) => {
      console.log("Удаляем задачу с id:", id);
      if (!id) {
        console.error("removeTask called with undefined id");
        return;
      }

      try {
        const result = await deleteKanbanTask(id);
        console.log("Результат удаления с сервера:", result);
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

      await updateKanbanTask(id, updatesApi);

      const refreshedTasks = await refreshTasks();
      return refreshedTasks.find((t) => String(t.id) === String(id)) || null;
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

    const tempId = `temp-${Date.now()}`;
    const optimisticTask = {
      id: tempId,
      title: payload.title,
      description: payload.description,
      statusApi: payload.status,
      statusUi: STATUS_API_TO_UI[payload.status] || STATUS_UI.NO_STATUS,
      topicApi: payload.topic,
      categoryUi: normalizeCategory(payload.topic),
      date: new Date(payload.date),
    };
    setTasks((prev) => [...prev, optimisticTask]);

    try {
      await createKanbanTask(payload);
      const refreshedTasks = await refreshTasks();
      return refreshedTasks[refreshedTasks.length - 1] || null;
    } catch (e) {
      setTasks((prev) => prev.filter((t) => t.id !== tempId));
      throw e;
    }
  };

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
