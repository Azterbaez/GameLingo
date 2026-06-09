import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { NIVELES } from "../data/cursosIngles";
import { LEARN_ROUTES } from "../utils/constants";
import { useLearning } from "../context/LearningContext";
import PaginaMeta from "../components/meta/PaginaMeta";
import TarjetaAprendizaje from "../components/aprendizaje/TarjetaAprendizaje";
import { navigateWithLeave } from "../utils/navigation";

const CursoView = () => {
  const navigate = useNavigate();
  const { setNivelSeleccionado, limpiarAprendizaje } = useLearning();

  useEffect(() => {
    limpiarAprendizaje();
  }, [limpiarAprendizaje]);

  const abrirCurso = (levelId, nombre) => {
    setNivelSeleccionado({ id: levelId, nombre });
    navigateWithLeave(navigate, LEARN_ROUTES.nivel(levelId));
  };

  return (
    <Container className="aprender-contenedor py-3">
      <PaginaMeta titulo="Cursos" />
      <h2 className="mb-3 content-reveal" style={{ "--reveal-delay": "0.15s" }}>Cursos</h2>
      <p className="text-muted content-reveal" style={{ "--reveal-delay": "0.25s" }}>Elige un curso (A1/A2) y accede a los niveles disponibles.</p>

      <div className="learn-card-grid learn-card-grid--2 mt-4">
        {NIVELES.map((nivel, idx) => (
          <TarjetaAprendizaje
            key={nivel.id}
            titulo={nivel.nombre}
            descripcion={nivel.descripcion}
            icono={nivel.icono}
            color={nivel.color}
            badge="Curso"
            onClick={() => abrirCurso(nivel.id, nivel.nombre)}
            style={{ transitionDelay: `${220 + idx * 150}ms` }}
          />
        ))}
      </div>
    </Container>
  );
};

export default CursoView;
