import { useState } from "react";
import { Link } from "react-router-dom";

import SliderCategorias from "../components/SliderCategorias.jsx";
import StyleCategories from "../components/StyleCategories.jsx";
import GallerySection from "../components/GallerySection.jsx";

import videoFondo from "../assets/video/fondoretro.mp4";
import heroPoster from "../assets/video/heroposter.png";

import "./Home.css";

function Home() {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <>
      <main>
        <section className="fondo">
          <div className="hero-media">

            <img
              src={heroPoster}
              alt="TIOURBAN"
              className={`hero-poster ${videoReady ? "hide" : ""}`}
            />

            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="video-fondo"
              onPlaying={() => {
                setTimeout(() => {
                  setVideoReady(true);
                }, 250);
              }}
            >
              <source
                src={videoFondo}
                type="video/mp4"
              />
            </video>

            <div className="hero-overlay"></div>
          </div>

          <div className="titulo">

            <span className="badge">
              @TIOURBAN
            </span>

            <div className="urbanStore">
              URBAN STORE
            </div>

            <h1>
  <span>EL FLOW</span>
  <span>EMPIEZA</span>
  <span>POR LOS PIES</span>
</h1>

            <p>
              Zapatillas que definen tu estilo.
              Modelos exclusivos y envíos a todo el Perú.
            </p>

            <div className="heroButtons">

              <a
                className="btnPrimary"
                href="https://wa.me/51902824286"
                target="_blank"
                rel="noopener noreferrer"
              >
                Comprar ahora
              </a>

              <Link
                to="/catalogo"
                className="btnSecondary"
              >
                Explorar catálogo
              </Link>

            </div>

          </div>

          <div className="hero-bottom">
            <span>ESTILO</span>
            <span className="hero-line"></span>
            <span>TIOURBAN</span>
            <span className="hero-line"></span>
            <span>STREETWEAR</span>
          </div>

        </section>

        <StyleCategories />
        <SliderCategorias />
        <GallerySection />

      </main>
    </>
  );
}

export default Home;