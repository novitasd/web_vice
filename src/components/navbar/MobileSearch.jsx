import { FiSearch, FiX } from "react-icons/fi";
import SearchResults from "./SearchResults";

import "./MobileSearch.css";

function MobileSearch({
  mobileSearch,
  search,
  setSearch,
  loading,
  results,
  handleKeyDown,
  buscarEnCatalogo,
  cerrarBusqueda,
}) {
  if (!mobileSearch) return null;

  return (
    <div className="mobile-search-overlay">
      <button
        className="mobile-back"
        onClick={cerrarBusqueda}
      >
        <FiX />
      </button>

      <div className="mobile-search-input">
        <FiSearch />

        <input
          autoFocus
          type="text"
          placeholder="Buscar zapatillas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="mobile-results">
        <SearchResults
          loading={loading}
          results={results}
          buscarEnCatalogo={buscarEnCatalogo}
          cerrarBusqueda={cerrarBusqueda}
        />
      </div>
    </div>
  );
}

export default MobileSearch;