import { Link } from "react-router-dom";
import "./StyleCategories.css";

const categories = [
  {
    id: 1,
    name: "G5",
    path: "/catalogo/g5",
    tag: "MÁXIMA CALIDAD",
    className: "g5",
  },
  {
    id: 2,
    name: "IMPORTADA",
    path: "/catalogo/importada",
    tag: "CALIDAD SELECCIONADA",
    className: "importada",
  },
  {
    id: 3,
    name: "PREMIUM",
    path: "/catalogo/premium",
    tag: "CALIDAD ESENCIAL",
    className: "premium",
  },
];

function StyleCategories() {
  return (
    <section className="style-categories">

      <div className="style-header">
        <span>DESCUBRE</span>
        <h2>ENCUENTRA TU NIVEL</h2>
      </div>

      <div className="style-slider">

        {categories.map((category) => (
          <Link
            key={category.id}
            to={category.path}
            className={`style-card ${category.className}`}
          >
            <div className="style-image">
              <strong>{category.name}</strong>

              <span className="style-lines">
                ///
              </span>
            </div>

            <p>{category.tag}</p>
          </Link>
        ))}

      </div>

    </section>
  );
}

export default StyleCategories;