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
    setError(null);
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
        return created;
      } else {
        const fakeTask = {
          ...taskData,
          _id: crypto.randomUUID(),
        };
        setTasks((prev) => [...prev, fakeTask]);
        return fakeTask;
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateTask = async (id, updates) => {
    if (!user?.token) return;
    const snapshot = [...tasks];

    setTasks((prev) =>
      prev.map((task) =>
        task._id === id ? { ...task, ...updates } : task
      )
    );

    try {
      await updateKanbanTask(id, updates, user.token);
    } catch (err) {
      setTasks(snapshot);
      console.error("Ошибка обновления задачи:", err.message);
    }
  };

  const removeTask = async (id) => {
    if (!user?.token) return;
    setTasks((prev) => prev.filter((task) => task._id !== id));
    try {
      await deleteKanbanTask(id, user.token);
    } catch (err) {
      console.error("Ошибка удаления задачи:", err.message);
    }
  };

  const clearTasks = () => {
    setTasks([]);
    setError(null);
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
        clearTasks,
        taskCategories,
        statusThemes,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
