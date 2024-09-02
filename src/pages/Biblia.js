import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Biblia.css';

const Biblia = () => {
  const navigate = useNavigate();
  const [livros, setLivros] = useState([]);
  const [capitulos, setCapitulos] = useState([]);
  const [textoBiblia, setTextoBiblia] = useState('');
  const [livroSelecionado, setLivroSelecionado] = useState('Gênesis');
  const [capituloSelecionado, setCapituloSelecionado] = useState(1);

  useEffect(() => {
    // Função que carrega os livros da Bíblia da API
    const carregarLivros = async () => {
      // Exemplo de como você poderia buscar os livros da Bíblia usando uma API
      const livrosDaBiblia = ['Gênesis', 'Êxodo', 'Levítico', 'Números', 'Deuteronômio']; // Exemplo estático
      setLivros(livrosDaBiblia);
    };

    carregarLivros();
  }, []);

  useEffect(() => {
    // Função que carrega os capítulos do livro selecionado
    const carregarCapitulos = async () => {
      // Exemplo de como você poderia buscar os capítulos do livro usando uma API
      const capitulosDoLivro = Array.from({ length: 50 }, (_, i) => i + 1); // Exemplo estático de 50 capítulos
      setCapitulos(capitulosDoLivro);
    };

    carregarCapitulos();
  }, [livroSelecionado]);

  useEffect(() => {
    // Função que carrega o texto do capítulo selecionado
    const carregarTexto = async () => {
      // Aqui você faria a chamada à API para obter o texto do capítulo
      const textoExemplo = `Aqui está o texto de ${livroSelecionado} capítulo ${capituloSelecionado}.`;
      setTextoBiblia(textoExemplo);
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
              {livros.map((livro) => (
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
              {capitulos.map((capitulo) => (
                <option key={capitulo} value={capitulo}>
                  {capitulo}
                </option>
              ))}
            </select>
          </div>
          <div className="biblia-texto">
            <h2>{livroSelecionado} {capituloSelecionado}</h2>
            <p>{textoBiblia}</p>
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
