import { useLocation, useNavigate } from "react-router-dom";
import { useEsMovil } from "../../hooks/useEsMovil";
import { LEARN_ROUTES } from "../../utils/constants";

const ENLACES = [
  { id: "inicio", ruta: "/inicio", icono: "bi-house-fill", etiqueta: "Inicio" },
  { id: "aprender", ruta: LEARN_ROUTES.niveles, icono: "bi-book-fill", etiqueta: "Aprender" },
  { id: "perfil", ruta: "/perfil", icono: "bi-person-fill", etiqueta: "Perfil" },
];

const BarraNavegacionMovil = () => {
  const esMovil = useEsMovil();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (!esMovil) return null;

  const activo = (ruta) => {
    if (ruta === "/inicio") return pathname === "/inicio";
    if (ruta.startsWith("/aprender")) return pathname.startsWith("/aprender");
    return pathname.startsWith(ruta);
  };

  return (
    <nav className="barra-nav-movil" aria-label="Navegación principal móvil">
      {ENLACES.map((enlace) => (
        <button
          key={enlace.id}
          type="button"
          className={`barra-nav-movil__item ${activo(enlace.ruta) ? "is-active" : ""}`}
          onClick={() => navigate(enlace.ruta)}
        >
          <i className={`bi ${enlace.icono}`} aria-hidden />
          <span>{enlace.etiqueta}</span>
        </button>
      ))}
    </nav>
  );
};

export default BarraNavegacionMovil;
