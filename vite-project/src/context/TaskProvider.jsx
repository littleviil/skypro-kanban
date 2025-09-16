import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { TaskContext } from "./TaskContext";
import {
  fetchKanbanTasks,
  createKanbanTask,
  updateKanbanTask,
  deleteKanbanTask,
} from "../services/api";
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
      setTasks(fetched || []);
      setError(null);
    } catch (err) {
      setError(err.message || "Ошибка загрузки задач");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    if (!user?.token) return;
    try {
      const created = await createKanbanTask(taskData, user.token);

      if (created && created._id) {
        setTasks((prev) => [...prev, created]);
      } else {
        const fakeTask = {
          ...taskData,
          _id: crypto.randomUUID(),
        };
        setTasks((prev) => [...prev, fakeTask]);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateTask = async (id, updates) => {
    if (!user?.token) return;
    try {
      await updateKanbanTask(id, updates, user.token);

      setTasks((prev) =>
        prev.map((task) =>
          task._id === id
            ? { ...task, ...updates }
            : task
        )
      );
    } catch (err) {
      setError(err.message || "Ошибка обновления задачи");
      throw err;
    }
  };

  const removeTask = async (id) => {
    if (!user?.token) return;
    try {
      await deleteKanbanTask(id, user.token);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      setError(err.message || "Ошибка удаления задачи");
      throw err;
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
