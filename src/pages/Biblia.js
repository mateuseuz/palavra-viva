import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Biblia.css';

const Biblia = () => {
  const navigate = useNavigate();
  const [livroSelecionado, setLivroSelecionado] = useState('Gênesis');
  const [capituloSelecionado, setCapituloSelecionado] = useState(1);
  const [textoBiblia, setTextoBiblia] = useState('');

  const livrosDaBiblia = [
    'Gênesis', 'Êxodo', 'Levítico', 'Números', 'Deuteronômio',
    'Josué', 'Juízes', 'Rute', '1 Samuel', '2 Samuel', '1 Reis', '2 Reis',
    '1 Crônicas', '2 Crônicas', 'Esdras', 'Neemias', 'Ester', 'Jó', 'Salmos',
    'Provérbios', 'Eclesiastes', 'Cantares', 'Isaías', 'Jeremias', 'Lamentações',
    'Ezequiel', 'Daniel', 'Oséias', 'Joel', 'Amós', 'Obadias', 'Jonas', 'Miquéias',
    'Naum', 'Habacuque', 'Sofonias', 'Ageu', 'Zacarias', 'Malaquias', 'Mateus',
    'Marcos', 'Lucas', 'João', 'Atos', 'Romanos', '1 Coríntios', '2 Coríntios',
    'Gálatas', 'Efésios', 'Filipenses', 'Colossenses', '1 Tessalonicenses',
    '2 Tessalonicenses', '1 Timóteo', '2 Timóteo', 'Tito', 'Filemom', 'Hebreus',
    'Tiago', '1 Pedro', '2 Pedro', '1 João', '2 João', '3 João', 'Judas', 'Apocalipse'
  ];

  useEffect(() => {
    // Função que carrega o texto do capítulo selecionado
    const carregarTexto = async () => {
      try {
        const response = await fetch(`https://bible-api.com/${livroSelecionado}%20${capituloSelecionado}?translation=almeida`);
        const data = await response.json();
        const texto = data.verses.map(verso => `<sup>[${verso.verse}]</sup> ${verso.text}`).join(' ');
        setTextoBiblia(texto);
      } catch (error) {
        console.error('Erro ao carregar o texto:', error);
        setTextoBiblia('Texto não encontrado.');
      }
    };

    carregarTexto();
  }, [livroSelecionado, capituloSelecionado]);

  return (
    <div className="page-container">
      <div className="content-container">
        <header className="biblia-header">
          <button className="nav-button" onClick={() => navigate('/')}>
            Início
          </button>
          <h1 className="biblia-title">Palavra Viva</h1>
          <button className="nav-button" onClick={() => navigate('/devocionais')}>
            Devocionais
          </button>
        </header>
        <main className="biblia-main">
          <p className="biblia-instruction">Escolha um livro e capítulo para ler.</p>
          <div className="biblia-selection">
            <label>Livro:</label>
            <select
              value={livroSelecionado}
              onChange={(e) => setLivroSelecionado(e.target.value)}
            >
              {livrosDaBiblia.map(livro => (
                <option key={livro} value={livro}>
                  {livro}
                </option>
              ))}
            </select>
            <label>Capítulo:</label>
            <select
              value={capituloSelecionado}
              onChange={(e) => setCapituloSelecionado(Number(e.target.value))}
            >
              {[...Array(150).keys()].map(i => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="biblia-texto">
            <h2>{livroSelecionado} {capituloSelecionado}</h2>
            <p dangerouslySetInnerHTML={{ __html: textoBiblia }}></p>
          </div>
        </main>
      </div>
      <footer className="footer">
        <p>Centro Universitário Filadélfia &copy; 2024. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Biblia;
