import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Devocionais from './pages/Devocionais';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/devocionais" element={<Devocionais />} />
        <Route path="/biblia" element={<div>Página da Bíblia em construção</div>} />
      </Routes>
    </Router>
  );
}

export default App;
