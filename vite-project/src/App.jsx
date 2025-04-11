import { useState, useEffect } from 'react';
import { Wrapper, Loading, Container } from './App.styled';
import { PopExit } from './compoents/popus/PopExit/PopExit';
import { PopNewCard } from './compoents/popus/PopNewCard/PopNewCard';
import { PopBrowse } from './compoents/popus/PopBrowse/PopBrowse';
import { Header } from './compoents/Header/Header';
import { Main } from './compoents/Main/Main';

function App() {
  const [loading, setLoading] = useState(true);
  const [isPopExitOpen, setIsPopExitOpen] = useState(false);
  const [isPopNewCardOpen, setIsPopNewCardOpen] = useState(false);
  const [isPopBrowseOpen, setIsPopBrowseOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <Wrapper>
      {isPopExitOpen && <PopExit onClose={() => setIsPopExitOpen(false)} />}
      {isPopNewCardOpen && (
        <PopNewCard onClose={() => setIsPopNewCardOpen(false)} />
      )}
      {isPopBrowseOpen && (
        <PopBrowse onClose={() => setIsPopBrowseOpen(false)} />
      )}
      <Header onNewCardClick={() => setIsPopNewCardOpen(true)} />
      {loading ? (
        <Loading>Данные загружаются...</Loading>
      ) : (
        <Container>
          <Main />
        </Container>
      )}
    </Wrapper>
  );
}

export default App;