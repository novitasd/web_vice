import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* ===========================
            LOGO Y REDES
        =========================== */}

        <div className="footer-brand">

          <Link to="/" className="footer-logo">
            <div className="footer-logo-brand">
              <span className="footer-logo-top">TIO</span>
              <span className="footer-logo-bottom">URBAN</span>
            </div>
          </Link>

          <p>
            Descubre las mejores zapatillas para cada estilo.
            Inspirados en la cultura sneaker y el streetwear.
          </p>

          <div className="footer-social">

            <a
              href="https://www.instagram.com/tnisperu?igsh=Zmc0bGxqejRxMWV4"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.tiktok.com/@tnisperu?_r=1&_t=ZS-98mgPVz7n9g"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <FaTiktok />
            </a>

            <a
              href="https://www.facebook.com/share/1EjqWDcwZs/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://wa.me/51902824286"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>

          </div>

        </div>


        {/* ===========================
            EXPLORAR
        =========================== */}

        <div className="footer-links">

          <h3>Explorar</h3>

          <Link to="/">
            Inicio
          </Link>

          <Link to="/catalogo">
            Catálogo
          </Link>

          <Link to="/contacto">
            Contacto
          </Link>

        </div>


        {/* ===========================
            AYUDA
        =========================== */}

        <div className="footer-links">

          <h3>Ayuda</h3>

          <a href="#">
            Preguntas frecuentes
          </a>

          <a href="#">
            Envíos
          </a>

          <a href="#">
            Cambios
          </a>

          <a href="#">
            Términos
          </a>

        </div>


        {/* ===========================
            CONTACTO
        =========================== */}

        <div className="footer-links">

          <h3>Contacto</h3>

          <span>
            Lima, Perú
          </span>

          <a
            href="https://wa.me/51902824286"
            target="_blank"
            rel="noopener noreferrer"
          >
            +51 902 824 286
          </a>

          <span>
            Lun - Sáb
          </span>

          <span>
            9:00 AM - 7:00 PM
          </span>

        </div>

      </div>


      <div className="footer-bottom">

        <p>
          © 2026 <strong>TIOURBAN</strong> · TODOS LOS DERECHOS RESERVADOS.
        </p>

      </div>

    </footer>
  );
}

export default Footer;