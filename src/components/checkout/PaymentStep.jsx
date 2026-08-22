import { useState } from "react";

import "./PaymentStep.css";

import { useCart } from "../../context/CartContext";
import { createOrder } from "../../services/order.service";

function PaymentStep({
  onBack,
  shippingData,
  shippingMethod,
}) {
  const { cart, clearCart } = useCart();

  const [loading, setLoading] = useState(false);

  const handleCreateOrder = async () => {
    try {
      setLoading(true);

      const order = await createOrder({
        shippingData,
        cart,
      });

     console.log("Respuesta del backend:", order);

clearCart();

alert("Pedido creado correctamente.");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "No se pudo crear el pedido."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="payment-step">

      {/* ENCABEZADO */}

      <div className="payment-heading">

        <button
          type="button"
          className="payment-back"
          onClick={onBack}
        >
          ← Volver
        </button>

        <h1>Pago</h1>

        <p>
          Revisa los datos de entrega antes de realizar el pago.
        </p>

      </div>

      {/* DIRECCIÓN */}

      <div className="payment-section">

        <div className="payment-section-header">

          <h2>Dirección de entrega</h2>

          <button
            type="button"
            className="payment-edit"
            onClick={onBack}
          >
            Editar
          </button>

        </div>

        <div className="payment-address">

          <strong>
            {shippingData.name} {shippingData.lastName}
          </strong>

          <p>{shippingData.address}</p>

          {shippingData.reference && (
            <p>
              Ref. {shippingData.reference}
            </p>
          )}

          <p>
            {shippingData.district},{" "}
            {shippingData.province},{" "}
            {shippingData.department}
          </p>

          <p>
            +51 {shippingData.phone}
          </p>

        </div>

      </div>

      {/* MÉTODO DE ENTREGA */}

      <div className="payment-section">

        <h2>Entrega</h2>

        {shippingMethod?.type === "delivery" && (
          <div className="payment-delivery">

            <div>

              <strong>
                Delivery a domicilio
              </strong>

              <p>
                Entrega en la dirección indicada.
              </p>

            </div>

            <strong>
              S/. {Number(shippingMethod.price).toFixed(2)}
            </strong>

          </div>
        )}

        {shippingMethod?.type === "shalom" && (
          <div className="payment-delivery">

            <div>

              <strong>
                Envío por Shalom
              </strong>

              <p>
                El costo del envío se paga al recoger
                el pedido en la agencia.
              </p>

            </div>

            <strong>
              Pago en destino
            </strong>

          </div>
        )}

      </div>

      {/* MÉTODO DE PAGO */}

      <div className="payment-section">

        <h2>Método de pago</h2>

        <div className="payment-placeholder">

          <p>
            Elige cómo deseas pagar tu pedido.
          </p>

          <div className="payment-method">

            <div>

              <strong>
                Pago online
              </strong>

              <span>
                Tarjeta, Yape y otros métodos disponibles.
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* CONFIRMAR PEDIDO */}

      <button
        type="button"
        className="payment-confirm"
        onClick={handleCreateOrder}
        disabled={loading || cart.length === 0}
      >
        {loading
          ? "Procesando..."
          : "Confirmar pedido"}
      </button>

    </section>
  );
}

export default PaymentStep;