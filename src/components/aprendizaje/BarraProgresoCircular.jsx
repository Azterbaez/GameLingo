const BarraProgresoCircular = ({ porcentaje, etiqueta, tamano = "sm" }) => {
  const p = Math.min(100, Math.max(0, porcentaje));
  const esSm = tamano === "sm";
  const size = esSm ? 56 : 88;
  const radio = esSm ? 22 : 36;
  const circ = 2 * Math.PI * radio;
  const offset = circ - (p / 100) * circ;
  const center = size / 2;

  return (
    <div
      className={`learn-progress-ring ${esSm ? "learn-progress-ring--sm" : ""}`}
      title={`${p}%`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
        <circle
          className="learn-progress-ring__bg"
          cx={center}
          cy={center}
          r={radio}
        />
        <circle
          className="learn-progress-ring__fill"
          cx={center}
          cy={center}
          r={radio}
          strokeDasharray={circ}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="learn-progress-ring__text">
        <strong>{p}%</strong>
        {etiqueta && <small>{etiqueta}</small>}
      </div>
    </div>
  );
};

export default BarraProgresoCircular;
