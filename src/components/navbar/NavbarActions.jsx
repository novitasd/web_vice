import { Link } from "react-router-dom";

import {
  FiSearch,
  FiShoppingBag,
  FiUser,
} from "react-icons/fi";

import "./NavbarActions.css";

function NavbarActions({
  totalItems,
  setMobileSearch,
  setSearchOpen,
}) {
  return (
    <>
      {/* Usuario */}
      <button
        type="button"
        className="user-button"
        aria-label="Usuario"
      >
        <FiUser />
      </button>

      {/* Buscar móvil */}
      <button
        type="button"
        className="mobile-search-btn"
        onClick={() => {
          setMobileSearch(true);
          setSearchOpen(true);
        }}
      >
        <FiSearch />
      </button>

      {/* Carrito */}
      <Link
        to="/checkout"
        className="cart-button"
        aria-label="Carrito"
      >
        <FiShoppingBag />

        {totalItems > 0 && (
          <span className="cart-count">
            {totalItems}
          </span>
        )}
      </Link>
    </>
  );
}

export default NavbarActions;