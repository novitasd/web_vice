import "./ProductExtra.css";

function ProductExtra({ product }) {
  return (
    <section className="product-extra">

      {/* DESCRIPCIÓN */}
      <section className="product-description">
        <h2>Descripción</h2>

        <p>
          {product.description ||
            "Este producto no tiene descripción."}
        </p>
      </section>


    </section>
  );
}

export default ProductExtra;