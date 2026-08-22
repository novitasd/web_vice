import { useCart } from "../../context/CartContext";
import "./OrderSummary.css";

function OrderSummary({
  step,
  onContinue,
  shippingMethod,
}) {
  const { cart } = useCart();

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + Number(item.product.price) * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // ==========================================
  // ENVÍO
  // ==========================================

  const shipping =
    shippingMethod?.type === "delivery"
      ? Number(shippingMethod.price)
      : 0;

  const total = subtotal + shipping;

  // ==========================================
  // COMPRAR POR WHATSAPP
  // ==========================================

  const handleWhatsApp = () => {
    if (cart.length === 0) return;

    const phone = "51902824286"

    let message =
      ` *NUEVO PEDIDO -SAMU.PE*\n\n` +
      `Hola, quiero consultar por los siguientes productos:\n\n`;

    cart.forEach((item) => {
      const price = Number(item.product.price);
      const itemSubtotal = price * item.quantity;

      message += `━━━━━━━━━━━━━━━━━━\n\n`;

      message += ` *${item.product.name}*\n\n`;

      message += `› Marca: ${item.product.brand}\n`;
      message += `› Talla: ${item.product.size}\n`;
      message += `› Cantidad: ${item.quantity}\n`;
      message += `› Precio: S/. ${price.toFixed(2)}\n\n`;

      message += `*Subtotal: S/. ${itemSubtotal.toFixed(2)}*\n\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━\n\n`;

    message += `*TOTAL: S/. ${subtotal.toFixed(2)}*\n\n`;

    message +=
      `Quisiera confirmar disponibilidad y coordinar la compra.`;

    const encodedMessage = encodeURIComponent(message);

    const whatsappUrl =
      `https://wa.me/${phone}?text=${encodedMessage}`;

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="order-summary">

      <h2 className="summary-title">
        Resumen
      </h2>

      {/* SUBTOTAL */}

      <div className="summary-row">

        <span>
          Subtotal

          {totalItems > 0 && (
            <small>
              {" "}
              ({totalItems}{" "}
              {totalItems === 1
                ? "producto"
                : "productos"})
            </small>
          )}

        </span>

        <span>
          S/. {subtotal.toFixed(2)}
        </span>

      </div>

      {/* ENVÍO */}

      <div className="summary-row">

        <span>
          {shippingMethod?.type === "shalom"
            ? "Envío Shalom"
            : "Entrega"}
        </span>

        <span className="summary-shipping">

          {!shippingMethod && (
            "Por calcular"
          )}

          {shippingMethod?.type === "delivery" && (
            `S/. ${shipping.toFixed(2)}`
          )}

          {shippingMethod?.type === "shalom" && (
            "Pago en destino"
          )}

        </span>

      </div>

      <div className="summary-divider" />

      {/* TOTAL */}

      <div className="summary-row summary-total">

        <strong>Total</strong>

        <strong>
          S/. {total.toFixed(2)}
        </strong>

      </div>

      {/* CHECKOUT NORMAL */}

        {step === 1 && (
  <button
    type="button"
    className="summary-button summary-button-disabled"
    disabled
  >
    <span className="summary-disabled-text">
      Comprar por web
    </span>

    <small>Próximamente</small>
  </button>
)}

{step === 2 && (
<button
  type="button"
  className="summary-button summary-button-disabled"
  disabled
>
  Comprar por web

  <span className="summary-soon">
    Próximamente
  </span>
</button>
)}

      {/* WHATSAPP SOLO EN EL CARRITO */}

      {step === 1 && (
        <>

          <div className="summary-or">
            <span>o</span>
          </div>

          <button
            type="button"
            className="summary-whatsapp"
            onClick={handleWhatsApp}
            disabled={cart.length === 0}
          >
            Comprar por WhatsApp
          </button>

        </>
      )}

      {/* INFORMACIÓN DE ENVÍO */}

      <div className="summary-info">

        {!shippingMethod && (
          <p>
            Los costos de envío se calcularán
            según tu dirección de entrega.
          </p>
        )}

        {shippingMethod?.type === "delivery" && (
          <p>
            Delivery a domicilio según tu
            distrito seleccionado.
          </p>
        )}

        {shippingMethod?.type === "shalom" && (
          <p>
            El costo de envío se paga directamente
            a Shalom al recoger tu pedido.
          </p>
        )}

      </div>

    </div>
  );
}

export default OrderSummary;