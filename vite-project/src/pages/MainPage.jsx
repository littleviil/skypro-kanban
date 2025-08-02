import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import PopExit from '../components/popus/PopExit/PopExit';
import PopBrowse from '../components/popus/PopBrowse/PopBrowse';
import Main from '../components/Main/Main';
import { Container, Loading } from '../App.styled';
import { getTasks } from '../services/dataSource';

function MainPage({ setIsAuth }) {
  const [loading, setLoading] = useState(true);
  const [isPopExitOpen, setIsPopExitOpen] = useState(false);
  const [isPopBrowseOpen, setIsPopBrowseOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const getTasksData = useCallback(async () => {
    if (!token) {
      setError('Пользователь не авторизован. Токен отсутствует.');
      setLoading(false);
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      const data = await getTasks('MainPage', token);
      setTasks(data);
      setError('');
    } catch (err) {
      console.error('Ошибка загрузки задач:', err.message);
      setError('Не удалось загрузить задачи');
    } finally {
      setLoading(false);
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      getTasksData();
    }
  }, [token, getTasksData, navigate]);

  const openPopBrowse = (task) => {
    navigate(`/card/${task.id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    setIsAuth(false);
    navigate('/login');
  };

  return (
    <>
      {isPopExitOpen && (
        <PopExit onClose={() => setIsPopExitOpen(false)} onLogout={handleLogout} />
      )}
      {isPopBrowseOpen && (
        <PopBrowse
          task={selectedTask}
          onClose={() => {
            setIsPopBrowseOpen(false);
            setSelectedTask(null);
          }}
        />
      )}
      {loading ? (
        <Loading>Данные загружаются...</Loading>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Container>
          <Main tasks={tasks} onBrowseClick={openPopBrowse} />
          <Outlet />
        </Container>
      )}
    </>
  );
}

export default MainPage;
