import { useState } from "react";

export function Formulario({ apiUlr, onCadastroSucesso }) {
  const [titulo, setTitulo] = useState("");
  const [artista, setArtista] = useState("");
  const [ano, setAno] = useState("");
  const [avaliacao, setAvaliacao] = useState("");
  const [erro, setErro] = useState("");

  async function cadastrar(evento) {
    evento.preventDefault();
    setErro("");

    const resposta = await fetch(apiUlr, {
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
      // Requisito F4: Mostra a mensagem de erro do backend em vermelho
      setErro(dados.erro || "Erro ao cadastrar.");
      return;
    }

    if (resposta.ok) {
      // Requisito F3: Limpa os campos e recarrega lista e resumo
      setTitulo("");
      setArtista("");
      setAno("");
      setAvaliacao("");
      onCadastroSucesso();
    }
  }

  return (
    <form onSubmit={cadastrar}>
      {/* F4: Erro em vermelho */}
      {erro && <p style={{ color: "red", fontWeight: "bold" }}>{erro}</p>}

      <input placeholder="Titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
      <input placeholder="Artista" value={artista} onChange={(e) => setArtista(e.target.value)} required />
      <input placeholder="Ano" type="number" value={ano} onChange={(e) => setAno(e.target.value)} required />
      <input placeholder="Avaliacao" type="number" step="0.1" value={avaliacao} onChange={(e) => setAvaliacao(e.target.value)} required />
      <button type="submit">Cadastrar</button>
    </form>
  );
}