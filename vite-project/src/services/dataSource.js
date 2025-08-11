import { fetchKanbanTasks } from './api';

export const getTasks = async (componentName) => {
  const token = localStorage.getItem('token'); 
  if (!token) {
    console.warn(`[${componentName}] Токен отсутствует — возврат пустого списка`);
    return [];
  }

  try {
    const data = await fetchKanbanTasks(token);
    return data;
  } catch (error) {
    console.error(`Ошибка загрузки задач для ${componentName}:`, error.message);
    return [];
  }
};
