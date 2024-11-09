import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Devocionais from './pages/Devocionais';
import Biblia from './pages/Biblia';
import { incrementPageView } from './firebaseConfig';
import './App.css';

function App() {
  const [pageViews, setPageViews] = useState(null);
  const [isCounted, setIsCounted] = useState(false);

  useEffect(() => {
    if (!isCounted) {
      const updatePageViews = async () => {
        const views = await incrementPageView();
        setPageViews(views);
      };
      updatePageViews();
      setIsCounted(true);
    }
  }, [isCounted]);

  return (
    <Router>
      <div className="app-container">
        {/* Exibe o contador de acessos fora da estrutura de layout principal */}
        {pageViews !== null ? (
          <p className="page-views-counter">Contador de acessos: {pageViews}</p>
        ) : (
          <p className="page-views-counter">Carregando contador de acessos...</p>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/devocionais" element={<Devocionais />} />
          <Route path="/biblia" element={<Biblia />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
