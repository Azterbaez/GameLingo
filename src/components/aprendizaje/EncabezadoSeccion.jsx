const EncabezadoSeccion = ({
  volver,
  onVolver,
  titulo,
  descripcion,
  children,
  compacto = true,
}) => {
  return (
    <header
      className={`learn-section-header ${compacto ? "learn-section-header--compact" : ""}`}
    >
      <div className="learn-section-header__row">
        <div className="learn-section-header__main">
          {volver && (
            <button type="button" className="learn-back-btn" onClick={onVolver}>
              <i className="bi bi-arrow-left" aria-hidden />
              <span>{volver}</span>
            </button>
          )}
          <h1 className="learn-section-header__title">{titulo}</h1>
          {descripcion && (
            <p className="learn-section-header__desc">{descripcion}</p>
          )}
        </div>
        {children && (
          <div className="learn-section-header__aside">{children}</div>
        )}
      </div>
    </header>
  );
};

export default EncabezadoSeccion;
