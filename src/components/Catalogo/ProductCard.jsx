import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ producto }) {

  const hasOffer =
    Number(producto.offerPrice) > 0 &&
    Number(producto.offerPrice) < Number(producto.price);

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

        {/* INFORMACIÓN */}
        <div className="producto-info">

          <span className="etiqueta">
            {producto.brand?.name}
          </span>

          <h3>
            {producto.name}
          </h3>

          <div className="producto-footer">

            <p className="descripcion">
              {producto.category?.name}
            </p>

            {/* PRECIO */}
            <div className="producto-precio">

              {hasOffer ? (
                <>
                  <span className="precio-anterior">
                    S/. {producto.price}
                  </span>

                  <strong className="precio-oferta">
                    S/. {producto.offerPrice}
                  </strong>
                </>
              ) : (
                <strong className="precio-normal">
                  S/. {producto.price}
                </strong>
              )}

            </div>

          </div>

        </div>

      </article>
    </Link>
  );
}

export default ProductCard;