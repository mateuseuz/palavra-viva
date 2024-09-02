import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="content-container">
        <header className="home-header">
          <h1>Bem-vindo(a) ao Palavra Viva!</h1>
        </header>
        <main className="home-main">
          <section className="home-section">
            <button className="cta-button" onClick={() => navigate('/devocionais')}>
              Devocionais Diários
            </button>
            <p>Leia e medite nos devocionais<br />especialmente selecionados para você.</p>
          </section>
          <section className="home-section">
            <button className="cta-button" onClick={() => navigate('/biblia')}>
              Bíblia Sagrada
            </button>
            <p>Mergulhe na Palavra de Deus<br />e permita que ela fale ao seu coração.</p>
          </section>
        </main>
      </div>
      <footer className="footer">
        <p>Centro Universitário Filadélfia &copy; 2024. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
