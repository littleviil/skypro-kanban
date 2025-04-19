import { useState, useEffect } from 'react';
import { Wrapper, Loading, Container } from './App.styled';
import { PopExit } from './components/popus/PopExit/PopExit';
import { PopNewCard } from './components/popus/PopNewCard/PopNewCard';
import { PopBrowse } from './components/popus/PopBrowse/PopBrowse';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import GlobalStyles from './GlobalStyles';
import './App.css'

function App() {
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
    <GlobalStyles />
    <Wrapper>
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
      <Header
        onNewCardClick={() => setIsPopNewCardOpen(true)}
        onExitClick={() => setIsPopExitOpen(true)}
      />
      {loading ? (
        <Loading>Данные загружаются...</Loading>
      ) : (
        <Container>
          <Main onBrowseClick={openPopBrowse} />
        </Container>
      )}
    </Wrapper>
    </>
  );
}

export default App;