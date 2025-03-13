import { useState, useEffect } from 'react';
import { PopExit } from './compoents/popus/PopExit/PopExit'
import { PopNewCard } from './compoents/popus/PopNewCard/PopNewCard'
import { PopBrowse } from './compoents/popus/PopBrowse/PopBrowse'
import { Header } from './compoents/Header/Header'
import { Main } from './compoents/Main/Main'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      <div className="wrapper">	
		<PopExit />
		<PopNewCard />
		<PopBrowse />
		<Header />
		{loading ? (
        <div className="loading">Данные загружаются...</div>
      ) : (
        <Main />
      )}
    </div>
    <script src="js/script.js"></script>
    </>
  )
}

export default App
