import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import "./CartStep.css";

function CartStep() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <section className="cart-step">

        <div className="cart-header">
          <h1>Bolsa de compras</h1>

          <Link
            to="/catalogo"
            className="cart-continue-link"
          >
            Sigue comprando
          </Link>
        </div>

        <div className="cart-empty">
          <h2>Tu bolsa está vacía</h2>

          <p>
            Explora nuestro catálogo y encuentra tu próximo par.
          </p>

          <Link
            to="/catalogo/g5"
            className="cart-empty-button"
          >
            Ver catálogo
          </Link>
        </div>

      </section>
    );
  }

  return (
    <section className="cart-step">

      {/* HEADER */}
      <div className="cart-header">

        <div>
          <h1>Bolsa de compras</h1>

        </div>

        <Link
          to="/catalogo"
          className="cart-continue-link"
        >
          Sigue comprando
        </Link>

      </div>

      {/* PRODUCTOS */}
      <div className="cart-products">

        {cart.map((item) => {

          const unitPrice = Number(item.product.price);

          return (
            <article
              key={`${item.productId}-${item.sizeId}`}
              className="cart-product"
            >

              {/* IMAGEN */}
              <div className="cart-product-image">

                <img
                  src={item.product.image}
                  alt={item.product.name}
                />

              </div>

              {/* INFORMACIÓN PRINCIPAL */}
              <div className="cart-product-info">

                <span className="cart-product-brand">
                  {item.product.brand}
                </span>

                <h2>
                  {item.product.name}
                </h2>

                <span className="cart-product-unit-price">
                  S/. {unitPrice.toFixed(2)}
                </span>

              </div>

              {/* OPCIONES */}
              <div className="cart-product-options">

                <div className="cart-option">

                  <span className="cart-option-label">
                    Talla
                  </span>

                  <strong>
                    {item.product.size}
                  </strong>

                </div>

                <div className="cart-option">

                  <span className="cart-option-label">
                    Cantidad
                  </span>

                  <div className="cart-quantity">

                    <button
                      type="button"
                      aria-label="Disminuir cantidad"
                      onClick={() =>
                        decreaseQuantity(
                          item.productId,
                          item.sizeId
                        )
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      aria-label="Aumentar cantidad"
                      onClick={() =>
                        increaseQuantity(
                          item.productId,
                          item.sizeId
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                </div>

              </div>

              {/* PRECIO + ELIMINAR */}
              <div className="cart-product-actions">

                <strong className="cart-product-total">
                  S/.{" "}
                  {(
                    unitPrice * item.quantity
                  ).toFixed(2)}
                </strong>

                <button
                  type="button"
                  className="cart-remove"
                  onClick={() =>
                    removeFromCart(
                      item.productId,
                      item.sizeId
                    )
                  }
                >
                  ×
                </button>

              </div>

            </article>
          );
        })}

      </div>

      {/* INFORMACIÓN INFERIOR */}
      <div className="cart-bottom-info">

        <h2>
          Haz tu compra ahora y decide con calma
        </h2>

        <p>
          Compra con confianza. Revisa nuestras políticas
          de cambios y devoluciones antes de finalizar tu pedido.
        </p>

      </div>

    </section>
  );
}

export default CartStep;