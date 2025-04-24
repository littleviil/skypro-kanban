import { useState, useEffect } from 'react';
import { PopExit } from '../components/popus/PopExit/PopExit';
import { PopNewCard } from '../components/popus/PopNewCard/PopNewCard';
import { PopBrowse } from '../components/popus/PopBrowse/PopBrowse';
import { Header } from '../components/Header/Header';
import { Main } from '../components/Main/Main';
import { Container, Loading } from '../App.styled';

function MainPage({ setIsAuth }) {
  const [loading, setLoading] = useState(true);
  const [isPopExitOpen, setIsPopExitOpen] = useState(false);
  const [isPopNewCardOpen, setIsPopNewCardOpen] = useState(false);
  const [isPopBrowseOpen, setIsPopBrowseOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const openPopBrowse = (task) => {
    setSelectedTask(task);
    setIsPopBrowseOpen(true);
  };

  return (
    <>
      {isPopExitOpen && <PopExit onClose={() => setIsPopExitOpen(false)} />}
      {isPopNewCardOpen && (
        <PopNewCard onClose={() => setIsPopNewCardOpen(false)} />
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
          <Header
            onNewCardClick={() => setIsPopNewCardOpen(true)}
            setIsAuth={setIsAuth}
          />
          <Main onBrowseClick={openPopBrowse} />
        </Container>
      )}
    </>
  );
}

export default MainPage;