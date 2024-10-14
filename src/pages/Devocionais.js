import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Devocionais.css';
import devocionaisData from './devocionais.json';

const Devocionais = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [devocionalAtualIndex, setDevocionalAtualIndex] = useState(0);
  const [devocionalAtual, setDevocionalAtual] = useState(null);
  const [devocionaisComDatas, setDevocionaisComDatas] = useState([]);
  const totalDevocionaisExibir = 7;

  useEffect(() => {
    const today = new Date();
    const devocionaisAtualizados = devocionaisData.map((devocional, index) => {
      const dataDevocional = new Date(today);
      dataDevocional.setDate(today.getDate() - index);
      return {
        ...devocional,
        date: dataDevocional.toLocaleDateString('pt-BR')
      };
    });

    const devocionaisRecentes = devocionaisAtualizados.slice(0, totalDevocionaisExibir);
    setDevocionaisComDatas(devocionaisRecentes);
    setDevocionalAtualIndex(0);
    setDevocionalAtual(devocionaisRecentes[0]);
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handlePrevious = () => {
    if (devocionalAtualIndex < devocionaisComDatas.length - 1) {
      const newIndex = devocionalAtualIndex + 1;
      setDevocionalAtualIndex(newIndex);
      setDevocionalAtual(devocionaisComDatas[newIndex]);
    }
  };

  const handleNext = () => {
    if (devocionalAtualIndex > 0) {
      const newIndex = devocionalAtualIndex - 1;
      setDevocionalAtualIndex(newIndex);
      setDevocionalAtual(devocionaisComDatas[newIndex]);
    }
  };

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
            <button
              className={`nav-arrow left-arrow ${devocionalAtualIndex === devocionaisComDatas.length - 1 ? 'disabled' : ''}`}
              onClick={handlePrevious}
              disabled={devocionalAtualIndex === devocionaisComDatas.length - 1}
            >
              <span className="arrow-icon">{'<'}</span>
            </button>
            {devocionalAtual && (
              <div className="devocional-box" onClick={openModal}>
                <h2>{devocionalAtual.title}</h2>
                <p>{devocionalAtual.verse}</p>
                <p>{devocionalAtual.date}</p>
              </div>
            )}
            <button
              className={`nav-arrow right-arrow ${devocionalAtualIndex === 0 ? 'disabled' : ''}`}
              onClick={handleNext}
              disabled={devocionalAtualIndex === 0}
            >
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