import "./CatalogoHeader.css";

function CatalogoHeader({
  titulo,
  descripcion,
  calidad = "all",
}) {
  const isGeneral = calidad === "all";

  return (
    <header className={`catalogo-header catalogo-${calidad}`}>

      <div className="catalogo-header-content">

        <span className="catalogo-eyebrow">
          {isGeneral
            ? "TIOURBAN / STORE"
            : "TIOURBAN / QUALITY"
          }
        </span>

        <h1>{titulo}</h1>

        {descripcion && (
          <p>{descripcion}</p>
        )}

      </div>

      {!isGeneral && (
        <div className="catalogo-quality-badge">

          <span>LEVEL</span>

          <small>///</small>

        </div>
      )}

    </header>
  );
}

export default CatalogoHeader;