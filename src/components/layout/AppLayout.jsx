import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AnimatedView from "../animations/AnimatedView";
import Encabezado from "../navegacion/Encabezado";
import SubheaderNiveles from "../navegacion/SubheaderNiveles";
import { usePageTransition } from "../../hooks/usePageTransition";

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

  const { animKey, direction, duration, staggerClass } = usePageTransition();

  return (
    <div className="app-layout-learn app-layout-learn--con-nav-movil">
      <Encabezado modoAprendizaje />
      <SubheaderNiveles />
      <main className="learn-main" id="learn-main-content">
        <AnimatedView
          animKey={animKey}
          variant="pageReveal"
          direction={direction}
          duration={duration}
          className={staggerClass}
          data-route-anim
        >
          <Outlet />
        </AnimatedView>
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
