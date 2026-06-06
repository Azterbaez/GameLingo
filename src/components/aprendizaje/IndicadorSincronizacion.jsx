import { useProgresoAprendizaje } from "../../hooks/useProgresoAprendizaje";
import { useAuth } from "../../context/AuthContext";

const IndicadorSincronizacion = () => {
  const { user } = useAuth();
  const { cargando, sincronizado } = useProgresoAprendizaje();

  if (!user) return null;

  if (cargando) {
    return (
      <span className="learn-sync-pill learn-sync-pill--loading" title="Sincronizando progreso">
        <i className="bi bi-cloud-arrow-down" />
        <span className="d-none d-sm-inline">Sincronizando…</span>
      </span>
    );
  }

  if (sincronizado) {
    return (
      <span className="learn-sync-pill learn-sync-pill--ok" title="Progreso guardado en la nube">
        <i className="bi bi-cloud-check-fill" />
        <span className="d-none d-sm-inline">Sincronizado</span>
      </span>
    );
  }

  return (
    <span className="learn-sync-pill learn-sync-pill--local" title="Solo en este dispositivo">
      <i className="bi bi-phone" />
      <span className="d-none d-sm-inline">Local</span>
    </span>
  );
};

export default IndicadorSincronizacion;
