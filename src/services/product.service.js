import api from "../api/api";

export async function getProducts(params = {}) {
  const { data } = await api.get("/products", {
    params,
  });

  return data;
}

export async function getProductBySlug(slug) {
  const { data } = await api.get(`/products/${slug}`);
  return data;
}

export async function getProductById(id) {
  const { data } = await api.get(`/products/id/${id}`);
  return data;
}