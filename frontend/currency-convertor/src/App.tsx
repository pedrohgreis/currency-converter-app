import { Route, Routes } from 'react-router-dom'
import { Layouts } from './components/Layouts'
import { Home } from './components/Home'

function App() {
  
  return (
    <>
      <Routes>
          <Route path = '/' element = {<Layouts> 
            <Home />
          </Layouts>}/>
      </Routes>
    </>
  )
}

export default App
