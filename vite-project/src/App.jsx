import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Wrapper } from './App.styled';
import AppRoutes from './AppRoutes';
import GlobalStyles from './GlobalStyles';
import GlobalAuthStyles from './auth.styled';
import './App.css';
import { Header } from './components/Header/Header';
import PopNewCard from './components/popus/PopNewCard/PopNewCard';
import { fetchKanbanTasks } from './services/api';

const statusesList = [
  'Без статуса',
  'Нужно сделать',
  'В работе',
  'Тестирование',
  'Готово',
];

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [isPopNewCardOpen, setIsPopNewCardOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Web Design',
    status: 'Без статуса',
    date: new Date().toLocaleDateString('ru-RU'),
  });
  const [tasks, setTasks] = useState([]);

  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const token = localStorage.getItem('token');

  function capitalizeFirstLetter(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const refreshTasks = useCallback(async () => {
    if (!token) return [];
    try {
      const data = await fetchKanbanTasks(token);
      console.log('Данные с сервера:', data);
      const tasksArray = Array.isArray(data) ? data : data.tasks || [];
      const normalized = tasksArray.map(task => {
        const normalizedStatus = capitalizeFirstLetter(task.status || 'Без статуса');
        // Временная логика для определения категории
        let category;
        if (task.category) {
          category = capitalizeFirstLetter(task.category);
        } else {
          const titleLower = task.title ? task.title.toLowerCase() : '';
          if (titleLower.includes('дизайн') || titleLower.includes('design')) {
            category = 'Web Design';
          } else if (titleLower.includes('копирайт') || titleLower.includes('writing')) {
            category = 'Copywriting';
          } else if (titleLower.includes('исслед') || titleLower.includes('research')) {
            category = 'Research';
          } else {
            category = 'Без категории';
          }
        }
        return {
          ...task,
          category,
          status: statusesList.includes(normalizedStatus)
            ? normalizedStatus
            : 'Без статуса',
        };
      });
      console.log('Normalized tasks in App:', normalized);
      console.log('Unique categories in App:', [...new Set(normalized.map(task => task.category))]);
      setTasks(normalized);
      return normalized;
    } catch (error) {
      console.error('Ошибка при загрузке задач:', error);
      return [];
    }
  }, [token]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setIsAuth(!!storedToken);
    setAuthChecked(true);
    if (storedToken) {
      refreshTasks();
    }
  }, [refreshTasks]);

  if (!authChecked) return null;

  return (
    <>
      <GlobalStyles />
      <GlobalAuthStyles />

      {!isAuthPage && isAuth && (
        <Header
          onNewCardClick={() => {
            setFormData({
              title: '',
              description: '',
              category: 'Web Design',
              status: 'Без статуса',
              date: new Date().toLocaleDateString('ru-RU'),
            });
            setIsPopNewCardOpen(true);
          }}
          setIsAuth={setIsAuth}
        />
      )}

      {isPopNewCardOpen && (
        <PopNewCard
          formData={formData}
          setFormData={setFormData}
          onClose={() => setIsPopNewCardOpen(false)}
          refreshTasks={refreshTasks}
        />
      )}

      <Wrapper>
        <AppRoutes
          isAuth={isAuth}
          setIsAuth={setIsAuth}
          tasks={tasks}
          setTasks={setTasks}
          refreshTasks={refreshTasks}
        />
      </Wrapper>
    </>
  );
}

export default App;