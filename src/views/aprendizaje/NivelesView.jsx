import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useLearning } from "../../context/LearningContext";
import { LEARN_ROUTES } from "../../utils/constants";
import { NIVELES } from "../../data/cursosIngles";
import TarjetaAprendizaje from "../../components/aprendizaje/TarjetaAprendizaje";
import EncabezadoSeccion from "../../components/aprendizaje/EncabezadoSeccion";
import PaginaMeta from "../../components/meta/PaginaMeta";
import IndicadorSincronizacion from "../../components/aprendizaje/IndicadorSincronizacion";
import { navigateWithLeave } from "../../utils/navigation";

const NivelesView = () => {
  const navigate = useNavigate();
  const { setNivelSeleccionado } = useLearning();

  const elegirNivel = (nivel) => {
    setNivelSeleccionado({ id: nivel.id, nombre: nivel.nombre });
    navigateWithLeave(navigate, LEARN_ROUTES.temas(nivel.id));
  };

  return (
    <Container className="aprender-contenedor py-2">
      <PaginaMeta titulo="Niveles" descripcion="Elige tu nivel de inglés en GameLingo." />
      <EncabezadoSeccion
        titulo="Cursos de inglés"
        descripcion="Elige tu nivel y avanza con ejercicios de vocabulario, frases y retos."
      >
        <span className="learn-stats-pill">
          <i className="bi bi-mortarboard" />
          {NIVELES.length} niveles
        </span>
        <IndicadorSincronizacion />
      </EncabezadoSeccion>

      <div className="learn-card-grid learn-card-grid--2">
        {NIVELES.map((nivel, idx) => (
          <TarjetaAprendizaje
            key={nivel.id}
            titulo={nivel.nombre}
            descripcion={nivel.descripcion}
            icono={nivel.icono}
            color={nivel.color}
            badge="Vocabulario + retos"
            onClick={() => elegirNivel(nivel)}
            style={{ transitionDelay: `${idx * 70}ms` }}
          />
        ))}
      </div>
    </Container>
  );
};

export default NivelesView;
