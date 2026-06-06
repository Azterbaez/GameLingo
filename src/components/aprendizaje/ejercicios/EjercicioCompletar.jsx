import { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { normalizarTexto } from "../../../utils/ejercicioUtils";
import AccionesEjercicio from "./AccionesEjercicio";
import { notificarResultado } from "../../../utils/sonidos";

const EjercicioCompletar = ({ ejercicio, onCorrecto }) => {
  const [respuesta, setRespuesta] = useState("");
  const [enviado, setEnviado] = useState(false);

  const esCorrecto =
    enviado && normalizarTexto(respuesta) === normalizarTexto(ejercicio.respuesta);

  const verificar = async (e) => {
    e?.preventDefault();
    if (!respuesta.trim()) return;
    const ok = normalizarTexto(respuesta) === normalizarTexto(ejercicio.respuesta);
    setEnviado(true);
    await notificarResultado(ok, onCorrecto);
  };

  const partes = ejercicio.frase.split("___");

  return (
    <div className="learn-exercise-block">
      <p className="learn-frase-completar mb-4">
        {partes[0]}
        <Form.Control
          type="text"
          className="learn-input d-inline-block mx-2"
          style={{ width: "140px", display: "inline-block" }}
          value={respuesta}
          disabled={enviado && esCorrecto}
          onChange={(e) => setRespuesta(e.target.value)}
          aria-label="Respuesta"
        />
        {partes[1] ?? ""}
      </p>

      {enviado && (
        <Alert variant={esCorrecto ? "success" : "warning"} className="learn-alert">
          {esCorrecto
            ? "¡Correcto!"
            : `La respuesta correcta es: «${ejercicio.respuesta}»`}
          {ejercicio.pista && !esCorrecto && (
            <div className="small mt-1">Pista: {ejercicio.pista}</div>
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

export default EjercicioCompletar;
