
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'

function App() {

  return (
    <BrowserRouter>
   
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>

      </main>

    </BrowserRouter>

  )
}

export default App
