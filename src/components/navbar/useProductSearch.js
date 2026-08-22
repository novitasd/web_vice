import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProducts } from "../../services/product.service";

export function useProductSearch() {
  const [searchOpen, setSearchOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const texto = search.trim();

    if (!texto) {
      setResults([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const response = await getProducts({
          search: texto,
          limit: 5,
          active: true,
        });

        setResults(response.data ?? []);
      } catch (error) {
        console.error(
          "Error buscando productos:",
          error
        );

        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const buscarEnCatalogo = () => {
    const texto = search.trim();

    if (!texto) return;

    navigate(
      `/catalogo?search=${encodeURIComponent(texto)}`
    );

    setResults([]);
    setSearchOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      buscarEnCatalogo();
    }

    if (event.key === "Escape") {
      setSearchOpen(false);
    }
  };

  const cerrarBusqueda = () => {
    setSearch("");
    setResults([]);
    setSearchOpen(false);
  };

  return {
    search,
    setSearch,
    results,
    loading,
    searchOpen,
    setSearchOpen,
    searchRef,
    buscarEnCatalogo,
    handleKeyDown,
    cerrarBusqueda,
  };
}