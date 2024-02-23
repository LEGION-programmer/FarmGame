import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import GamePage from './pages/GamePage'
import LobbyPage from './pages/LobbyPage'
import MainPage from './pages/MainPage'
import NotFound from './pages/NotFound'

function App() {
  document.body.style.backgroundColor = '#9FFF93'
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/lobby" element={<LobbyPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
