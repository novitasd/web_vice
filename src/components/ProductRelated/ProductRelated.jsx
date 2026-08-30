import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../services/product.service";
import "./ProductRelated.css";

export default function ProductRelated({ product }) {
  const sliderRef = useRef(null);

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // CARGAR PRODUCTOS RELACIONADOS
  // ==========================================

  useEffect(() => {
    if (!product) return;

    async function cargarRelacionados() {
      try {
        setLoading(true);

        const response = await getProducts();

        const todos = response.data.filter(
          (p) => p.active
        );

        let relacionados = todos.filter(
          (p) =>
            p.id !== product.id &&
            p.brand?.id === product.brand?.id
        );

        // Si hay pocos productos de la misma marca,
        // completar con productos de la misma categoría
        if (relacionados.length < 8) {
          const categoria = todos.filter(
            (p) =>
              p.id !== product.id &&
              p.category?.id === product.category?.id &&
              !relacionados.some(
                (r) => r.id === p.id
              )
          );

          relacionados = [
            ...relacionados,
            ...categoria,
          ];
        }

        setProductos(relacionados.slice(0, 8));

      } catch (error) {
        console.error(
          "Error cargando productos relacionados:",
          error
        );

      } finally {
        setLoading(false);
      }
    }

    cargarRelacionados();

  }, [product]);

  // ==========================================
  // MOVER SLIDER
  // ==========================================

  const moverSlider = (direccion) => {
    const slider = sliderRef.current;

    if (!slider) return;

    const card = slider.querySelector(".relatedCard");

    if (!card) return;

    const gap = 24;
    const distancia = card.offsetWidth + gap;

    slider.scrollBy({
      left:
        direccion === "siguiente"
          ? distancia
          : -distancia,
      behavior: "smooth",
    });
  };

  // ==========================================
  // HEADER
  // ==========================================

  const Header = () => (
    <div className="relatedHeader">

      <div className="relatedTitle">

        <span className="relatedEyebrow">
          MÁS DE {product?.brand?.name?.toUpperCase()}
        </span>

        <h2>
          También te puede interesar
        </h2>

        <p className="relatedDescription">
          Descubre más modelos de {product?.brand?.name}
          que podrían gustarte.
        </p>

      </div>

      {!loading && productos.length > 0 && (
        <div className="relatedButtons">

          <button
            type="button"
            onClick={() => moverSlider("anterior")}
            aria-label="Productos anteriores"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => moverSlider("siguiente")}
            aria-label="Siguientes productos"
          >
            →
          </button>

        </div>
      )}

    </div>
  );

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <section className="relatedSection">
        <div className="relatedContainer">
          <Header />
        </div>
      </section>
    );
  }

  // ==========================================
  // SIN PRODUCTOS
  // ==========================================

  if (productos.length === 0) {
    return null;
  }

  // ==========================================
  // COMPONENTE
  // ==========================================

  return (
    <section className="relatedSection">

      <div className="relatedContainer">

        <Header />

        <div
          className="relatedSlider"
          ref={sliderRef}
        >

          {productos.map((producto) => {

            // Misma lógica de oferta que ProductCard
            const hasOffer =
              Number(producto.offerPrice) > 0 &&
              Number(producto.offerPrice) <
              Number(producto.price);

            // Buscar imagen principal primero
            const imagen =
              producto.images?.find(
                (img) => img.isPrimary
              )?.url ||
              producto.images?.[0]?.url ||
              "/no-image.png";

            return (
              <Link
                key={producto.id}
                to={`/producto/${producto.slug}`}
                className="relatedCard"
              >

                {/* IMAGEN */}
                <div className="relatedImage">

                  <img
                    src={imagen}
                    alt={producto.name}
                    loading="lazy"
                  />

                </div>

                {/* INFORMACIÓN */}
                <div className="relatedInfo">

                  <span className="relatedLabel">
                    {producto.brand?.name}
                  </span>

                  <h3>
                    {producto.name}
                  </h3>

                  {/* FOOTER IGUAL AL CATÁLOGO */}
                  <div className="relatedFooter">

                    <p className="relatedDescriptionCard">
                      {producto.category?.name}
                    </p>

                    {/* PRECIO */}
                    <div className="relatedPriceContainer">

                      {hasOffer ? (
                        <>
                          <span className="relatedOldPrice">
                            S/. {producto.price}
                          </span>

                          <strong className="relatedOfferPrice">
                            S/. {producto.offerPrice}
                          </strong>
                        </>
                      ) : (
                        <strong className="relatedNormalPrice">
                          S/. {producto.price}
                        </strong>
                      )}

                    </div>

                  </div>

                </div>

              </Link>
            );
          })}

        </div>

      </div>

    </section>
  );
}