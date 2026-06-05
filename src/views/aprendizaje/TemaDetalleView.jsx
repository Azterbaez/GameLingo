import { useNavigate, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useLearning } from "../../context/LearningContext";
import { LEARN_ROUTES } from "../../utils/constants";
import { obtenerTema } from "../../data/cursosIngles";
import PanelVocabulario from "../../components/aprendizaje/PanelVocabulario";
import ListaEjercicios from "../../components/aprendizaje/ListaEjercicios";
import EncabezadoSeccion from "../../components/aprendizaje/EncabezadoSeccion";
import PaginaMeta from "../../components/meta/PaginaMeta";
import BarraProgresoCircular from "../../components/aprendizaje/BarraProgresoCircular";
import { useProgresoAprendizaje } from "../../hooks/useProgresoAprendizaje";

const TemaDetalleView = () => {
  const { levelId, topicId } = useParams();
  const navigate = useNavigate();
  const { temaSeleccionado } = useLearning();
  const { estaCompletado, ejerciciosCompletadosEnTema } = useProgresoAprendizaje();

  const tema = obtenerTema(levelId, topicId);
  const nombreTema = tema?.nombre ?? temaSeleccionado?.nombre ?? topicId;

  if (!tema) {
    return (
      <Container className="aprender-contenedor py-4">
        <div className="learn-panel p-4 text-center">
          <p className="mb-3">Este tema no está disponible.</p>
          <button
            type="button"
            className="learn-btn learn-btn--primary"
            onClick={() => navigate(LEARN_ROUTES.temas(levelId))}
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
        onVolver={() => navigate(LEARN_ROUTES.temas(levelId))}
        titulo={nombreTema}
        descripcion={tema.descripcion}
      >
        <BarraProgresoCircular porcentaje={porcentaje} tamano="sm" />
        <span className="learn-stats-pill">
          {completados}/{total}
        </span>
      </EncabezadoSeccion>

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
            onElegir={(id) => navigate(LEARN_ROUTES.jugar(levelId, topicId, id))}
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
