import { useState } from "react";
import { FiMenu } from "react-icons/fi";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import NavbarActions from "./NavbarActions";
import DesktopSearch from "./DesktopSearch";
import MobileSearch from "./MobileSearch";
import { useProductSearch } from "./useProductSearch";

import { useCart } from "../../context/CartContext";

import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  const {
    search,
    setSearch,
    results,
    loading,
    searchOpen,
    setSearchOpen,
    searchRef,
    buscarEnCatalogo,
    handleKeyDown,
    cerrarBusqueda,
  } = useProductSearch();

  const { cart } = useCart();

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cerrarTodo = () => {
  cerrarBusqueda();
  setMobileSearch(false);
  };

  return (
    <header className="navbar">
      {/* ==========================
          MENÚ MÓVIL
      ========================== */}

      <button
        type="button"
        className="menu-btn"
        onClick={() => setMenuOpen(true)}
        aria-label="Abrir menú"
      >
        <FiMenu />
      </button>

      {/* ==========================
          LOGO
      ========================== */}

      <Logo />

      {/* ==========================
          NAVEGACIÓN
      ========================== */}

      <NavLinks
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {/* ==========================
          ACCIONES
      ========================== */}

      <div className="nav-icons">
        <DesktopSearch
          searchRef={searchRef}
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
          search={search}
          setSearch={setSearch}
          loading={loading}
          results={results}
          buscarEnCatalogo={buscarEnCatalogo}
          cerrarBusqueda={cerrarBusqueda}
          handleKeyDown={handleKeyDown}
        />

        <NavbarActions
          totalItems={totalItems}
          setMobileSearch={setMobileSearch}
          setSearchOpen={setSearchOpen}
        />
      </div>

      {/* ==========================
          BUSCADOR MÓVIL
      ========================== */}

      <MobileSearch
  mobileSearch={mobileSearch}
  setMobileSearch={setMobileSearch}
  search={search}
  setSearch={setSearch}
  loading={loading}
  results={results}
  handleKeyDown={handleKeyDown}
  buscarEnCatalogo={buscarEnCatalogo}
  cerrarBusqueda={cerrarTodo}
/>
    </header>
  );
}

export default Navbar;