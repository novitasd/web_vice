import { FaHeart, FaWhatsapp } from "react-icons/fa";

import SizeSelector from "./SizeSelector/SizeSelector";
import ProductNotes from "./ProductNotes";

import "./ProductInfo.css";

function ProductInfo({
  product,
  selectedSize,
  setSelectedSize,
  selectedStock,
  setSelectedStock,
  availableStock,
  handleAddToCart,
  addedToCart,
}) {
  const WHATSAPP_NUMBER = "51902824286";

  // Verificar si el producto tiene una oferta válida
  const hasOffer =
    product.offerPrice &&
    Number(product.offerPrice) < Number(product.price);

  // Precio que realmente pagará el cliente
  const currentPrice = hasOffer
    ? product.offerPrice
    : product.price;

  const handleWhatsApp = () => {
    if (!selectedSize || availableStock <= 0) return;

    // Buscar la talla real usando el UUID seleccionado
    const selectedSizeData = product.sizes?.find(
      (size) => size.sizeId === selectedSize
    );

    const sizeName = selectedSizeData?.size || selectedSize;

    const message = `Hola, estoy interesado en realizar la compra de este producto:

${product.name}
${product.brand?.name || ""} · Talla ${sizeName}
S/ ${currentPrice}

¿Me podrían confirmar su disponibilidad?`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  return (
    <aside className="product-info">

      <button
        className="wishlist"
        type="button"
        aria-label="Agregar a favoritos"
      >
        <FaHeart />
      </button>

      <span className="brand">
        {product.brand?.name}
      </span>

      <h1>{product.name}</h1>

      <p className="subtitle">
        {product.category?.name}
      </p>

      {/* PRECIO */}
      <div className="price-container">
        {hasOffer ? (
          <>
            <span className="retail-price">
              S/. {product.price}
            </span>

            <div className="offer-price-row">
              <h2 className="offer-price">
                S/. {product.offerPrice}
              </h2>

              <span className="offer-label">
                OFERTA
              </span>
            </div>
          </>
        ) : (
          <h2 className="price">
            S/. {product.price}
          </h2>
        )}
      </div>

      <div className="info-group">
        <SizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          setSelectedStock={setSelectedStock}
        />
      </div>

      <button
        type="button"
        className="buy-btn"
        onClick={handleAddToCart}
        disabled={
          !addedToCart &&
          (!selectedSize || availableStock <= 0)
        }
      >
        {addedToCart
          ? "Ver carrito"
          : !selectedSize
            ? "Selecciona una talla"
            : availableStock <= 0
              ? "Agotado"
              : "Añadir al carrito"}
      </button>

      {/* BOTÓN WHATSAPP */}
      <button
        type="button"
        className="whatsapp-btns"
        onClick={handleWhatsApp}
        disabled={!selectedSize || availableStock <= 0}
      >
        <FaWhatsapp />
        Comprar ahora
      </button>

      <ProductNotes
        selectedStock={selectedStock}
      />

    </aside>
  );
}

export default ProductInfo;