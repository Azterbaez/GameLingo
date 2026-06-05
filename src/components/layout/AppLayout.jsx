import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Encabezado from "../navegacion/Encabezado";
import SubheaderNiveles from "../navegacion/SubheaderNiveles";

const AppLayout = () => {
  const [mostrarSubir, setMostrarSubir] = useState(false);

  useEffect(() => {
    const onScroll = () => setMostrarSubir(window.scrollY > 280);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const irArriba = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-layout-learn app-layout-learn--con-nav-movil">
      <Encabezado modoAprendizaje />
      <SubheaderNiveles />
      <main className="learn-main" id="learn-main-content">
        <Outlet />
      </main>
      <button
        type="button"
        className={`learn-scroll-top ${mostrarSubir ? "is-visible" : ""}`}
        onClick={irArriba}
        aria-label="Volver arriba"
      >
        <i className="bi bi-chevron-up" />
      </button>
    </div>
  );
};

export default AppLayout;
