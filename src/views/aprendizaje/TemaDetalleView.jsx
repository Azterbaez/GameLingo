import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useLearning } from "../../context/LearningContext";
import { LEARN_ROUTES } from "../../utils/constants";
import { obtenerTema } from "../../data/cursosIngles";
import { navigateWithLeave } from "../../utils/navigation";
import PanelVocabulario from "../../components/aprendizaje/PanelVocabulario";
import ListaEjercicios from "../../components/aprendizaje/ListaEjercicios";
import EncabezadoSeccion from "../../components/aprendizaje/EncabezadoSeccion";
import PaginaMeta from "../../components/meta/PaginaMeta";
import BarraProgresoCircular from "../../components/aprendizaje/BarraProgresoCircular";
import { useProgresoAprendizaje } from "../../hooks/useProgresoAprendizaje";

const TemaDetalleView = () => {
  const { levelId, subnivel, topicId } = useParams();
  const navigate = useNavigate();
  const { temaSeleccionado, setTemaSeleccionado } = useLearning();
  const { estaCompletado, ejerciciosCompletadosEnTema } = useProgresoAprendizaje();

  const tema = obtenerTema(levelId, topicId);
  const nombreTema = tema?.nombre ?? temaSeleccionado?.nombre ?? topicId;

  useEffect(() => {
    if (tema) {
      setTemaSeleccionado({ id: tema.id, nombre: tema.nombre });
    }
  }, [tema, setTemaSeleccionado]);

  if (!tema) {
    return (
      <Container className="aprender-contenedor py-4">
        <div className="learn-panel p-4 text-center">
          <p className="mb-3">Este tema no está disponible.</p>
          <button
            type="button"
            className="learn-btn learn-btn--primary"
            onClick={() => navigateWithLeave(navigate, LEARN_ROUTES.temas(levelId, subnivel ?? 1))}
          >
            Ver temas
          </button>
        </div>
      </Container>
    );
  }

  const ids = tema.ejercicios.map((e) => e.id);
  const completados = ejerciciosCompletadosEnTema(levelId, topicId, ids);
  const total = tema.ejercicios.length;
  const porcentaje = total ? Math.round((completados / total) * 100) : 0;

  return (
    <Container className="aprender-contenedor py-2">
      <PaginaMeta titulo={nombreTema} />
      <EncabezadoSeccion
        volver="Temas"
        onVolver={() => navigateWithLeave(navigate, LEARN_ROUTES.temas(levelId, subnivel ?? 1))}
        titulo={nombreTema}
        descripcion={tema.descripcion}
      >
        <BarraProgresoCircular porcentaje={porcentaje} tamano="sm" />
        <span className="learn-stats-pill">
          {completados}/{total}
        </span>
      </EncabezadoSeccion>

      <div className="learn-activity-progress mb-3">
        <div className="d-flex justify-content-between small text-muted mb-1">
          <span>Progreso del tema</span>
          <span>{porcentaje}% · {completados}/{total} actividades</span>
        </div>
        <div className="progress learn-activity-progress__bar">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${porcentaje}%` }}
            aria-valuenow={porcentaje}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      {tema.leccion && (
        <PanelVocabulario
          titulo={tema.leccion.titulo}
          resumen={tema.leccion.resumen}
          vocabulario={tema.leccion.vocabulario}
        />
      )}

      <section className="learn-panel">
        <div className="learn-panel__head">
          <h3>Ejercicios del tema</h3>
          <p>
            Empieza por los básicos y avanza hasta los retos de ordenar, traducir y comprensión
            lectora.
          </p>
        </div>
        <div className="p-3 p-md-4">
          <ListaEjercicios
            ejercicios={tema.ejercicios}
            levelId={levelId}
            topicId={topicId}
            estaCompletado={estaCompletado}
            onElegir={(id) =>
              navigateWithLeave(
                navigate,
                LEARN_ROUTES.jugar(levelId, subnivel ?? 1, topicId, id)
              )
            }
          />

          {completados === total && total > 0 && (
            <div className="learn-success-banner mt-4">
              <i className="bi bi-trophy-fill" aria-hidden />
              ¡Tema completado! Puedes repasar o pasar al siguiente.
            </div>
          )}
        </div>
      </section>
    </Container>
  );
};

export default TemaDetalleView;
