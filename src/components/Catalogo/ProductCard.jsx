import { Link } from "react-router-dom";
import "./ProductCard.css"

function ProductCard({ producto }) {
  return (
    <Link
      to={`/producto/${producto.slug}`}
      className="producto-link"
    >
      <article className="producto">

        {/* IMAGEN */}
        <div className="imagen">
          <img
            src={
              producto.images?.find(
                (img) => img.isPrimary
              )?.url ||
              producto.images?.[0]?.url ||
              "/no-image.png"
            }
            alt={producto.name}
            loading="lazy"
          />
        </div>

        {/* MARCA */}
        <span className="etiqueta">
          {producto.brand?.name}
        </span>

        {/* NOMBRE */}
        <h3>
          {producto.name}
        </h3>

        {/* CATEGORÍA */}
        <p className="descripcion">
          {producto.category?.name}
        </p>

        {/* PRECIO */}
        <strong>
          S/. {producto.price}
        </strong>

      </article>
    </Link>
  );
}

export default ProductCard;