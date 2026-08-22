import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./Redes.css";

const mensajes = [
  {
    texto: "Hasta 20% de descuento en modelos seleccionados",
    color: "linear-gradient(90deg,#18181b,#7f1d1d)",
  },
  {
    texto: "Envíos rápidos a todo el Perú",
    color: "linear-gradient(90deg,#18181b,#1e3a8a)",
  },
  {
    texto: "Colección Jordan, Nike y Adidas disponible",
    color: "linear-gradient(90deg,#18181b,#374151)",
  },
  {
    texto: "Compra segura y atención personalizada",
    color: "linear-gradient(90deg,#18181b,#14532d)",
  },
  {
    texto: "Nuevos ingresos cada semana",
    color: "linear-gradient(90deg,#18181b,#78350f)",
  },
];

function TopBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % mensajes.length);
    }, 4500);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div
      className="topbar"
      style={{
        background: mensajes[index].color,
      }}
    >
      <div className="topbar-info">

        <div className="topbar-status">
          Disponible
        </div>

        <span key={index} className="buy-text">
          {mensajes[index].texto}
        </span>

        <a
          href="https://wa.me/51902824286"
          target="_blank"
          rel="noreferrer"
          className="whatsapp-btn"
        >
          <FaWhatsapp />
          <span>Contactar</span>
        </a>

      </div>
    </div>
  );
}

export default TopBar;