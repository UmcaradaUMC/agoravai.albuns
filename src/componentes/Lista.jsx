export function Lista({ albuns }) {
  // Requisito F7: Se a busca não encontrar nada
  if (albuns.length === 0) {
    return <p>Nenhum item encontrado</p>;
  }

  return (
    <ul>
      {albuns.map((album) => (
        <li key={album.id}>
          {album.titulo} · artista {album.artista} · ano {album.ano} · avaliacao {album.avaliacao}
        </li>
      ))}
    </ul>
  );
}z