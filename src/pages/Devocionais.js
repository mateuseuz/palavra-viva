import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Devocionais.css';

const Devocionais = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

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
            <button className="nav-arrow left-arrow">
              <span className="arrow-icon">{'<'}</span>
            </button>
            <div className="devocional-box" onClick={openModal}>
              <h2>Devocional do Dia</h2>
              <p>João 14:23</p>
              <p>A alegria na obediência</p>
            </div>
            <button className="nav-arrow right-arrow">
              <span className="arrow-icon">{'>'}</span>
            </button>
          </div>
        </main>
      </div>
      <footer className="footer">
        <p>Centro Universitário Filadélfia &copy; 2024. Todos os direitos reservados.</p>
      </footer>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>A Alegria na Obediência - Jo. 14:23</h2>
            <p>"Jesus respondeu: 'Se alguém me ama, obedecerá à minha palavra. Meu Pai o amará, e nós viremos a ele e faremos morada nele.'</p>
            <p>Reflexão do versículo:<br />
            A obediência às palavras de Jesus é uma demonstração de nosso amor por Ele. Quando seguimos Seus ensinamentos, não apenas mostramos nossa devoção, mas também permitimos que Deus habite em nós. A verdadeira alegria vem de viver em harmonia com a vontade de Deus, e essa obediência traz a presença de Deus para nossa vida. Que possamos encontrar alegria ao seguir Seus caminhos e permitir que Ele faça morada em nós.</p>
            <p>Oração:<br />
            Senhor, ajuda-me a obedecer a Tua palavra e a viver de acordo com os Teus ensinamentos. Que a Tua presença habite em mim e que eu encontre alegria em seguir a Tua vontade. Em nome de Jesus, amém.</p>
            <button className="close-button" onClick={closeModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Devocionais;
