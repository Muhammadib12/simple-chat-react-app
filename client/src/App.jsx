import { useState } from 'react'

import { Route, Routes } from 'react-router-dom'
import Chat from './components/Chat/Chat.jsx';
import Join from './components/Join/Join.jsx';
function App() {
  const [count, setCount] = useState(0)

  return (
      <Routes>
        <Route path='/' element={<Join/>} />
        <Route path='/chat' element={<Chat/>} />
      </Routes>
  )
}

export default App
