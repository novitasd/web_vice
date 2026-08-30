import { useEffect, useState } from "react";
import {
    Link,
    useParams,
    useSearchParams,
    useNavigate,
} from "react-router-dom";

import ProductGrid from "../components/Catalogo/ProductGrid";
import BrandTabs from "../components/Product/BrandTabs/BrandTabs";

import { getProducts } from "../services/product.service";

import "./Catalogo.css";
import Loading from "../components/Loading/Loading";


function Catalogo() {

    const { calidad } = useParams();

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const brand = searchParams.get("brand");
    const search = searchParams.get("search");

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);





    // ==========================
    // CARGAR PRODUCTOS
    // ==========================

    useEffect(() => {

        async function cargarProductos() {

            try {

                setLoading(true);

                const qualityMap = {
                    g5: "G5",
                    importada: "IMPORTADA",
                    premium: "PREMIUM",
                };

                const quality = qualityMap[calidad];

                const response = await getProducts(
                    quality
                        ? { quality }
                        : {}
                );

                const productosActivos =
                    response.data.filter(
                        (producto) =>
                            producto.active === true
                    );

                setProductos(productosActivos);

            } catch (error) {

                console.error(
                    "Error cargando productos:",
                    error
                );

            } finally {

                setLoading(false);

            }

        }

        cargarProductos();

    }, [calidad]);


    // ==========================
    // FILTRAR PRODUCTOS
    // ==========================

    const productosFiltrados = productos.filter(
        (producto) => {

            // --------------------------
            // FILTRO POR MARCA
            // --------------------------

            if (brand) {

                const brandActual =
                    brand.toLowerCase().trim();

                const brandProducto =
                    producto.brand?.slug
                        ?.toLowerCase()
                        .trim() || "";

                if (
                    brandProducto !== brandActual
                ) {
                    return false;
                }

            }


            // --------------------------
            // FILTRO POR BÚSQUEDA
            // --------------------------

            if (search) {

                const termino =
                    search.toLowerCase().trim();

                const nombre =
                    producto.name?.toLowerCase() || "";

                const marca =
                    producto.brand?.name?.toLowerCase() || "";

                const marcaSlug =
                    producto.brand?.slug?.toLowerCase() || "";

                const categoriaProducto =
                    producto.category?.name?.toLowerCase() || "";

                const descripcion =
                    producto.description?.toLowerCase() || "";


                const coincide =
                    nombre.includes(termino) ||
                    marca.includes(termino) ||
                    marcaSlug.includes(termino) ||
                    categoriaProducto.includes(termino) ||
                    descripcion.includes(termino);


                if (!coincide) {
                    return false;
                }

            }

            return true;

        }
    );


    // ==========================
    // MARCAS
    // ==========================

    const marcas = [
        ...new Map(
            productos
                .filter((p) => p.brand)
                .map((p) => [
                    p.brand.id,
                    {
                        id: p.brand.id,
                        name: p.brand.name,
                        slug: p.brand.slug,
                    },
                ])
        ).values(),
    ];


    // ==========================
    // CAMBIAR MARCA
    // ==========================

    function handleBrandChange(slug) {

        const params =
            new URLSearchParams(searchParams);

        if (slug === "all") {
            params.delete("brand");
        } else {
            params.set("brand", slug);
        }

        const query = params.toString();

        navigate(
            calidad
                ? `/catalogo/${calidad}${query ? `?${query}` : ""}`
                : `/catalogo${query ? `?${query}` : ""}`
        );

    }


    // ==========================
    // LOADING
    // ==========================

    if (loading) {
        return <Loading />;
    }


    // ==========================
    // CATÁLOGO
    // ==========================

    return (

        <section className="catalogo">


            <BrandTabs
                brands={marcas}
                selectedBrand={brand || "all"}
                onSelect={handleBrandChange}
            />


            <main className="productos">


                {/* ==========================
                    RESULTADO DE BÚSQUEDA
                ========================== */}

                {search && (

                    <div className="catalogo-busqueda">

                        <span>
                            Resultados para:
                        </span>

                        <strong>
                            "{search}"
                        </strong>

                        <span>
                            {productosFiltrados.length}{" "}
                            {productosFiltrados.length === 1
                                ? "producto"
                                : "productos"}
                        </span>

                    </div>

                )}


                {/* ==========================
                    PRODUCTOS
                ========================== */}

                <ProductGrid
                    productos={productosFiltrados}
                />


                {/* ==========================
                    SIN PRODUCTOS
                ========================== */}

                {productosFiltrados.length === 0 && (

                    <div className="catalogo-vacio">

                        <h2>
                            No encontramos productos
                        </h2>

                        {search ? (

                            <p>
                                No encontramos resultados para{" "}
                                <strong>
                                    "{search}"
                                </strong>
                            </p>

                        ) : (

                            <p>
                                Actualmente no tenemos productos
                                disponibles con este filtro.
                            </p>

                        )}

                        <Link
                            to="/catalogo"
                            className="catalogo-vacio-btn"
                        >
                            Ver todos los productos
                        </Link>

                    </div>

                )}

            </main>

        </section>

    );

}

export default Catalogo;