import { NavLink } from "react-router-dom";
import { FiX } from "react-icons/fi";

import "./NavLinks.css";

function NavLinks({ menuOpen, setMenuOpen }) {
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`nav-links ${menuOpen ? "show" : ""}`}>
      
      <button
        type="button"
        className="close-menu"
        onClick={closeMenu}
        aria-label="Cerrar menú"
      >
        <FiX />
      </button>

      <NavLink
        to="/"
        onClick={closeMenu}
      >
        Inicio
      </NavLink>

      <NavLink
        to="/catalogo/g5"
        onClick={closeMenu}
      >
        G5
      </NavLink>

      <NavLink
        to="/catalogo/importada"
        onClick={closeMenu}
      >
        Importada
      </NavLink>

      <NavLink
        to="/catalogo/premium"
        onClick={closeMenu}
      >
        Premium
      </NavLink>

      <NavLink
        to="/contacto"
        onClick={closeMenu}
      >
        Contacto
      </NavLink>

    </nav>
  );
}

export default NavLinks;