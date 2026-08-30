import { Link } from "react-router-dom";
import "./StyleCategories.css";

const categories = [
  {
    id: "01",
    name: "G5",
    path: "/catalogo/g5",
    tag: "MÁXIMA CALIDAD",
    description:
      "Máximo nivel de detalle, materiales y acabados.",
    className: "g5",
  },
  {
    id: "02",
    name: "IMPORTADA",
    path: "/catalogo/importada",
    tag: "CALIDAD SELECCIONADA",
    description:
      "Modelos seleccionados con materiales y acabados de alta calidad.",
    className: "importada",
  },
  {
    id: "03",
    name: "PREMIUM",
    path: "/catalogo/premium",
    tag: "CALIDAD ESENCIAL",
    description:
      "Una selección urbana pensada para elevar tu estilo.",
    className: "premium",
  },
];

function StyleCategories() {
  return (
    <section className="style-categories">

      <div className="style-header">

        <div>
          <span>ENCUENTRA TU CALIDAD</span>
          <h2>ELIGE TU NIVEL</h2>
        </div>

        <p>
          Tres niveles seleccionados para que encuentres
          las zapatillas que mejor se adapten a tu estilo.
        </p>

      </div>


      <div className="style-slider">

        {categories.map((category) => (

          <Link
            key={category.id}
            to={category.path}
            className={`style-card ${category.className}`}
          >

            <div className="style-card-top">

              <span className="style-number">
                {category.id}
              </span>

              <span className="style-arrow">
                ↗
              </span>

            </div>


            <div className="style-card-content">

              <span className="style-tag">
                {category.tag}
              </span>

              <h3>
                {category.name}
              </h3>

              <p>
                {category.description}
              </p>

            </div>


            <div className="style-explore">

              <span>EXPLORAR</span>

              <span className="style-line"></span>

              <span className="style-arrow-right">
                →
              </span>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}

export default StyleCategories;