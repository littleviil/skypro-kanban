import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import PopExit from '../components/popus/PopExit/PopExit';
import PopBrowse from '../components/popus/PopBrowse/PopBrowse';
import Main from '../components/Main/Main';
import { Container, Loading } from '../App.styled';
import { taskCategories } from '../tasks';

function MainPage({ setIsAuth, tasks, setTasks, refreshTasks }) {
  const [loading, setLoading] = useState(true);
  const [isPopExitOpen, setIsPopExitOpen] = useState(false);
  const [isPopBrowseOpen, setIsPopBrowseOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      (async () => {
        try {
          setLoading(true);
          const newTasks = await refreshTasks();
          const normalizedTasks = Array.isArray(newTasks) ? newTasks : [];
          setTasks(normalizedTasks);
          setError('');
        } catch (err) {
          console.error('Error loading tasks:', err);
          setError('Не удалось загрузить задачи');
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [token, navigate, refreshTasks, setTasks]);

  const openPopBrowse = (task) => {
    setSelectedTask(task);
    setIsPopBrowseOpen(true);
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
      {isPopBrowseOpen && selectedTask && (
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