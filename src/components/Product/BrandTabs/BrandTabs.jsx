import "./BrandTabs.css";

function BrandTabs({ brands = [], selectedBrand, onSelect }) {
  return (
    <section className="brand-tabs">
      <div className="brand-tabs-nav">
        <button
          className={selectedBrand === "all" ? "active" : ""}
          onClick={() => onSelect("all")}
        >
          Todas
        </button>

        {brands.map((brand) => (
          <button
            key={brand.id}
            className={selectedBrand === brand.slug ? "active" : ""}
            onClick={() => onSelect(brand.slug)}
          >
            {brand.name}
          </button>
        ))}
      </div>
    </section>
  );
}

export default BrandTabs;