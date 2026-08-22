// Tarifas provisionales de delivery TNIS.PE
// Se pueden ajustar posteriormente según cobertura del motorizado.

export const SHIPPING_ZONES = {
  near: {
    name: "Delivery Lima",
    price: 12,

    districts: [
      "LIMA",
      "BREÑA",
      "LA VICTORIA",
      "LINCE",
      "JESUS MARIA",
      "MAGDALENA DEL MAR",
      "PUEBLO LIBRE",
      "SAN MIGUEL",
      "SAN BORJA",
      "SAN ISIDRO",
      "MIRAFLORES",
    ],
  },

  far: {
    name: "Delivery Lima",
    price: 15,

    districts: [
      "ATE",
      "SANTA ANITA",
      "SAN JUAN DE LURIGANCHO",
      "SANTIAGO DE SURCO",
      "SAN MARTIN DE PORRES",
      "LOS OLIVOS",
      "INDEPENDENCIA",
      "COMAS",
      "CHORRILLOS",
      "SAN JUAN DE MIRAFLORES",
      "VILLA MARIA DEL TRIUNFO",
      "VILLA EL SALVADOR",
    ],
  },
};

export function getShippingMethod(shippingData) {
  const { department, province, district } = shippingData;

  // Todavía no completó la ubicación
  if (!department || !province || !district) {
    return null;
  }

  // ==========================================
  // FUERA DE LIMA METROPOLITANA
  // ==========================================

  if (
    department !== "LIMA" ||
    province !== "LIMA"
  ) {
    return {
      type: "shalom",
      name: "Envío por Shalom",
      price: 0,
      paymentAtDestination: true,
    };
  }

  // ==========================================
  // DELIVERY LIMA - ZONA CERCANA
  // ==========================================

  if (
    SHIPPING_ZONES.near.districts.includes(district)
  ) {
    return {
      type: "delivery",
      name: "Delivery a domicilio",
      price: SHIPPING_ZONES.near.price,
      paymentAtDestination: false,
    };
  }

  // ==========================================
  // DELIVERY LIMA - ZONA LEJANA
  // ==========================================

  if (
    SHIPPING_ZONES.far.districts.includes(district)
  ) {
    return {
      type: "delivery",
      name: "Delivery a domicilio",
      price: SHIPPING_ZONES.far.price,
      paymentAtDestination: false,
    };
  }

  // ==========================================
  // LIMA SIN COBERTURA DE DELIVERY
  // ==========================================

  return {
    type: "shalom",
    name: "Envío por Shalom",
    price: 0,
    paymentAtDestination: true,
  };
}