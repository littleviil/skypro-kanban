// import { useState } from 'react'
import { PopExit } from './compoents/popus/PopExit/PopExit'
import { PopNewCard } from './compoents/popus/PopNewCard/PopNewCard'
import { PopBrowse } from './compoents/popus/PopBrowse/PopBrowse'
import { Header } from './compoents/Header/Header'
import { Main } from './compoents/Main/Main'
import './App.css'

function App() {
//   const [count, setCount] = useState(0)

  return (
    <>
      <div className="wrapper">	
		<PopExit />
		<PopNewCard />
		<PopBrowse />
		<Header />
		<Main />	
      </div>
    <script src="js/script.js"></script>
    </>
  )
}

export default App
