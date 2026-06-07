import { useNavigate, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useLearning } from "../../context/LearningContext";
import { LEARN_ROUTES } from "../../utils/constants";
import { obtenerNivel, obtenerTemas } from "../../data/cursosIngles";
import TarjetaAprendizaje from "../../components/aprendizaje/TarjetaAprendizaje";
import EncabezadoSeccion from "../../components/aprendizaje/EncabezadoSeccion";
import PaginaMeta from "../../components/meta/PaginaMeta";
import { useProgresoAprendizaje } from "../../hooks/useProgresoAprendizaje";
import gifwelcome1 from "../../assets/image/gifwelcome1.mp4";
import gifwelcome2 from "../../assets/image/gifwelcome2.mp4";



const TemasView = () => {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const { setTemaSeleccionado } = useLearning();
  const { progresoTema } = useProgresoAprendizaje();

  const nivel = obtenerNivel(levelId);
  const temas = obtenerTemas(levelId);

  const gifMedia =
    levelId === "a1" ? (
      <video
        src={gifwelcome1}
        className="welcome-gif"
        autoPlay
        muted
        loop
        playsInline
      />
    ) : levelId === "a2" ? (
      <video
        src={gifwelcome2}
        className="welcome-gif"
        autoPlay
        muted
        loop
        playsInline
      />
    ) : null;

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
        media={gifMedia}
        inlineChildren
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
