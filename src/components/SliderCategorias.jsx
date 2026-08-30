import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/product.service";
import "./SliderCategorias.css";

export default function SliderCategorias() {
  const sliderRef = useRef(null);

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // CARGAR PRODUCTOS DESTACADOS
  // ==========================================

  useEffect(() => {
    async function cargarDestacados() {
      try {
        setLoading(true);

        const response = await getProducts();

        const destacados = response.data.filter(
          (producto) =>
            producto.featured === true &&
            producto.active === true
        );

        setProductos(destacados);
      } catch (error) {
        console.error(
          "Error cargando productos destacados:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    cargarDestacados();
  }, []);

  // ==========================================
  // MOVER SLIDER
  // ==========================================

  const moverSlider = (direccion) => {
    const slider = sliderRef.current;

    if (!slider) return;

    const card = slider.querySelector(".destacadoCard");

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
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <section className="sliderCategorias">
        <div className="sliderCategoriasContainer">
          <div className="sliderHeader">
            <div className="sliderTitulo">
              <span className="sliderEyebrow">
                SELECCIÓN
              </span>

              <h2>
                Productos destacados
              </h2>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // NO HAY DESTACADOS
  // ==========================================

  if (productos.length === 0) {
    return null;
  }

  // ==========================================
  // COMPONENTE
  // ==========================================

  return (
    <section className="sliderCategorias">

      <div className="sliderCategoriasContainer">

        {/* HEADER */}

        <div className="sliderHeader">

          <div className="sliderTitulo">

            <span className="sliderEyebrow">
              SELECCIÓN
            </span>

            <h2>
              Productos destacados
            </h2>

          </div>

          <div className="botones">

            <button
              type="button"
              onClick={() => moverSlider("anterior")}
              aria-label="Producto anterior"
            >
              ←
            </button>

            <button
              type="button"
              onClick={() => moverSlider("siguiente")}
              aria-label="Producto siguiente"
            >
              →
            </button>

          </div>

        </div>

        {/* PRODUCTOS */}

        <div
          className="slider"
          ref={sliderRef}
        >

          {productos.map((producto) => {

            // LÓGICA DE OFERTA
            const hasOffer =
              Number(producto.offerPrice) > 0 &&
              Number(producto.offerPrice) < Number(producto.price);

            // IMAGEN PRINCIPAL
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
                className="destacadoCard"
              >

                {/* IMAGEN */}

                <div className="categoriaImagen">

                  <img
                    src={imagen}
                    alt={producto.name}
                    loading="lazy"
                  />

                </div>

                {/* INFORMACIÓN */}

                <div className="categoriaInfo">

                  <span className="categoriaLabel">
                    {producto.brand?.name}
                  </span>

                  <h3>
                    {producto.name}
                  </h3>

                  {/* FOOTER COMO PRODUCT CARD */}

                  <div className="destacadoFooter">

                    <p className="destacadoDescripcion">
                      {producto.category?.name}
                    </p>

                    <div className="destacadoPrecio">

                      {hasOffer ? (
                        <>

                          <span className="destacadoPrecioAnterior">
                            S/. {producto.price}
                          </span>

                          <strong className="destacadoPrecioOferta">
                            S/. {producto.offerPrice}
                          </strong>

                        </>
                      ) : (
                        <strong className="destacadoPrecioNormal">
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