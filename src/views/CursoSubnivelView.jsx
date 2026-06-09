import { useParams, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import {
  obtenerNivel,
  obtenerTemasPorSubnivel,
} from "../data/cursosIngles";
import { LEARN_ROUTES } from "../utils/constants";
import PaginaMeta from "../components/meta/PaginaMeta";
import TarjetaAprendizaje from "../components/aprendizaje/TarjetaAprendizaje";
import EncabezadoSeccion from "../components/aprendizaje/EncabezadoSeccion";
import VideoBienvenidaNivel from "../components/aprendizaje/VideoBienvenidaNivel";
import { useEffect } from "react";
import { useLearning } from "../context/LearningContext";
import { useProgresoAprendizaje } from "../hooks/useProgresoAprendizaje";
import { navigateWithLeave } from "../utils/navigation";

const CursoSubnivelView = () => {
  const { levelId, subnivel } = useParams();
  const navigate = useNavigate();
  const { setNivelSeleccionado, setTemaSeleccionado } = useLearning();
  const { progresoTema } = useProgresoAprendizaje();

  const nivel = obtenerNivel(levelId);
  const temas = obtenerTemasPorSubnivel(levelId, subnivel);
  const numSubnivel = Number(subnivel);

  useEffect(() => {
    if (nivel) {
      setNivelSeleccionado({ id: nivel.id, nombre: nivel.nombre });
    }
  }, [nivel, setNivelSeleccionado]);

  const elegirTema = (tema) => {
    setTemaSeleccionado({ id: tema.id, nombre: tema.nombre });
    navigateWithLeave(
      navigate,
      LEARN_ROUTES.actividades(levelId, subnivel, tema.id)
    );
  };

  return (
    <Container className="aprender-contenedor py-2">
      <PaginaMeta titulo={`${nivel?.nombre ?? levelId} — Nivel ${subnivel}`} />

      <EncabezadoSeccion
        volver="Cambiar nivel"
        onVolver={() => navigateWithLeave(navigate, LEARN_ROUTES.nivel(levelId))}
        titulo={`${nivel?.nombre ?? levelId} · Nivel ${subnivel}`}
        descripcion={
          nivel?.descripcion ??
          "Elige un tema para ver la lección y practicar con ejercicios."
        }
        media={<VideoBienvenidaNivel subnivel={numSubnivel} />}
        inlineChildren
      >
        <span className="learn-stats-pill">
          <i className="bi bi-collection" aria-hidden />
          {temas.length} temas
        </span>
      </EncabezadoSeccion>

      {temas.length === 0 ? (
        <p className="text-secondary content-reveal" style={{ "--reveal-delay": "0.35s" }}>
          Aún no hay temas disponibles para este nivel.
        </p>
      ) : (
        <div className="learn-card-grid learn-card-grid--3">
          {temas.map((tema, idx) => (
            <TarjetaAprendizaje
              key={tema.id}
              titulo={tema.nombre}
              descripcion={tema.descripcion}
              icono={tema.icono}
              badge={`${tema.ejercicios.length} ejercicios`}
              progreso={progresoTema(levelId, tema.id, tema.ejercicios.length)}
              onClick={() => elegirTema(tema)}
              style={{ transitionDelay: `${220 + idx * 150}ms` }}
            />
          ))}
        </div>
      )}
    </Container>
  );
};

export default CursoSubnivelView;
