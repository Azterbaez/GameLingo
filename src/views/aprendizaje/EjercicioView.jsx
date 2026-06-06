import { useParams, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { obtenerEjercicio, obtenerTema } from "../../data/cursosIngles";
import { LEARN_ROUTES } from "../../utils/constants";
import { useProgresoAprendizaje } from "../../hooks/useProgresoAprendizaje";
import { BadgeDificultad, BadgeTipo } from "../../components/aprendizaje/BadgeMeta";
import EncabezadoSeccion from "../../components/aprendizaje/EncabezadoSeccion";
import PaginaMeta from "../../components/meta/PaginaMeta";
import ToggleSonidos from "../../components/aprendizaje/ToggleSonidos";
import IndicadorSincronizacion from "../../components/aprendizaje/IndicadorSincronizacion";
import EjercicioOpcionMultiple from "../../components/aprendizaje/ejercicios/EjercicioOpcionMultiple";
import EjercicioEmparejar from "../../components/aprendizaje/ejercicios/EjercicioEmparejar";
import EjercicioCompletar from "../../components/aprendizaje/ejercicios/EjercicioCompletar";
import EjercicioOrdenar from "../../components/aprendizaje/ejercicios/EjercicioOrdenar";
import EjercicioTraduccion from "../../components/aprendizaje/ejercicios/EjercicioTraduccion";
import EjercicioLectura from "../../components/aprendizaje/ejercicios/EjercicioLectura";

function renderEjercicio(ejercicio, onCorrecto) {
  switch (ejercicio.tipo) {
    case "opcion_multiple":
      return <EjercicioOpcionMultiple ejercicio={ejercicio} onCorrecto={onCorrecto} />;
    case "emparejar":
      return <EjercicioEmparejar ejercicio={ejercicio} onCorrecto={onCorrecto} />;
    case "completar":
      return <EjercicioCompletar ejercicio={ejercicio} onCorrecto={onCorrecto} />;
    case "ordenar":
      return <EjercicioOrdenar ejercicio={ejercicio} onCorrecto={onCorrecto} />;
    case "traduccion":
      return <EjercicioTraduccion ejercicio={ejercicio} onCorrecto={onCorrecto} />;
    case "lectura":
      return <EjercicioLectura ejercicio={ejercicio} onCorrecto={onCorrecto} />;
    default:
      return <p>Tipo de ejercicio no disponible.</p>;
  }
}

const EjercicioView = () => {
  const { levelId, topicId, exerciseId } = useParams();
  const navigate = useNavigate();
  const { estaCompletado, marcarCompletado } = useProgresoAprendizaje();

  const tema = obtenerTema(levelId, topicId);
  const ejercicio = obtenerEjercicio(levelId, topicId, exerciseId);
  const completado = estaCompletado(levelId, topicId, exerciseId);

  if (!ejercicio || !tema) {
    return (
      <Container className="aprender-contenedor py-4">
        <div className="learn-panel p-4 text-center">
          <p className="mb-3">No encontramos este ejercicio.</p>
          <Button className="learn-btn learn-btn--primary" onClick={() => navigate(LEARN_ROUTES.temas(levelId))}>
            Volver a temas
          </Button>
        </div>
      </Container>
    );
  }

  const indice = tema.ejercicios.findIndex((e) => e.id === exerciseId);
  const anterior = tema.ejercicios[indice - 1];
  const siguiente = tema.ejercicios[indice + 1];
  const alCompletar = () => marcarCompletado(levelId, topicId, exerciseId);

  return (
    <Container className="aprender-contenedor py-2">
      <PaginaMeta titulo={ejercicio.titulo} />
      <EncabezadoSeccion
        volver={tema.nombre}
        onVolver={() => navigate(LEARN_ROUTES.actividades(levelId, topicId))}
        titulo={`Ejercicio ${indice + 1} de ${tema.ejercicios.length}`}
      >
        {completado && (
          <span className="learn-stats-pill learn-stats-pill--ok">
            <i className="bi bi-check-circle-fill" />
            Hecho
          </span>
        )}
        <IndicadorSincronizacion />
        <ToggleSonidos />
      </EncabezadoSeccion>

      <div className="learn-exercise-shell">
        <div className="learn-exercise-shell__top">
          <div className="learn-exercise-progress" aria-hidden>
            {tema.ejercicios.map((ej, i) => (
              <span
                key={ej.id}
                className={[
                  "learn-exercise-progress__seg",
                  i < indice && "is-done",
                  i === indice && "is-current",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            ))}
          </div>
          <div className="d-flex flex-wrap gap-2">
            <BadgeTipo tipo={ejercicio.tipo} />
            <BadgeDificultad dificultad={ejercicio.dificultad} />
          </div>
          <h2 className="learn-exercise-shell__title">{ejercicio.titulo}</h2>
        </div>
        <div className="learn-exercise-shell__body">
          {renderEjercicio(ejercicio, alCompletar)}
        </div>
      </div>

      <nav className="learn-exercise-nav" aria-label="Navegación entre ejercicios">
        {anterior ? (
          <Button
            className="learn-btn learn-btn--nav"
            onClick={() => navigate(LEARN_ROUTES.jugar(levelId, topicId, anterior.id))}
          >
            <i className="bi bi-chevron-left me-1" />
            Anterior
          </Button>
        ) : (
          <span />
        )}
        {siguiente ? (
          <Button
            className="learn-btn learn-btn--nav-next"
            onClick={() => navigate(LEARN_ROUTES.jugar(levelId, topicId, siguiente.id))}
          >
            Siguiente
            <i className="bi bi-chevron-right ms-1" />
          </Button>
        ) : (
          <Button
            className="learn-btn learn-btn--finish"
            onClick={() => navigate(LEARN_ROUTES.actividades(levelId, topicId))}
          >
            <i className="bi bi-trophy me-2" />
            Terminar tema
          </Button>
        )}
      </nav>
    </Container>
  );
};

export default EjercicioView;
