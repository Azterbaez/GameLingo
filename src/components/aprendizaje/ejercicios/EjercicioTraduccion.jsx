import { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { respuestaTraduccionValida } from "../../../utils/ejercicioUtils";
import AccionesEjercicio from "./AccionesEjercicio";

const EjercicioTraduccion = ({ ejercicio, onCorrecto }) => {
  const [respuesta, setRespuesta] = useState("");
  const [enviado, setEnviado] = useState(false);
  const esCorrecto = enviado && respuestaTraduccionValida(respuesta, ejercicio);

  const verificar = (e) => {
    e?.preventDefault();
    if (!respuesta.trim()) return;
    const ok = respuestaTraduccionValida(respuesta, ejercicio);
    setEnviado(true);
    if (ok) onCorrecto?.();
  };

  return (
    <div className="learn-exercise-block">
      {ejercicio.instruccion && (
        <p className="learn-exercise-prompt">{ejercicio.instruccion}</p>
      )}

      <div className="learn-translation-source">
        <span className="learn-translation-source__label">Español</span>
        <p className="mb-0 fw-semibold">{ejercicio.fraseEs}</p>
      </div>

      <Form onSubmit={verificar} className="mt-3">
        <Form.Label className="fw-semibold small text-muted">Tu respuesta en inglés</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          className="learn-input"
          value={respuesta}
          disabled={enviado && esCorrecto}
          onChange={(e) => setRespuesta(e.target.value)}
          placeholder="Escribe la traducción completa…"
        />
      </Form>

      {enviado && (
        <Alert variant={esCorrecto ? "success" : "warning"} className="learn-alert mt-3">
          {esCorrecto ? (
            "¡Excelente traducción!"
          ) : (
            <>
              Una respuesta posible: <em>{ejercicio.respuesta}</em>
              {ejercicio.pista && <div className="small mt-2">Pista: {ejercicio.pista}</div>}
            </>
          )}
        </Alert>
      )}

      <AccionesEjercicio
        puedeComprobar={Boolean(respuesta.trim())}
        enviado={enviado}
        esCorrecto={esCorrecto}
        onComprobar={verificar}
        onReintentar={() => {
          setRespuesta("");
          setEnviado(false);
        }}
      />
    </div>
  );
};

export default EjercicioTraduccion;
