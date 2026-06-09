import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useLearning } from "../../context/LearningContext";
import { LEARN_ROUTES, SUBHEADER_PASOS } from "../../utils/constants";
import { navigateWithLeave } from "../../utils/navigation";

function pasoActivo(pathname) {
  if (/\/jugar\//.test(pathname) || /\/actividades/.test(pathname)) {
    return "actividades";
  }

  if (/\/temas\//.test(pathname) || /^\/curso\/[a-z0-9_-]+\/\d+$/.test(pathname)) {
    return "temas";
  }

  if (/^\/curso\/[a-z0-9_-]+$/.test(pathname)) {
    return "niveles";
  }

  if (/^\/curso$/.test(pathname)) {
    return "curso";
  }

  return "curso";
}

function subtituloPaso(
  pasoId,
  {
    nivelSeleccionado,
    temaSeleccionado,
    levelId,
    topicId,
  }
) {
  if (pasoId === "niveles") {
    return (
      nivelSeleccionado?.nombre ??
      levelId?.toUpperCase() ??
      null
    );
  }

  if (pasoId === "curso") {
    return nivelSeleccionado?.nombre ?? null;
  }

  if (pasoId === "temas") {
    return temaSeleccionado?.nombre ?? topicId ?? null;
  }

  if (
    pasoId === "actividades" &&
    temaSeleccionado?.nombre
  ) {
    return temaSeleccionado.nombre;
  }

  return null;
}

function rutaPaso(pasoId, { levelId, subnivel, topicId }) {
  if (pasoId === "curso") return "/curso";
  if (pasoId === "niveles") {
    return levelId ? LEARN_ROUTES.nivel(levelId) : LEARN_ROUTES.niveles;
  }

  if (pasoId === "temas" && levelId) {
    return LEARN_ROUTES.temas(levelId, subnivel ?? 1);
  }

  if (
    pasoId === "actividades" &&
    levelId &&
    topicId
  ) {
    return LEARN_ROUTES.actividades(
      levelId,
      subnivel ?? 1,
      topicId
    );
  }

  return null;
}

const SubheaderNiveles = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { levelId, subnivel, topicId } = useParams();

  const {
    nivelSeleccionado,
    temaSeleccionado,
    setTemaSeleccionado,
    limpiarAprendizaje,
  } = useLearning();

  const activo = pasoActivo(pathname);

  const pasos = useMemo(
    () =>
      SUBHEADER_PASOS.map((paso, indice) => {
        const ruta = rutaPaso(
          paso.id,
          {
            levelId,
            subnivel,
            topicId,
          }
        );

        const habilitado =
          (paso.id === "curso" && activo !== "curso") ||
          (paso.id === "niveles" && Boolean(levelId)) ||
          (paso.id === "temas" &&
            Boolean(levelId && subnivel)) ||
          (paso.id === "actividades" &&
            Boolean(levelId && subnivel && topicId));

        return {
          ...paso,
          indice,
          ruta,
          habilitado,
          esActivo: activo === paso.id,
          subtitulo: subtituloPaso(
            paso.id,
            {
              nivelSeleccionado,
              temaSeleccionado,
              levelId,
              topicId,
            }
          ),
        };
      }),
    [
      activo,
      levelId,
      subnivel,
      topicId,
      nivelSeleccionado,
      temaSeleccionado,
    ]
  );

  const irAPaso = (paso) => {
    if (!paso.habilitado || !paso.ruta) return;

    if (paso.id === "curso") {
      limpiarAprendizaje();
    } else if (paso.id === "niveles" || paso.id === "temas") {
      setTemaSeleccionado(null);
    }

    navigateWithLeave(navigate, paso.ruta);
  };

  return (
    <nav className="subheader-niveles" aria-label="Progreso de aprendizaje">
      <Container fluid="md" className="subheader-niveles__container">
        <ol className="subheader-niveles__lista">
          {pasos.map((paso) => (
            <li
              key={paso.id}
              className={[
                "subheader-niveles__paso",
                paso.esActivo &&
                  "subheader-niveles__paso--activo",
                !paso.habilitado &&
                  "subheader-niveles__paso--deshabilitado",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {paso.indice > 0 && (
                <span
                  className="subheader-niveles__separador"
                  aria-hidden
                >
                  <i className="bi bi-chevron-right" />
                </span>
              )}

              <button
                type="button"
                className="subheader-niveles__boton"
                disabled={!paso.habilitado}
                aria-current={
                  paso.esActivo
                    ? "step"
                    : undefined
                }
                onClick={() => irAPaso(paso)}
              >
                <span className="subheader-niveles__etiqueta">
                  <span className="subheader-niveles__num">{paso.indice + 1}</span>
                  {paso.etiqueta}
                </span>
                {paso.subtitulo && (
                  <span className="subheader-niveles__detalle" title={paso.subtitulo}>
                    {paso.subtitulo}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ol>
      </Container>
    </nav>
  );
};

export default SubheaderNiveles;