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
    if (!token) return;
    try {
      const data = await fetchKanbanTasks(token);

      const normalized = data.map(task => {
        const normalizedStatus = capitalizeFirstLetter(task.status || 'Без статуса');
        return {
          ...task,
          category: task.category
            ? capitalizeFirstLetter(task.category)
            : task.topic
              ? capitalizeFirstLetter(task.topic)
              : 'Без категории',
          status: statusesList.includes(normalizedStatus)
            ? normalizedStatus
            : 'Без статуса',
        };
      });

      setTasks(normalized);
    } catch (error) {
      console.error('Ошибка при загрузке задач:', error);
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
          refreshTasks={refreshTasks}
        />
      </Wrapper>
    </>
  );
}

export default App;
