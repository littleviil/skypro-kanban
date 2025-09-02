const API_URL = "https://wedev-api.sky.pro/api/kanban";

export async function fetchKanbanTasks(token) {
  if (!token) throw new Error("Нет токена. Пользователь не авторизован.");
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Ошибка при загрузке задач");
    }

    const data = await response.json();
    return data.tasks || [];
  } catch (error) {
    console.error("Ошибка при получении задач:", error);
    throw error;
  }
}

export async function createKanbanTask(taskData) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Нет токена. Пользователь не авторизован.");

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(taskData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.error || "Ошибка при создании задачи");
  }

  if (result.task) return result.task;
  if (result.tasks) return Array.isArray(result.tasks) ? result.tasks[0] : result.tasks;

  return result;
}


export async function updateKanbanTask(taskId, updates) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Нет токена. Пользователь не авторизован.");

  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(updates),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.error || "Ошибка при обновлении задачи");
    }

    return result;
  } catch (error) {
    console.error("Ошибка при обновлении задачи:", error);
    throw error;
  }
}

export async function deleteKanbanTask(taskId) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Нет токена. Пользователь не авторизован.");

  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      throw new Error(result?.error || "Ошибка при удалении задачи");
    }

    return true;
  } catch (error) {
    console.error("Ошибка при удалении задачи:", error);
    throw error;
  }
}