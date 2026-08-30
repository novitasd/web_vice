import { FiSearch, FiX } from "react-icons/fi";
import SearchResults from "./SearchResults";

import "./DesktopSearch.css";

function DesktopSearch({
  searchRef,
  searchOpen,
  setSearchOpen,
  search,
  setSearch,
  loading,
  results,
  buscarEnCatalogo,
  cerrarBusqueda,
  handleKeyDown,
}) {
  return (
    <div
      ref={searchRef}
      className={`search-box ${
        searchOpen ? "active" : ""
      }`}
    >
      <button
        type="button"
        className="search-icon-btn"
        onClick={buscarEnCatalogo}
        aria-label="Buscar"
      >
        <FiSearch className="search-icon" />
      </button>

      <input
        type="text"
        className="search-input"
        placeholder="buscar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setSearchOpen(true)}
        onKeyDown={handleKeyDown}
      />

      {searchOpen && (
        <button
          type="button"
          className="search-close"
          onClick={cerrarBusqueda}
          aria-label="Cerrar búsqueda"
        >
          <FiX />
        </button>
      )}

      {searchOpen && search.trim() && (
        <div className="search-dropdown">
          <SearchResults
            loading={loading}
            results={results}
            buscarEnCatalogo={buscarEnCatalogo}
            cerrarBusqueda={cerrarBusqueda}
          />
        </div>
      )}
    </div>
  );
}

export default DesktopSearch;