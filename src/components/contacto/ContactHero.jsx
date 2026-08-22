import "./ContactHero.css";
import imgs from "../../assets/categorias/contacto.png"
function ContactHero() {
  return (
    <section className="contact-hero">

      <div className="contact-content">

        <span className="contact-tag">
          CONTACTO
        </span>

        <h1>
          ESTAMOS AQUÍ
          <br />
          PARA AYUDARTE.
        </h1>

        <p>
          ¿Tienes dudas sobre un pedido, una talla o alguno de
          nuestros modelos? Nuestro equipo estará encantado de ayudarte.
        </p>

        <div className="contact-buttons">

          <button className="btn-primary">
            Escríbenos por WhatsApp
          </button>

          <button className="btn-secondary">
            Ver catálogo
          </button>

        </div>

      </div>

      <div className="contact-image">

        <img
          src={imgs}
          alt="jordan"
        />

      </div>

    </section>
  );
}

export default ContactHero;