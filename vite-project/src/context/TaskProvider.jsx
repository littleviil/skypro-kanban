import React, { useState, useEffect, useContext } from "react";
import { TaskContext } from "./TaskContext";
import { AuthContext } from "./AuthContext";
import { fetchKanbanTasks, createKanbanTask, updateKanbanTask, deleteKanbanTask } from "../services/api";
import { taskCategories, statusThemes } from "../tasks";

export const TaskProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    if (!user?.token) return;
    setLoading(true);
    try {
      const fetched = await fetchKanbanTasks(user.token);
      setTasks(fetched);
      setError(null);
    } catch (err) {
      setError(err.message || "Ошибка загрузки задач");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user?.token]);

  const addTask = async (taskData) => {
    try {
      const payload = {
        ...taskData,
        topic: taskData.topic || "Web Design",
      };
      const created = await createKanbanTask(payload, user.token);
      setTasks(prev => [...prev, created]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateTask = async (id, updates) => {
    if (!user?.token) return;
    try {
      await updateKanbanTask(id, updates, user.token);
      await fetchTasks(); // обновляем после редактирования
    } catch (err) {
      setError(err.message || "Ошибка обновления задачи");
    }
  };

  const removeTask = async (id) => {
    if (!user?.token) return;
    try {
      await deleteKanbanTask(id, user.token);
      await fetchTasks(); // обновляем после удаления
    } catch (err) {
      setError(err.message || "Ошибка удаления задачи");
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks,
        addTask,
        updateTask,
        removeTask,
        taskCategories,
        statusThemes,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
