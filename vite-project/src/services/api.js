const BASE_URL = "https://wedev-api.sky.pro/api";

export async function fetchKanbanTasks(token) {
  if (!token) throw new Error("Нет токена. Пользователь не авторизован.");
  try {
    const response = await fetch(`${BASE_URL}/kanban`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || "Ошибка при загрузке задач");
    }

    return data.tasks || [];
  } catch (error) {
    console.error("Ошибка при получении задач:", error);
    throw error;
  }
}

export async function fetchTaskById(taskId, token) {
  if (!token) throw new Error("Нет токена. Пользователь не авторизован.");
  try {
    const response = await fetch(`${BASE_URL}/kanban/${taskId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || "Ошибка при получении задачи");
    }

    return data.task;
  } catch (error) {
    console.error("Ошибка при получении задачи:", error);
    throw error;
  }
}

export async function createKanbanTask(taskData, token) {
  if (!token) throw new Error("Нет токена. Пользователь не авторизован.");

  try {
    const response = await fetch(`${BASE_URL}/kanban`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || "Ошибка при создании задачи");
    }

    return data.task;
  } catch (error) {
    console.error("Ошибка при создании задачи:", error);
    throw error;
  }
}

export async function updateKanbanTask(taskId, updates, token) {
  if (!token) throw new Error("Нет токена. Пользователь не авторизован.");

  try {
    const response = await fetch(`${BASE_URL}/kanban/${taskId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || "Ошибка при обновлении задачи");
    }

    return data.task;
  } catch (error) {
    console.error("Ошибка при обновлении задачи:", error);
    throw error;
  }
}

export async function deleteKanbanTask(taskId, token) {
  if (!token) throw new Error("Нет токена. Пользователь не авторизован.");

  try {
    const response = await fetch(`${BASE_URL}/kanban/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || "Ошибка при удалении задачи");
    }

    return true;
  } catch (error) {
    console.error("Ошибка при удалении задачи:", error);
    throw error;
  }
}