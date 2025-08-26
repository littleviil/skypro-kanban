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

export const CATEGORY_UI = ["Web Design", "Copywriting", "Research", "Без категории"];

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

const CATEGORY_API_TO_UI = {
  "web design": "Web Design",
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

const statusUiToApi = (uiStatus) => STATUS_UI_TO_API[uiStatus] ?? "no-status";
const categoryUiToApi = (uiCategory) => CATEGORY_UI_TO_API[uiCategory] ?? "";

const normalizeTaskFromApi = (task) => {
  const statusApi = (task.status || "no-status").toLowerCase();
  const statusUi = STATUS_API_TO_UI[statusApi] || STATUS_UI.NO_STATUS;
  const categoryUi = CATEGORY_API_TO_UI[(task.topic || "").toLowerCase()] || "Без категории";

  return {
    ...task,
    id: task.id ?? task._id,
    statusApi,
    statusUi,
    topicApi: task.topic || "",
    categoryUi,
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
      setTasks([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) refreshTasks();
  }, [token, refreshTasks]);

  const removeTask = async (id) => {
    await deleteKanbanTask(id);
    setTasks((prev) => prev.filter((t) => String(t.id) !== String(id)));
  };

  const editTask = async (id, updatesUi) => {
  // Для API
  const updatesApi = {
    ...updatesUi,
    status: statusUiToApi(updatesUi.status),
    topic: categoryUiToApi(updatesUi.category ?? updatesUi.topic), // API формат
  };

  if (updatesUi.date) updatesApi.date = new Date(updatesUi.date).toISOString();

  // Отправляем на сервер
  await updateKanbanTask(id, updatesApi);

  // Для UI используем нормализацию API
  const originalTask = tasks.find((t) => String(t.id ?? t._id) === String(id));
  const updatedTask = normalizeTaskFromApi({
    ...originalTask,
    ...updatesApi, // передаем как пришло из API
  });

  setTasks((prev) =>
    prev.map((t) => (String(t.id ?? t._id) === String(id) ? updatedTask : t))
  );

  return updatedTask;
};

  const addTask = async (newTaskUi) => {
    const payload = {
      title: (newTaskUi.title || "").trim(),
      description: newTaskUi.description || "",
      status: statusUiToApi(newTaskUi.status ?? STATUS_UI.NO_STATUS),
      topic: categoryUiToApi(newTaskUi.category ?? "Без категории"),
      date: newTaskUi.date ? new Date(newTaskUi.date).toISOString() : undefined,
    };

    const createdTask = await createKanbanTask(payload);

    const normalizedTask = normalizeTaskFromApi({
      ...createdTask,
      status: createdTask.status || payload.status,
      topic: createdTask.topic || payload.topic,
    });

    setTasks((prev) => [...prev, normalizedTask]);
    return normalizedTask;
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
