import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Biblia.css';

// Versículos dos livros curtos
const livrosCurtos = {
  '2 João': {
    1: [
      "<sup>[1]</sup> O ancião à senhora eleita, e a seus filhos, aos quais eu amo em verdade, e não somente eu, mas também todos os que conhecem a verdade,",
      "<sup>[2]</sup> por causa da verdade que permanece em nós e estará para sempre conosco:",
      "<sup>[3]</sup> Graça, misericórdia e paz da parte de Deus Pai e de Jesus Cristo, o Filho do Pai, estarão conosco em verdade e amor.",
      "<sup>[4]</sup> Fiquei sobremodo alegre em ter encontrado alguns dos teus filhos andando na verdade, assim como recebemos mandamento da parte do Pai.",
      "<sup>[5]</sup> E agora, senhora, peço-te, não como se escrevesse novo mandamento, senão aquele que tivemos desde o princípio: que nos amemos uns aos outros.",
      "<sup>[6]</sup> E o amor é este: que andemos segundo os seus mandamentos. Este mandamento, como ouvistes desde o princípio, é que andeis nesse amor.",
      "<sup>[7]</sup> Porque muitos enganadores têm saído pelo mundo fora, os quais não confessam Jesus Cristo vindo em carne; assim é o enganador e o anticristo.",
      "<sup>[8]</sup> Acautelai-vos, para não perderdes aquilo que temos realizado com esforço, mas para receberdes completo galardão.",
      "<sup>[9]</sup> Todo aquele que ultrapassa a doutrina de Cristo e nela não permanece não tem Deus; o que permanece na doutrina, esse tem tanto o Pai como o Filho.",
      "<sup>[10]</sup> Se alguém vem ter convosco e não traz esta doutrina, não o recebais em casa, nem o saudeis.",
      "<sup>[11]</sup> Pois quem o saúda faz-se cúmplice das suas obras más.",
      "<sup>[12]</sup> Embora tenha muitas coisas para vos escrever, não o quis fazer com papel e tinta, pois espero ir até vós e falar de viva voz, para que a nossa alegria seja completa.",
      "<sup>[13]</sup> Os filhos da tua irmã eleita te saúdam."
    ]
  },
  '3 João': {
    1: [
      "<sup>[1]</sup> O ancião ao amado Gaio, a quem eu amo em verdade.",
      "<sup>[2]</sup> Amado, acima de tudo faço votos por tua prosperidade e saúde, assim como é próspera a tua alma.",
      "<sup>[3]</sup> Pois fiquei sobremodo alegre pela vinda de irmãos e pelo seu testemunho da tua verdade, como tu andas na verdade.",
      "<sup>[4]</sup> Não tenho maior alegria do que esta, a de ouvir que meus filhos andam na verdade.",
      "<sup>[5]</sup> Amado, procedes fielmente em tudo o que fazes para com os irmãos, especialmente para com os estranhos,",
      "<sup>[6]</sup> os quais, perante a igreja, deram testemunho do teu amor. Bem farás encaminhando-os em sua jornada por modo digno de Deus.",
      "<sup>[7]</sup> Pois por causa do Nome foi que saíram, nada recebendo dos gentios.",
      "<sup>[8]</sup> Portanto, devemos acolher esses irmãos, para nos tornarmos cooperadores da verdade.",
      "<sup>[9]</sup> Escrevi alguma coisa à igreja; mas Diótrefes, que gosta de exercer a primazia entre eles, não nos dá acolhida.",
      "<sup>[10]</sup> Por isso, se eu for, far-lhe-ei lembradas as obras que ele pratica, proferindo contra nós palavras maliciosas. E não satisfeito com essas coisas, nem ele mesmo acolhe os irmãos, como impede os que querem recebê-los e os expulsa da igreja.",
      "<sup>[11]</sup> Amado, não imites o que é mau, senão o que é bom. Aquele que pratica o bem procede de Deus; aquele que pratica o mal jamais viu a Deus.",
      "<sup>[12]</sup> Quanto a Demétrio, todos lhe dão testemunho, até a própria verdade; e também nós damos testemunho, e tu sabes que o nosso testemunho é verdadeiro.",
      "<sup>[13]</sup> Muitas coisas tinha que te escrever; todavia, não quis fazê-lo com tinta e pena,",
      "<sup>[14]</sup> pois, em breve, espero ver-te. Então, conversaremos de viva voz.",
      "<sup>[15]</sup> A paz seja contigo. Os amigos te saúdam. Saúda os amigos, um a um."
    ]
  },
  'Judas': {
    1: [
      "<sup>[1]</sup> Judas, servo de Jesus Cristo e irmão de Tiago, aos chamados, amados em Deus Pai e guardados em Jesus Cristo,",
      "<sup>[2]</sup> a vocês, misericórdia, paz e amor em abundância.",
      "<sup>[3]</sup> Amados, embora estivesse muito ansioso para escrever-lhes acerca da salvação que compartilhamos, senti que era necessário escrever-lhes insistindo que batalhassem pela fé uma vez por todas confiada aos santos.",
      // (restante dos versículos de Judas)
    ]
  }
};

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

