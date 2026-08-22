import "./GallerySection.css";
import { Link } from "react-router-dom";
const gallery = [
  {
    id: 1,
    title: "Jordan Collection",
    image: "https://i.pinimg.com/1200x/a3/9e/ed/a39eed1c9254dc80f8cef674c2ad2c98.jpg",
    link: "/catalogo/jordan",
  },
  {
    id: 2,
    title: "Street Style",
    image: "https://i.pinimg.com/736x/55/81/66/558166e5936ffde47d4b2cc9b2dc51c6.jpg",
    link: "/catalogo/street-style",
  },
  {
    id: 3,
    title: "Running",
    image: "https://i.pinimg.com/736x/05/db/ad/05dbad26fb972b2f2ae860a1f8d09416.jpg",
    link: "/catalogo/running",
  },

];

function GallerySection() {
  return (
    <section className="gallery">
      <div className="gallery-header">

        <span>STREET GALLERY</span>

        <h2>
          Inspiración para tu
          <br />
          próximo outfit.
        </h2>

      </div>

      <div className="gallery-grid">

        {gallery.map((item) => (

          <article
            className="gallery-card"
            key={item.id}
          >

            <img
              src={item.image}
              alt={item.title}
            />

            <div className="gallery-overlay">

              <h3>{item.title}</h3>

               <Link
  to={item.link}
  className="gallery-btn"
>
  Explorar →
</Link>

            </div>

          </article>

        ))}

      </div>

    </section>
  );
}

export default GallerySection;