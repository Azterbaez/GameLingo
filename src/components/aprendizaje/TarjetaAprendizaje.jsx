const TarjetaAprendizaje = ({
  titulo,
  descripcion,
  icono = "bi-book",
  color = "#2563eb",
  badge,
  progreso,
  onClick,
  deshabilitado = false,
}) => {
  return (
    <article
      className={`card tarjeta-aprendizaje h-100 ${deshabilitado ? "tarjeta-aprendizaje--deshabilitada" : ""}`}
      style={{ "--card-accent": color }}
      onClick={deshabilitado ? undefined : onClick}
      role={deshabilitado ? undefined : "button"}
      tabIndex={deshabilitado ? -1 : 0}
      onKeyDown={(e) => {
        if (!deshabilitado && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="card-body d-flex flex-column">
        <div className="d-flex align-items-start gap-3 mb-2">
          <span
            className="tarjeta-aprendizaje__icono"
            style={{ background: `${color}18`, color }}
            aria-hidden
          >
            <i className={`bi ${icono}`} />
          </span>
          <div className="flex-grow-1">
            <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
              <h3 className="card-title h5 mb-0">{titulo}</h3>
              {badge && <span className="learn-badge learn-badge--intermedio">{badge}</span>}
            </div>
            {descripcion && (
              <p className="text-muted small mb-0">{descripcion}</p>
            )}
          </div>
          {!deshabilitado && (
            <i className="bi bi-arrow-right-circle text-warning fs-4" aria-hidden />
          )}
        </div>
        {typeof progreso === "number" && progreso >= 0 && (
          <div className="mt-auto pt-3">
            <div className="d-flex justify-content-between small text-muted mb-1">
              <span>Progreso</span>
              <span>{progreso}%</span>
            </div>
            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: `${progreso}%` }}
                role="progressbar"
                aria-valuenow={progreso}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default TarjetaAprendizaje;
