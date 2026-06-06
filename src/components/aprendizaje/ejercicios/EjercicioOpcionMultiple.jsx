import { useState } from "react";
import { Alert } from "react-bootstrap";
import AccionesEjercicio from "./AccionesEjercicio";
import { notificarResultado } from "../../../utils/sonidos";

const EjercicioOpcionMultiple = ({ ejercicio, onCorrecto }) => {
  const [seleccion, setSeleccion] = useState(null);
  const [enviado, setEnviado] = useState(false);

  const esCorrecto = seleccion === ejercicio.respuestaCorrecta;

  const verificar = async () => {
    if (seleccion === null) return;
    const ok = seleccion === ejercicio.respuestaCorrecta;
    setEnviado(true);
    await notificarResultado(ok, onCorrecto);
  };

  return (
    <div className="learn-exercise-block">
      <p className="learn-exercise-prompt">{ejercicio.pregunta}</p>
      <div className="d-flex flex-column gap-2 mb-3">
        {ejercicio.opciones.map((opcion, indice) => {
          let clase = "learn-option-btn";
          if (enviado && indice === ejercicio.respuestaCorrecta) {
            clase += " is-correct";
          } else if (enviado && indice === seleccion && !esCorrecto) {
            clase += " is-wrong";
          } else if (!enviado && indice === seleccion) {
            clase += " is-selected";
          }

          return (
            <button
              key={opcion}
              type="button"
              className={clase}
              disabled={enviado}
              onClick={() => setSeleccion(indice)}
            >
              {opcion}
            </button>
          );
        })}
      </div>

      {enviado && (
        <Alert variant={esCorrecto ? "success" : "warning"} className="learn-alert">
          {esCorrecto
            ? "¡Correcto! Muy bien."
            : `Casi. La respuesta correcta es: ${ejercicio.opciones[ejercicio.respuestaCorrecta]}`}
          {ejercicio.pista && !esCorrecto && (
            <div className="small mt-1">Pista: {ejercicio.pista}</div>
          )}
        </Alert>
      )}

      <AccionesEjercicio
        puedeComprobar={seleccion !== null}
        enviado={enviado}
        esCorrecto={esCorrecto}
        onComprobar={verificar}
        onReintentar={() => {
          setSeleccion(null);
          setEnviado(false);
        }}
      />
    </div>
  );
};

export default EjercicioOpcionMultiple;
