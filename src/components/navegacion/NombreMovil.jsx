import { usePerfil } from "../../context/PerfilContext";
import { useEsMovil } from "../../hooks/useEsMovil";
import { useNavigate } from "react-router-dom";
import avatargiraffe from "../../assets/image/Avatargiraffe.png";
import { navigateWithLeave } from "../../utils/navigation";

/**
 * Muestra el nombre del jugador en móvil (React + matchMedia).
 */
const NombreMovil = ({ className = "" }) => {
  const { perfil } = usePerfil();
  const esMovil = useEsMovil();
  const navigate = useNavigate();

  if (!esMovil) return null;

  const nombre = perfil?.username || "Jugador";
  const nivel = perfil?.level ?? 1;

  return (
    <div className={`nombre-movil ${className}`.trim()} aria-label={`Usuario ${nombre}`}>
      <img
        src={perfil?.avatar || avatargiraffe}
        alt=""
        className="nombre-movil__avatar"
        onClick={() => navigateWithLeave(navigate, "/perfil")}
      />
      <div className="nombre-movil__texto">
        <span className="nombre-movil__nombre">{nombre}</span>
        <span className="nombre-movil__nivel">Nivel {nivel}</span>
      </div>
    </div>
  );
};

export default NombreMovil;
