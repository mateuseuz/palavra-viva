import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Devocionais.css';

const Devocionais = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="content-container">
        <header className="devocionais-header">
          <button className="nav-button" onClick={() => navigate('/')}>
            Início
          </button>
          <button className="nav-button" onClick={() => navigate('/biblia')}>
            Bíblia
          </button>
        </header>
        <main className="devocionais-main">
          <h1 className="devocionais-title">Devocionais</h1>
          <div className="devocional-content">
            <button className="nav-arrow left-arrow">{'<'}</button>
            <p>Devocional do dia - Aqui será mostrado o conteúdo do devocional de hoje.</p>
            <button className="nav-arrow right-arrow">{'>'}</button>
          </div>
        </main>
      </div>
      <footer className="footer">
        <p>Centro Universitário Filadélfia &copy; 2024. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Devocionais;
