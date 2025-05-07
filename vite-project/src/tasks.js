export const tasks = [
  { id: 1, title: "Название задачи", category: "Web Design", date: "30.10.23", status: "Без статуса" },
  { id: 2, title: "Название задачи", category: "Research", date: "30.10.23", status: "Без статуса" },
  { id: 3, title: "Название задачи", category: "Web Design", date: "30.10.23", status: "Без статуса" },
  { id: 4, title: "Название задачи", category: "Copywriting", date: "30.10.23", status: "Без статуса" },
  { id: 5, title: "Название задачи", category: "Web Design", date: "30.10.23", status: "Нужно сделать" },
  { id: 6, title: "Название задачи", category: "Research", date: "30.10.23", status: "В работе" },
  { id: 7, title: "Название задачи", category: "Copywriting", date: "30.10.23", status: "В работе" },
  { id: 8, title: "Название задачи", category: "Web Design", date: "30.10.23", status: "Тестирование" },
  { id: 9, title: "Название задачи", category: "Research", date: "30.10.23", status: "Тестирование" },
  { id: 10, title: "Название задачи", category: "Research", date: "30.10.23", status: "Готово" },
];

export const taskCategories = {
  "Web Design": "orange",
  "Research": "green", 
  "Copywriting": "purple",
};

export const taskStatuses = [...new Set(tasks.map(task => task.status))];

export const statusThemes = {
  'Без статуса': 'gray',
  'Нужно сделать': 'orange',
  'В работе': 'purple',
  'Тестирование': 'green',
  'Готово': 'green',
};