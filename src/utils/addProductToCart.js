import toast from "react-hot-toast";

export function addProductToCart({
  product,
  selectedSize,
  selectedImage,
  cart,
  addToCart,
}) {
  if (!selectedSize) {
    toast.error("Selecciona una talla.");
    return;
  }

  const selectedSizeData = product.sizes.find(
    (item) => item.sizeId === selectedSize
  );

  if (!selectedSizeData) {
    toast.error("Talla no encontrada.");
    return;
  }

  const cartItem = cart.find(
    (item) =>
      item.productId === product.id &&
      item.sizeId === selectedSizeData.sizeId
  );

  const quantityInCart = cartItem?.quantity ?? 0;

  const stock = Number(selectedSizeData.stock);

  const available = stock - quantityInCart;

  if (available <= 0) {
    toast.error(
      "Ya agregaste todo el stock disponible de esta talla."
    );
    return;
  }

  addToCart({
    productId: product.id,
    sizeId: selectedSizeData.sizeId,
    quantity: 1,
    stock,
    product: {
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: Number(product.price),
      image: selectedImage,
      brand: product.brand?.name,
      size: selectedSizeData.size,
    },
  });

  toast.success("Producto agregado al carrito.");
}