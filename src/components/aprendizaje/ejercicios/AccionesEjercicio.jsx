import { Button } from "react-bootstrap";

const AccionesEjercicio = ({
  puedeComprobar,
  enviado,
  esCorrecto,
  onComprobar,
  onReintentar,
  etiquetaComprobar = "Comprobar",
}) => (
  <div className="learn-exercise-actions">
    {!enviado ? (
      <Button
        className="learn-btn learn-btn--primary"
        onClick={onComprobar}
        disabled={!puedeComprobar}
      >
        <i className="bi bi-check2-circle me-2" aria-hidden />
        {etiquetaComprobar}
      </Button>
    ) : (
      !esCorrecto && (
        <Button className="learn-btn learn-btn--ghost" onClick={onReintentar}>
          <i className="bi bi-arrow-counterclockwise me-2" aria-hidden />
          Intentar de nuevo
        </Button>
      )
    )}
  </div>
);

export default AccionesEjercicio;
