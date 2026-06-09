import { useNavigate, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useLearning } from "../../context/LearningContext";
import { LEARN_ROUTES } from "../../utils/constants";
import { obtenerNivel, obtenerTemas } from "../../data/cursosIngles";
import { navigateWithLeave } from "../../utils/navigation";
import TarjetaAprendizaje from "../../components/aprendizaje/TarjetaAprendizaje";
import EncabezadoSeccion from "../../components/aprendizaje/EncabezadoSeccion";
import PaginaMeta from "../../components/meta/PaginaMeta";
import { useProgresoAprendizaje } from "../../hooks/useProgresoAprendizaje";
import VideoBienvenidaNivel from "../../components/aprendizaje/VideoBienvenidaNivel";

const TemasView = () => {
  const { levelId, subnivel = 1 } = useParams();
  const navigate = useNavigate();
  const { setTemaSeleccionado } = useLearning();
  const { progresoTema } = useProgresoAprendizaje();

  const nivel = obtenerNivel(levelId);
  const temas = obtenerTemas(levelId);

  const elegirTema = (tema) => {
    setTemaSeleccionado({ id: tema.id, nombre: tema.nombre });
    navigateWithLeave(navigate, LEARN_ROUTES.actividades(levelId, tema.id));
  };

  return (
      
    <Container className="aprender-contenedor py-2">
      <PaginaMeta titulo="Temas" />
      <EncabezadoSeccion
        volver="Cambiar nivel"
        onVolver={() => navigate(LEARN_ROUTES.niveles)}
        titulo={nivel?.nombre ?? `Nivel ${levelId?.toUpperCase()}`}
        descripcion="Cada tema incluye lección, vocabulario y una ruta de ejercicios de distinta dificultad."
        media={<VideoBienvenidaNivel subnivel={Number(subnivel)} />}
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
          {temas.map((tema, idx) => (
            <TarjetaAprendizaje
              key={tema.id}
              titulo={tema.nombre}
              descripcion={tema.descripcion}
              icono={tema.icono}
              progreso={progresoTema(levelId, tema.id, tema.ejercicios.length)}
              badge={`${tema.ejercicios.length} ejercicios`}
              onClick={() => elegirTema(tema)}
              style={{ transitionDelay: `${idx * 60}ms` }}
            />
          ))}
        </div>
      )}
    </Container>
  );
};

export default TemasView;
