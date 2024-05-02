import { useState } from 'react'
import Header from './pages/Header'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className=' p-5'>
   <Header />
   <Outlet />
   </div>
  )
}

export default App