const Biblia = () => {
  const navigate = useNavigate();
  const [livroSelecionado, setLivroSelecionado] = useState('Gênesis');
  const [capituloSelecionado, setCapituloSelecionado] = useState(1);
  const [textoBiblia, setTextoBiblia] = useState('');
  const [erroCarregamento, setErroCarregamento] = useState('');

  const livrosDaBiblia = [
    'Gênesis', 'Êxodo', 'Levítico', 'Números', 'Deuteronômio', 'Josué', 'Juízes', 'Rute',
    '1 Samuel', '2 Samuel', '1 Reis', '2 Reis', '1 Crônicas', '2 Crônicas', 'Esdras', 
    'Neemias', 'Ester', 'Jó', 'Salmos', 'Provérbios', 'Eclesiastes', 'Cantares', 'Isaías',
    'Jeremias', 'Lamentações', 'Ezequiel', 'Daniel', 'Oséias', 'Joel', 'Amós', 'Obadias', 
    'Jonas', 'Miquéias', 'Naum', 'Habacuque', 'Sofonias', 'Ageu', 'Zacarias', 'Malaquias',
    'Mateus', 'Marcos', 'Lucas', 'João', 'Atos', 'Romanos', '1 Coríntios', '2 Coríntios',
    'Gálatas', 'Efésios', 'Filipenses', 'Colossenses', '1 Tessalonicenses', '2 Tessalonicenses',
    '1 Timóteo', '2 Timóteo', 'Tito', 'Filemom', 'Hebreus', 'Tiago', '1 Pedro', '2 Pedro',
    '1 João', '2 João', '3 João', 'Judas', 'Apocalipse'
  ];

  useEffect(() => {
    const carregarTexto = () => {
      if (livrosCurtos[livroSelecionado]) {
        const texto = livrosCurtos[livroSelecionado][capituloSelecionado].join(' ');
        setTextoBiblia(texto);
        setErroCarregamento('');
      } else {
        fetch(`https://bible-api.com/${livroSelecionado}%20${capituloSelecionado}?translation=almeida`)
          .then((response) => {
            if (!response.ok) throw new Error('Erro ao carregar o capítulo');
            return response.json();
          })
          .then((data) => {
            const texto = data.verses.map(verso => `<sup>[${verso.verse}]</sup> ${verso.text}`).join(' ');
            setTextoBiblia(texto);
            setErroCarregamento('');
          })
          .catch((error) => {
            console.error('Erro ao carregar o texto:', error);
            setErroCarregamento('Texto não encontrado ou capítulo inválido.');
          });
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
            {erroCarregamento ? (
              <p>{erroCarregamento}</p>
            ) : (
              <p dangerouslySetInnerHTML={{ __html: textoBiblia }}></p>
            )}
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
