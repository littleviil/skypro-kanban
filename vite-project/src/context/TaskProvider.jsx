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

const CATEGORY_UI_TO_API = {
  "Web Design": "web design",
  "Copywriting": "copywriting",
  "Research": "research",
};

const normalizeCategory = (topic) => {
  if (!topic) return "Web Design";
  const lower = topic.toLowerCase();
  switch(lower) {
    case "web design": return "Web Design";
    case "copywriting": return "Copywriting";
    case "research": return "Research";
    default: return "Web Design";
  }
};


const statusUiToApi = (uiStatus) => STATUS_UI_TO_API[uiStatus] ?? "no-status";
const categoryUiToApi = (uiCategory) => CATEGORY_UI_TO_API[uiCategory] ?? "web design";

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
    id: task.id ?? task._id,
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
  if (!id) {
    console.error("removeTask called with undefined id");
    return;
  }
  await deleteKanbanTask(id);
  setTasks((prev) => prev.filter((t) => String(t.id) !== String(id)));
};

  const editTask = async (id, updatesUi) => {
    const updatesApi = {
      title: updatesUi.title?.trim() ?? "",
      description: updatesUi.description ?? "",
      status: statusUiToApi(updatesUi.status),
      topic: categoryUiToApi(updatesUi.category),
      date: updatesUi.date ? new Date(updatesUi.date).toISOString() : undefined,
    };

    await updateKanbanTask(id, updatesApi);

    const updatedTask = normalizeTaskFromApi({
      ...updatesApi,
      id,
    });

    setTasks((prev) =>
      prev.map((t) => (String(t.id ?? t._id) === String(id) ? updatedTask : t))
    );

    return updatedTask;
  };

  const addTask = async (newTaskUi) => {
    const payload = {
    title: newTaskUi.title.trim(),
    description: newTaskUi.description,
    status: statusUiToApi(newTaskUi.status),
    topic: categoryUiToApi(newTaskUi.category),
    date: newTaskUi.date ? new Date(newTaskUi.date).toISOString() : undefined,
  };

    const createdTask = await createKanbanTask(payload);

    const normalized = normalizeTaskFromApi({
    ...createdTask,
    title: createdTask.title || payload.title,
    topic: createdTask.topic ?? payload.topic, 
  });

  setTasks((prev) => [...prev, normalized]);
  return normalized;
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
