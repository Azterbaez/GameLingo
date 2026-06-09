import { useParams, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { obtenerNivel } from "../data/cursosIngles";
import { LEARN_ROUTES } from "../utils/constants";
import PaginaMeta from "../components/meta/PaginaMeta";
import TarjetaAprendizaje from "../components/aprendizaje/TarjetaAprendizaje";
import { useEffect } from "react";
import { useLearning } from "../context/LearningContext";
import { navigateWithLeave } from "../utils/navigation";

const CursoNivelView = () => {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const { setNivelSeleccionado } = useLearning();

  const nivel = obtenerNivel(levelId);

  useEffect(() => {
    if (nivel) {
      setNivelSeleccionado({ id: nivel.id, nombre: nivel.nombre });
    }
  }, [nivel, setNivelSeleccionado]);

  const abrirSubnivel = (subnivel) => {
    navigateWithLeave(navigate, LEARN_ROUTES.subnivel(levelId, subnivel));
  };

  return (
    <Container className="aprender-contenedor py-3">
        <PaginaMeta titulo={`Curso ${nivel?.nombre ?? levelId} - Niveles`} />

        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            <h2 className="mb-0">{nivel?.nombre ?? levelId}</h2>
            <p className="text-muted mb-0">Selecciona un nivel para ver los temas disponibles.</p>
          </div>
          <small className="text-muted">{nivel?.descripcion}</small>
        </div>

        <div className="learn-card-grid learn-card-grid--3">
          {[1, 2, 3].map((subnivel) => (
            <TarjetaAprendizaje
              key={subnivel}
              titulo={`Nivel ${subnivel}`}
              descripcion={`Temas para el subnivel ${subnivel}`}
              icono="bi-grid-3x3"
              badge={`Nivel ${subnivel}`}
              onClick={() => abrirSubnivel(subnivel)}
              style={{ transitionDelay: `${200 + subnivel * 160}ms` }}
            />
          ))}
        </div>
    </Container>
  );
};

export default CursoNivelView;
