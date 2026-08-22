import { Link } from "react-router-dom";
import "./ProductBreadcrumb.css";

function ProductBreadcrumb({ product }) {
  return (
    <nav className="breadcrumb">
      <Link to="/">Inicio</Link>

      <span> / </span>

      <Link to="/catalogo">
        Catálogo
      </Link>

      <span> / </span>

      <span>{product.name}</span>
    </nav>
  );
}

export default ProductBreadcrumb;