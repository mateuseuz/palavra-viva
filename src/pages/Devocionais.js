import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Devocionais.css';
import devocionaisData from './devocionais.json';

const Devocionais = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [devocionalAtualIndex, setDevocionalAtualIndex] = useState(6);
  const [devocionaisComDatas, setDevocionaisComDatas] = useState([]);

  useEffect(() => {
    const today = new Date();
    const randomDevocionais = [...devocionaisData].sort(() => Math.random() - 0.5);
    const devocionaisAtualizados = randomDevocionais.slice(0, 7).map((devocional, index) => {
      const dataDevocional = new Date(today);
      dataDevocional.setDate(today.getDate() - index);
      return {
        ...devocional,
        date: dataDevocional.toLocaleDateString('pt-BR')
      };
    }).reverse();
    
    setDevocionaisComDatas(devocionaisAtualizados);
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handlePrevious = () => {
    if (devocionalAtualIndex > 0) {
      setDevocionalAtualIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (devocionalAtualIndex < devocionaisComDatas.length - 1) {
      setDevocionalAtualIndex(prevIndex => prevIndex + 1);
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
              className={`nav-arrow left-arrow ${devocionalAtualIndex === 0 ? 'disabled' : ''}`}
              onClick={handlePrevious}
              disabled={devocionalAtualIndex === 0}
            >
              <span className="arrow-icon">{'<'}</span>
            </button>
            {devocionaisComDatas[devocionalAtualIndex] && (
              <div className="devocional-box" onClick={openModal}>
                <h2>{devocionaisComDatas[devocionalAtualIndex].title}</h2>
                <p>{devocionaisComDatas[devocionalAtualIndex].verse}</p>
                <p>{devocionaisComDatas[devocionalAtualIndex].date}</p>
              </div>
            )}
            <button
              className={`nav-arrow right-arrow ${devocionalAtualIndex === devocionaisComDatas.length - 1 ? 'disabled' : ''}`}
              onClick={handleNext}
              disabled={devocionalAtualIndex === devocionaisComDatas.length - 1}
            >
              <span className="arrow-icon">{'>'}</span>
            </button>
          </div>
        </main>
      </div>
      <footer className="footer">
        <p>Centro Universitário Filadélfia &copy; 2024. Todos os direitos reservados.</p>
      </footer>

      {isModalOpen && devocionaisComDatas[devocionalAtualIndex] && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>{devocionaisComDatas[devocionalAtualIndex].title} - {devocionaisComDatas[devocionalAtualIndex].verse}</h2>
            {devocionaisComDatas[devocionalAtualIndex].content.map((paragraph, index) => (
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