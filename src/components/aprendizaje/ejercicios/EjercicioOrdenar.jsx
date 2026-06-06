import { useState } from "react";
import { Alert } from "react-bootstrap";
import { fraseOrdenadaValida, mezclarArray } from "../../../utils/ejercicioUtils";
import AccionesEjercicio from "./AccionesEjercicio";
import { notificarResultado } from "../../../utils/sonidos";

const EjercicioOrdenar = ({ ejercicio, onCorrecto }) => {
  const crearBanco = () =>
    mezclarArray(
      ejercicio.palabras.map((texto, indice) => ({
        id: `${ejercicio.id}-${indice}-${texto}`,
        texto,
      }))
    );

  const [banco, setBanco] = useState(() => crearBanco());
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [enviado, setEnviado] = useState(false);
  const [esCorrecto, setEsCorrecto] = useState(false);

  const construida = seleccionadas.map((p) => p.texto).join(" ");

  const elegirPalabra = (item) => {
    if (enviado) return;
    setSeleccionadas([...seleccionadas, item]);
    setBanco(banco.filter((p) => p.id !== item.id));
  };

  const quitarUltima = () => {
    if (enviado || seleccionadas.length === 0) return;
    const ultima = seleccionadas[seleccionadas.length - 1];
    setSeleccionadas(seleccionadas.slice(0, -1));
    setBanco([...banco, ultima]);
  };

  const reiniciar = () => {
    setBanco(crearBanco());
    setSeleccionadas([]);
    setEnviado(false);
    setEsCorrecto(false);
  };

  const verificar = async () => {
    if (seleccionadas.length !== ejercicio.palabras.length) return;
    const ok = fraseOrdenadaValida(construida, ejercicio);
    setEnviado(true);
    setEsCorrecto(ok);
    await notificarResultado(ok, onCorrecto);
  };

  return (
    <div className="learn-exercise-block">
      {ejercicio.instruccion && (
        <p className="learn-exercise-prompt">{ejercicio.instruccion}</p>
      )}

      <div className="learn-order-built" aria-live="polite">
        {seleccionadas.length === 0 ? (
          <span className="learn-order-built__placeholder">
            Toca las palabras en orden…
          </span>
        ) : (
          seleccionadas.map((p, i) => (
            <span key={`${p.texto}-${i}`} className="learn-chip learn-chip--selected">
              {p.texto}
            </span>
          ))
        )}
      </div>

      {seleccionadas.length > 0 && !enviado && (
        <button type="button" className="learn-link-btn mb-3" onClick={quitarUltima}>
          ← Quitar última palabra
        </button>
      )}

      <div className="learn-order-bank">
        {banco.map((item) => (
          <button
            key={item.id}
            type="button"
            className="learn-chip"
            disabled={enviado}
            onClick={() => elegirPalabra(item)}
          >
            {item.texto}
          </button>
        ))}
      </div>

      {enviado && (
        <Alert variant={esCorrecto ? "success" : "warning"} className="learn-alert">
          {esCorrecto ? (
            <>
              <strong>¡Perfecto!</strong> Frase correcta.
            </>
          ) : (
            <>
              Revisa el orden. Una solución válida:{" "}
              <em>
                {ejercicio.fraseCorrectaAlternativa?.[0] ?? ejercicio.fraseCorrecta}
              </em>
            </>
          )}
        </Alert>
      )}

      <AccionesEjercicio
        puedeComprobar={seleccionadas.length === ejercicio.palabras.length}
        enviado={enviado}
        esCorrecto={esCorrecto}
        onComprobar={verificar}
        onReintentar={reiniciar}
      />
    </div>
  );
};

export default EjercicioOrdenar;
