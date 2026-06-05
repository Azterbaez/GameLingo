import { useNavigate, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useLearning } from "../../context/LearningContext";
import { LEARN_ROUTES } from "../../utils/constants";
import { obtenerNivel, obtenerTemas } from "../../data/cursosIngles";
import TarjetaAprendizaje from "../../components/aprendizaje/TarjetaAprendizaje";
import EncabezadoSeccion from "../../components/aprendizaje/EncabezadoSeccion";
import PaginaMeta from "../../components/meta/PaginaMeta";
import { useProgresoAprendizaje } from "../../hooks/useProgresoAprendizaje";

const TemasView = () => {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const { setTemaSeleccionado } = useLearning();
  const { progresoTema } = useProgresoAprendizaje();

  const nivel = obtenerNivel(levelId);
  const temas = obtenerTemas(levelId);

  const elegirTema = (tema) => {
    setTemaSeleccionado({ id: tema.id, nombre: tema.nombre });
    navigate(LEARN_ROUTES.actividades(levelId, tema.id));
  };

  return (
    <Container className="aprender-contenedor py-2">
      <PaginaMeta titulo="Temas" />
      <EncabezadoSeccion
        volver="Cambiar nivel"
        onVolver={() => navigate(LEARN_ROUTES.niveles)}
        titulo={nivel?.nombre ?? `Nivel ${levelId?.toUpperCase()}`}
        descripcion="Cada tema incluye lección, vocabulario y una ruta de ejercicios de distinta dificultad."
      >
        <span className="learn-stats-pill">
          <i className="bi bi-collection" />
          {temas.length} temas
        </span>
      </EncabezadoSeccion>

      {temas.length === 0 ? (
        <p className="text-secondary">Pronto habrá más temas en este nivel.</p>
      ) : (
        <div className="learn-card-grid learn-card-grid--3">
          {temas.map((tema) => (
            <TarjetaAprendizaje
              key={tema.id}
              titulo={tema.nombre}
              descripcion={tema.descripcion}
              icono={tema.icono}
              progreso={progresoTema(levelId, tema.id, tema.ejercicios.length)}
              badge={`${tema.ejercicios.length} ejercicios`}
              onClick={() => elegirTema(tema)}
            />
          ))}
        </div>
      )}
    </Container>
  );
};

export default TemasView;
