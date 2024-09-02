import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Devocionais from './pages/Devocionais';
import Biblia from './pages/Biblia';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/devocionais" element={<Devocionais />} />
        <Route path="/biblia" element={<Biblia />} />
      </Routes>
    </Router>
  );
}

export default App;
