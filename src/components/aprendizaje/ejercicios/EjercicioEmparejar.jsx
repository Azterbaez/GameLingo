import { useMemo, useState } from "react";
import { Button, Alert, Row, Col } from "react-bootstrap";

function mezclar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

const EjercicioEmparejar = ({ ejercicio, onCorrecto }) => {
  const pares = ejercicio.pares;

  const columnas = useMemo(() => {
    const izq = mezclar(pares.map((p, i) => ({ id: `en-${i}`, texto: p.en, par: i })));
    const der = mezclar(pares.map((p, i) => ({ id: `es-${i}`, texto: p.es, par: i })));
    return { izq, der };
  }, [pares]);

  const [seleccionIzq, setSeleccionIzq] = useState(null);
  const [emparejados, setEmparejados] = useState({});
  const [incorrecto, setIncorrecto] = useState(false);
  const [completado, setCompletado] = useState(false);

  const total = pares.length;
  const hechos = Object.keys(emparejados).length / 2;

  const elegirIzq = (item) => {
    if (completado || emparejados[item.id]) return;
    setSeleccionIzq(item);
    setIncorrecto(false);
  };

  const elegirDer = (item) => {
    if (completado || !seleccionIzq || emparejados[item.id]) return;

    if (seleccionIzq.par === item.par) {
      const nuevo = {
        ...emparejados,
        [seleccionIzq.id]: true,
        [item.id]: true,
      };
      setEmparejados(nuevo);
      setSeleccionIzq(null);
      if (Object.keys(nuevo).length === total * 2) {
        setCompletado(true);
        onCorrecto?.();
      }
    } else {
      setIncorrecto(true);
      setSeleccionIzq(null);
    }
  };

  const reiniciar = () => {
    setSeleccionIzq(null);
    setEmparejados({});
    setIncorrecto(false);
    setCompletado(false);
  };

  const claseItem = (item, lado) => {
    const base = "ejercicio-emparejar__item";
    if (emparejados[item.id]) return `${base} ${base}--hecho`;
    if (lado === "izq" && seleccionIzq?.id === item.id) return `${base} ${base}--activo`;
    return base;
  };

  return (
    <div className="learn-exercise-block">
      <p className="learn-exercise-prompt">{ejercicio.instruccion}</p>
      <p className="small text-secondary mb-3">
        Progreso: {hechos} de {total} pares
      </p>

      <Row className="g-3 mb-3 learn-match-cols">
        <Col md={6}>
          <h6>Inglés</h6>
          <div className="d-flex flex-column gap-2">
            {columnas.izq.map((item) => (
              <button
                key={item.id}
                type="button"
                className={claseItem(item, "izq")}
                disabled={Boolean(emparejados[item.id]) || completado}
                onClick={() => elegirIzq(item)}
              >
                {item.texto}
              </button>
            ))}
          </div>
        </Col>
        <Col md={6}>
          <h6>Español</h6>
          <div className="d-flex flex-column gap-2">
            {columnas.der.map((item) => (
              <button
                key={item.id}
                type="button"
                className={claseItem(item, "der")}
                disabled={Boolean(emparejados[item.id]) || completado}
                onClick={() => elegirDer(item)}
              >
                {item.texto}
              </button>
            ))}
          </div>
        </Col>
      </Row>

      {incorrecto && (
        <Alert variant="warning" className="py-2">
          Ese par no coincide. Prueba otra combinación.
        </Alert>
      )}

      {completado && (
        <Alert variant="success">¡Excelente! Completaste todos los pares.</Alert>
      )}

      {!completado && hechos > 0 && (
        <Button variant="outline-secondary" size="sm" onClick={reiniciar}>
          Reiniciar ejercicio
        </Button>
      )}
    </div>
  );
};

export default EjercicioEmparejar;
