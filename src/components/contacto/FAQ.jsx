import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./FAQ.css";

const faqs = [
  {
    question: "¿Los productos son originales?",
    answer:
      "Sí. Todos nuestros productos son cuidadosamente seleccionados y cumplen con nuestros estándares de calidad.",
  },
  {
    question: "¿Realizan envíos a todo el Perú?",
    answer:
      "Sí. Realizamos envíos a nivel nacional mediante empresas de transporte seguras y confiables.",
  },
  {
    question: "¿Cuánto demora el envío?",
    answer:
      "El tiempo de entrega depende de tu ubicación. Generalmente los pedidos llegan entre 24 y 72 horas hábiles.",
  },
  {
    question: "¿Puedo cambiar la talla de mis zapatillas?",
    answer:
      "Sí. Si el producto cumple con nuestras políticas de cambio, podrás solicitar el cambio de talla.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos Yape, Plin, transferencias bancarias y próximamente pagos con tarjeta.",
  },
];

function FAQ() {
  const [active, setActive] = useState(null);

  const toggleFAQ = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="faq">

      <div className="faq-header">

        <span>PREGUNTAS FRECUENTES</span>

        <h2>
          Resolvemos tus dudas
          <br />
          antes de tu compra.
        </h2>

      </div>

      <div className="faq-container">

        {faqs.map((faq, index) => (

          <div
            className={`faq-item ${active === index ? "active" : ""}`}
            key={index}
          >

            <button
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >

              <span>{faq.question}</span>

              {active === index ? (
                <FaMinus />
              ) : (
                <FaPlus />
              )}

            </button>

            <div className="faq-answer">

              <p>{faq.answer}</p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default FAQ;