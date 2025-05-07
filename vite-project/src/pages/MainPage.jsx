import { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import PopExit from '../components/popus/PopExit/PopExit';
import PopBrowse from '../components/popus/PopBrowse/PopBrowse';
import Main from '../components/Main/Main';
import { Container, Loading } from '../App.styled';

function MainPage({ setIsAuth }) {
  const [loading, setLoading] = useState(true);
  const [isPopExitOpen, setIsPopExitOpen] = useState(false);
  const [isPopBrowseOpen, setIsPopBrowseOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const openPopBrowse = (task) => {
    navigate(`/card/${task.id}`);
  };

  const handleLogout = () => {
    setIsAuth(false);
    navigate('/login');
  };

  return (
    <>
      {isPopExitOpen && (
        <PopExit
          onClose={() => setIsPopExitOpen(false)}
          onLogout={handleLogout}
        />
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
      ) : (
        <Container>
          <Main onBrowseClick={openPopBrowse} />
          <Outlet />
        </Container>
      )}
    </>
  );
}

export default MainPage;