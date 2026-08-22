import ProductCard from "./ProductCard";

function ProductGrid({ productos }) {
  return (
    <div className="grid">
      {productos.map((producto) => (
        <ProductCard
          key={producto.id}
          producto={producto}
        />
      ))}
    </div>
  );
}

export default ProductGrid;