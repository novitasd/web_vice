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
          Descubre más modelos {product?.brand?.name} que podrían gustarte.
        </p>

      </div>

      {!loading && (

        <div className="relatedButtons">

          <button
            type="button"
            onClick={() => moverSlider("anterior")}
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => moverSlider("siguiente")}
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

            const imagen =
              producto.images?.length > 0
                ? producto.images[0].url
                : "/no-image.png";

            return (

              <Link
                key={producto.id}
                to={`/producto/${producto.slug}`}
                className="relatedCard"
              >

                <div className="relatedImage">

                  <img
                    src={imagen}
                    alt={producto.name}
                    loading="lazy"
                  />

                </div>

                <div className="relatedInfo">

                  <div>

                    <span className="relatedLabel">
                      {producto.brand?.name}
                    </span>

                    <h3>
                      {producto.name}
                    </h3>

                    <span className="relatedPrice">
                      S/. {producto.offerPrice || producto.price}
                    </span>

                  </div>

                  <span className="relatedArrow">
                    →
                  </span>

                </div>

              </Link>

            );

          })}

        </div>

      </div>

    </section>

  );

}