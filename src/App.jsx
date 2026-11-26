import { useEffect, useState } from "react";
import "./App.css";

const API = "http://127.0.0.1:8000/api/albuns/";

function App() {
  const [albuns, setAlbuns] = useState([]);
  const [resumo, setResumo] = useState(null);
  const [busca, setBusca] = useState("");

  const [titulo, setTitulo] = useState("");
  const [artista, setArtista] = useState("");
  const [ano, setAno] = useState("");
  const [avaliacao, setAvaliacao] = useState("");
  const [erro, setErro] = useState("");

  async function carregarDados() {
    try {
      const resAlbuns = await fetch(API);
      const dadosAlbuns = await resAlbuns.json();
      setAlbuns(dadosAlbuns);

      const resResumo = await fetch(`${API}resumo/`);
      const dadosResumo = await resResumo.json();
      setResumo(dadosResumo);
    } catch (e) {
      console.error("Erro ao carregar dados:", e);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  async function cadastrar(evento) {
    evento.preventDefault();
    setErro("");

    const resposta = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        titulo, 
        artista, 
        ano: Number(ano), 
        avaliacao: Number(avaliacao) 
      }),
    });

    const dados = await resposta.json();

    if (resposta.status === 400) {
      setErro(dados.erro || "Erro ao cadastrar.");
      return;
    }

    if (resposta.ok) {
      setTitulo("");
      setArtista("");
      setAno("");
      setAvaliacao("");
      carregarDados();
    }
  }

  // Filtra os álbuns pelo título à medida que o utilizador digita
  const albunsFiltrados = albuns.filter((album) =>
    album.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="pagina">
      <h1>Cadastro de albuns</h1>

      {/* Resumo no topo (Total, Média, Melhor item) */}
      {resumo && (
        <div style={{ background: "#f4f4f4", padding: "10px", marginBottom: "15px", borderRadius: "5px" }}>
          <p><strong>Total de álbuns:</strong> {resumo.total}</p>
          <p><strong>Média de avaliação:</strong> {resumo.media}</p>
          <p><strong>Melhor álbum:</strong> {resumo.melhor_item || "Nenhum"}</p>
        </div>
      )}

      <form onSubmit={cadastrar}>
        {erro && <p style={{ color: "red", fontWeight: "bold" }}>{erro}</p>}

        <input
          placeholder="Titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <input
          placeholder="Artista"
          value={artista}
          onChange={(e) => setArtista(e.target.value)}
          required
        />
        <input
          placeholder="Ano"
          type="number"
          step="1"
          min="1900"
          max="2026"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          required
        />
        <input
          placeholder="Avaliacao"
          type="number"
          step="0.1"
          min="0"
          max="10"
          value={avaliacao}
          onChange={(e) => setAvaliacao(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form> 

      <h2>Albuns cadastrados</h2>

      <input
        placeholder="Pesquisar por título..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      />

      {albunsFiltrados.length === 0 ? (
        <p>Nenhum item encontrado</p>
      ) : (
        <ul>
          {albunsFiltrados.map((album) => (
            <li key={album.id}>
              {album.titulo} · artista {album.artista} · ano {album.ano} · avaliacao {album.avaliacao} 
            </li>
          ))}
        </ul> 
      )}
    </div>
  );
}

export default App;
