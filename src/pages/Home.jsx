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
        <div className="fondo">

          <div className="hero-media">

            <img
              src={heroPoster}
              alt="Hero"
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

          </div>

          <div className="titulo">

            <span className="badge">
              @TIOURBAN
            </span>

            <h1>
              ELEVA TU <br />
              ESTILO
            </h1>

            <p>
              Las mejores zapatillas  con acabados premium,
              envíos a todo el Perú y modelos exclusivos.
            </p>

            <div className="heroButtons">

              <a
                className="btnPrimary"
                href="https://wa.me/51902824286"
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

        </div>

        <StyleCategories />

        <SliderCategorias />

        <GallerySection />

      </main>
    </>
  );
}

export default Home;