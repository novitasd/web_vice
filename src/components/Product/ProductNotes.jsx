import {
  FaTruck,
  FaShieldAlt,
  FaCreditCard,
} from "react-icons/fa";
import "./ProductNotes.css";

function ProductNotes({ selectedStock }) {
  return (
    <div className="product-notes">

      {/* STOCK */}
      <div className="stock">
        <strong>Stock disponible</strong>

        {selectedStock !== null && (
          <p>
            {selectedStock > 0
              ? `${selectedStock} pares disponibles`
              : "Agotado"}
          </p>
        )}
      </div>

      {/* ENVÍO */}
      <div className="shipping">
        <FaTruck />

        <div>
          <strong>Entrega estimada</strong>
          <span> 1 - 3 días hábiles</span>
        </div>
      </div>

      {/* CAMBIOS */}
      <div className="returns">
        <FaShieldAlt />

        <div>
          <strong>Cambios y devoluciones</strong>
          <span> Hasta 1 día.</span>
        </div>
      </div>

      {/* PAGOS */}
      <div className="payments">
        <FaCreditCard />

        <div>
          <strong>Métodos de pago</strong>
          <span> Visa · Yape · Plin</span>
        </div>
      </div>

    </div>
  );
}

export default ProductNotes;