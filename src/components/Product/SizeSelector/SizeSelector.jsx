import "./SizeSelector.css";

export default function SizeSelector({
  sizes,
  selectedSize,
  setSelectedSize,
  setSelectedStock,
}) {
  const handleSelect = (size) => {
    if (Number(size.stock) <= 0) return;

    setSelectedSize(size.sizeId);
    setSelectedStock(size.stock);
  };

  return (
    <div className="size-selector">

      <label className="size-label">
        Talla
      </label>

      <div className="size-grid">

        {sizes.map((size) => {

          const outOfStock = Number(size.stock) <= 0;

          return (
            <button
              key={size.id}
              type="button"
              disabled={outOfStock}
              onClick={() => handleSelect(size)}
              className={`size-item ${
                selectedSize === size.sizeId
                  ? "active"
                  : ""
              } ${
                outOfStock
                  ? "disabled"
                  : ""
              }`}
            >
              {size.size}
            </button>
          );

        })}

      </div>

    </div>
  );
}