import { useState, useEffect } from 'react';
import { PopExit } from './compoents/popus/PopExit/PopExit';
import { PopNewCard } from './compoents/popus/PopNewCard/PopNewCard';
import { PopBrowse } from './compoents/popus/PopBrowse/PopBrowse';
import { PopUser } from './compoents/popus/PopUser/PopUser';
import { Header } from './compoents/Header/Header';
import { Main } from './compoents/Main/Main';
import './App.css';

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
    <div className="wrapper">
      {isPopExitOpen && <PopExit onClose={() => setIsPopExitOpen(false)} />}
      {isPopNewCardOpen && <PopNewCard onClose={() => setIsPopNewCardOpen(false)} />}
      {isPopBrowseOpen && <PopBrowse onClose={() => setIsPopBrowseOpen(false)} />}
      <Header onNewCardClick={() => setIsPopNewCardOpen(true)} />
      {loading ? (
        <div className="loading">Данные загружаются...</div>
      ) : (
        <Main />
      )}
    </div>
  );
}

export default App;