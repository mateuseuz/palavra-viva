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

  const capitulosPorLivro = {
    'Gênesis': 50, 'Êxodo': 40, 'Levítico': 27, 'Números': 36, 'Deuteronômio': 34,
    'Josué': 24, 'Juízes': 21, 'Rute': 4, '1 Samuel': 31, '2 Samuel': 24,
    '1 Reis': 22, '2 Reis': 25, '1 Crônicas': 29, '2 Crônicas': 36, 'Esdras': 10,
    'Neemias': 13, 'Ester': 10, 'Jó': 42, 'Salmos': 150, 'Provérbios': 31,
    'Eclesiastes': 12, 'Cantares': 8, 'Isaías': 66, 'Jeremias': 52, 'Lamentações': 5,
    'Ezequiel': 48, 'Daniel': 12, 'Oséias': 14, 'Joel': 3, 'Amós': 9, 'Obadias': 1,
    'Jonas': 4, 'Miquéias': 7, 'Naum': 3, 'Habacuque': 3, 'Sofonias': 3,
    'Ageu': 2, 'Zacarias': 14, 'Malaquias': 4, 'Mateus': 28, 'Marcos': 16,
    'Lucas': 24, 'João': 21, 'Atos': 28, 'Romanos': 16, '1 Coríntios': 16,
    '2 Coríntios': 13, 'Gálatas': 6, 'Efésios': 6, 'Filipenses': 4, 'Colossenses': 4,
    '1 Tessalonicenses': 5, '2 Tessalonicenses': 3, '1 Timóteo': 6, '2 Timóteo': 4,
    'Tito': 3, 'Filemom': 1, 'Hebreus': 13, 'Tiago': 5, '1 Pedro': 5, '2 Pedro': 3,
    '1 João': 5, '2 João': 1, '3 João': 1, 'Judas': 1, 'Apocalipse': 22
  };

  useEffect(() => {
    setCapituloSelecionado(1);
  }, [livroSelecionado]);

  useEffect(() => {
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
              {[...Array(capitulosPorLivro[livroSelecionado]).keys()].map(i => (
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
