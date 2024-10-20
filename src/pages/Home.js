import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [visits, setVisits] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/visits')
      .then(response => response.json())
      .then(data => setVisits(data.count))
      .catch(error => console.error('Error fetching visits:', error));
  }, []);

  return (
    <div className="page-container">
      <div className="content-container">
        <header className="home-header">
          <h1>Bem-vindo(a) ao Palavra Viva!</h1>
          <p className="visit-counter">Contador de visitas: {visits}</p>
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