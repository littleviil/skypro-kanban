import axios from "axios";

const BASE_URL = "https://wedev-api.sky.pro/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export async function fetchKanbanTasks(token) {
  if (!token) throw new Error("Нет токена. Пользователь не авторизован.");
  try {
    const { data } = await api.get("/kanban", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.tasks || [];
  } catch (error) {
    const msg = error.response?.data?.error || error.message || "Ошибка при загрузке задач";
    throw new Error(msg);
  }
}

export async function createKanbanTask(taskData, token) {
  if (!token) throw new Error("Нет токена. Пользователь не авторизован.");
  try {
    const { data } = await api.post("/kanban", JSON.stringify(taskData), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "",
      },
    });
    return data || null;
  } catch (error) {
    const msg = error.response?.data?.error || error.message || "Ошибка при создании задачи";
    throw new Error(msg);
  }
}

export async function updateKanbanTask(taskId, updates, token) {
  if (!token) throw new Error("Нет токена. Пользователь не авторизован.");
  try {
    const { data } = await api.put(`/kanban/${taskId}`, JSON.stringify(updates), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "",
      },
    });
    return data || null;
  } catch (error) {
    const msg = error.response?.data?.error || error.message || "Ошибка при обновлении задачи";
    throw new Error(msg);
  }
}

export async function deleteKanbanTask(taskId, token) {
  if (!token) throw new Error("Нет токена. Пользователь не авторизован.");
  try {
    await api.delete(`/kanban/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch (error) {
    const msg = error.response?.data?.error || error.message || "Ошибка при удалении задачи";
    throw new Error(msg);
  }
}
