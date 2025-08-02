const API_URL = 'https://wedev-api.sky.pro/api/kanban';
// const KANBAN_API_URL = `${API_URL}/kanban`;

export async function createKanbanTask(taskData) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;

  if (!token) throw new Error("Нет токена. Пользователь не авторизован.");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Ошибка при создании задачи:", result);
      throw new Error(result?.error || "Ошибка при создании задачи");
    }

    return result;
  } catch (error) {
    console.error("Ошибка при создании задачи:", error);
    throw error;
  }
}


export async function fetchKanbanTasks(token) {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка при загрузке задач');
    }

    const data = await response.json();
    return data.tasks || [];
  } catch (error) {
    console.error('Ошибка при получении задач:', error);
    throw error;
  }
}