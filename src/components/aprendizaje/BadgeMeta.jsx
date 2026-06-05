import { infoDificultad, iconoTipoEjercicio, etiquetaTipoEjercicio } from "../../utils/ejercicioUtils";

export function BadgeDificultad({ dificultad = "basico" }) {
  const info = infoDificultad(dificultad);
  return <span className={`learn-badge ${info.clase}`}>{info.etiqueta}</span>;
}

export function BadgeTipo({ tipo }) {
  return (
    <span className="learn-badge learn-badge--tipo">
      <i className={`bi ${iconoTipoEjercicio(tipo)} me-1`} aria-hidden />
      {etiquetaTipoEjercicio(tipo)}
    </span>
  );
}
