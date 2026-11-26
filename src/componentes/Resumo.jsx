
export function Resumo({ resumo }) {
  if (!resumo) return null;

  return (
    <div style={{ background: "#f4f4f4", padding: "10px", marginBottom: "15px", borderRadius: "5px" }}>
      <p><strong>Total de álbuns:</strong> {resumo.total}</p>
      <p><strong>Média de avaliação:</strong> {resumo.media}</p>
      <p><strong>Melhor álbum:</strong> {resumo.melhor_item || "Nenhum"}</p>
    </div>
  );
}