import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import "./SearchResults.css";

function SearchResults({
  loading,
  results,
  buscarEnCatalogo,
  cerrarBusqueda,
}) {
  if (loading) {
    return (
      <div className="search-message">
        Buscando...
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="search-empty">
        <strong>No encontramos resultados</strong>

        <span>
          Intenta buscar otro modelo o marca.
        </span>
      </div>
    );
  }

  return (
    <>
      {results.map((product) => {
        const image =
          product.images?.find(
            (img) => img.isPrimary
          )?.url ||
          product.images?.[0]?.url ||
          "/placeholder.jpg";

        const price =
          product.offerPrice ||
          product.price;

        return (
          <Link
            key={product.id}
            to={`/producto/${product.slug}`}
            className="search-item"
            onClick={cerrarBusqueda}
          >
            <div className="search-product-image">
              <img
                src={image}
                alt={product.name}
              />
            </div>

            <div className="search-info">
              <span className="search-brand">
                {product.brand?.name}
              </span>

              <span className="search-name">
                {product.name}
              </span>

              <span className="search-price">
                S/. {price}
              </span>
            </div>

            <FiArrowRight className="search-arrow" />
          </Link>
        );
      })}

      <button
  type="button"
  className="search-view-all"
  onClick={() => {
    buscarEnCatalogo();
    cerrarBusqueda();
  }}
>
        <span>Ver todos los resultados</span>

        <FiArrowRight />
      </button>
    </>
  );
}

export default SearchResults;