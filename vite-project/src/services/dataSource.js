import { fetchKanbanTasks } from './api';

export const getTasks = async (componentName, token) => {
  if (!token) {
    return [];
  }
  try {
    const data = await fetchKanbanTasks({ token });
    return data;
  } catch (error) {
    console.error(`Ошибка загрузки задач для ${componentName}:`, error.message);
    return [];
  }
};