import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Devocionais.css';
import devocionaisData from './devocionais.json';

const Devocionais = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [devocionalAtual, setDevocionalAtual] = useState(null);

  useEffect(() => {
    // Carrega o primeiro devocional ou um aleatório
    const devocionalAleatorio = devocionaisData[Math.floor(Math.random() * devocionaisData.length)];
    setDevocionalAtual(devocionalAleatorio);
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="page-container">
      <div className="content-container">
        <header className="devocionais-header">
          <button className="nav-button" onClick={() => navigate('/')}>
            Início
          </button>
          <h1 className="devocionais-title">Palavra Viva</h1>
          <button className="nav-button" onClick={() => navigate('/biblia')}>
            Bíblia
          </button>
        </header>
        <main className="devocionais-main">
          <p className="devocional-instruction">Selecione um devocional.<br />Utilize as setas para navegar entre as datas.</p>
          <div className="devocional-content">
            <button className="nav-arrow left-arrow" onClick={() => setDevocionalAtual(devocionaisData[(devocionaisData.indexOf(devocionalAtual) - 1 + devocionaisData.length) % devocionaisData.length])}>
              <span className="arrow-icon">{'<'}</span>
            </button>
            {devocionalAtual && (
              <div className="devocional-box" onClick={openModal}>
                <h2>{devocionalAtual.title}</h2>
                <p>{devocionalAtual.verse}</p>
              </div>
            )}
            <button className="nav-arrow right-arrow" onClick={() => setDevocionalAtual(devocionaisData[(devocionaisData.indexOf(devocionalAtual) + 1) % devocionaisData.length])}>
              <span className="arrow-icon">{'>'}</span>
            </button>
          </div>
        </main>
      </div>
      <footer className="footer">
        <p>Centro Universitário Filadélfia &copy; 2024. Todos os direitos reservados.</p>
      </footer>

      {isModalOpen && devocionalAtual && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>{devocionalAtual.title} - {devocionalAtual.verse}</h2>
            {devocionalAtual.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <button className="close-button" onClick={closeModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Devocionais;
