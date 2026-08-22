import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails";

function ProductPage() {
  const { slug } = useParams();

  return (
    <main className="product-page">
      <ProductDetails slug={slug} />
    </main>
  );
}

export default ProductPage;