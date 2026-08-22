import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import "./ProductGallery.css";

function ProductGallery({
  images,
  selectedImage,
  setSelectedImage,
  productName,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="product-left">

      {/* Desktop */}
      <div className="product-gallery desktop-gallery">

        <div className="gallery-thumbnails">
          {images?.map((image) => (
            <button
              key={image.id}
              type="button"
              className={`thumbnail ${
                selectedImage === image.url ? "active" : ""
              }`}
              onClick={() => setSelectedImage(image.url)}
            >
              <img
                src={image.url}
                alt={productName}
              />
            </button>
          ))}
        </div>

        <div className="gallery-main">
          {selectedImage && (
            <img
              className="main-image"
              src={selectedImage}
              alt={productName}
            />
          )}
        </div>

      </div>

      {/* Mobile */}
      <div className="mobile-gallery">

        <div className="embla" ref={emblaRef}>
          <div className="embla__container">

            {images?.map((image) => (
              <div
                className="embla__slide"
                key={image.id}
              >
                <img
                  src={image.url}
                  alt={productName}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}

          </div>
        </div>

        {/* Indicadores */}
        {images?.length > 1 && (
          <div className="embla-dots">

            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`embla-dot ${
                  index === selectedIndex ? "active" : ""
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Imagen ${index + 1}`}
              />
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default ProductGallery;