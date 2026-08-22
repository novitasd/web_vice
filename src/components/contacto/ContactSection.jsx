import { FaWhatsapp, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import "./ContactSection.css";

function ContactSection() {
  return (
    <section className="contact-section">

      {/* Información */}
      <div className="contact-info">

        <span className="contact-label">
          CONTACTO
        </span>

        <h2>
          ¿Cómo podemos ayudarte?
        </h2>

        <p>
          Si tienes alguna duda sobre nuestros productos,
          pedidos o disponibilidad, estaremos encantados
          de ayudarte.
        </p>

        <div className="contact-item">
          <FaWhatsapp />
          <div>
            <h4>WhatsApp</h4>
            <span>+51 902 824 286</span>
          </div>
        </div>

        <div className="contact-item">
          <FaMapMarkerAlt />
          <div>
            <h4>Ubicación</h4>
            <span>Lima, Perú</span>
          </div>
        </div>

        <div className="contact-item">
          <FaClock />
          <div>
            <h4>Horario</h4>
            <span>Lun - Sáb | 9:00 AM - 7:00 PM</span>
          </div>
        </div>

      </div>

      {/* Formulario */}

      <form className="contact-form">

        <div className="input-group">

          <div className="input-box">
            <label>Nombre</label>
            <input
              type="text"
              placeholder="Ingresa tu nombre"
            />
          </div>

          <div className="input-box">
            <label>Apellidos</label>
            <input
              type="text"
              placeholder="Ingresa tus apellidos"
            />
          </div>

        </div>

        <div className="input-box">
          <label>Celular</label>
          <input
            type="tel"
            placeholder="+51 999 999 999"
          />
        </div>

        <div className="input-group">

          <div className="input-box">
            <label>Departamento</label>
            <select>
              <option>Seleccionar</option>
            </select>
          </div>

          <div className="input-box">
            <label>Provincia</label>
            <select>
              <option>Seleccionar</option>
            </select>
          </div>

        </div>

        <div className="input-box">
          <label>Distrito</label>
          <select>
            <option>Seleccionar</option>
          </select>
        </div>

        <div className="input-box">
          <label>Mensaje</label>

          <textarea
            rows="6"
            placeholder="¿En qué podemos ayudarte?"
          />
        </div>

        <button type="submit">
          Enviar mensaje
        </button>

      </form>

    </section>
  );
}

export default ContactSection;