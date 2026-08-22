import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import Contacto from "./pages/Contacto";
import ProductPage from "./pages/ProductPage";

import Navbar from "./components/navbar/Navbar";
import Redes from "./components/Redes";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer";

import ScrollToTop from "./components/ScrollToTop";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
          style: {
            borderRadius: "14px",
            background: "#111",
            color: "#fff",
            padding: "14px 18px",
          },
        }}
      />

      <Redes />

      <Navbar />

      <Routes>

        {/* ==========================
            INICIO
        ========================== */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* ==========================
            CATÁLOGO GENERAL
        ========================== */}

        <Route
          path="/catalogo"
          element={<Catalogo />}
        />


        {/* ==========================
            CATÁLOGOS POR CALIDAD
        ========================== */}

        <Route
          path="/catalogo/:calidad"
          element={<Catalogo />}
        />


        {/* ==========================
            CHECKOUT
        ========================== */}

        <Route
          path="/checkout"
          element={<Checkout />}
        />


        {/* ==========================
            CONTACTO
        ========================== */}

        <Route
          path="/contacto"
          element={<Contacto />}
        />


        {/* ==========================
            PRODUCTO
        ========================== */}

        <Route
          path="/producto/:slug"
          element={<ProductPage />}
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;