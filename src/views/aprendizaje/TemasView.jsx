import { useNavigate, useParams } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { useLearning } from "../../context/LearningContext";
import { LEARN_ROUTES } from "../../utils/constants";

const TEMAS_DEMO = {
  a1: [
    { id: "saludos", nombre: "Saludos" },
    { id: "numeros", nombre: "Números" },
  ],
  a2: [{ id: "familia", nombre: "La familia" }],
};

const TemasView = () => {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const { setTemaSeleccionado } = useLearning();

  const temas = TEMAS_DEMO[levelId] ?? [];

  const elegirTema = (tema) => {
    setTemaSeleccionado(tema);
    navigate(LEARN_ROUTES.actividades(levelId, tema.id));
  };

  return (
    <Container className="py-4">
      <h2 className="text-white fw-bold mb-3">Temas disponibles · Nivel {levelId?.toUpperCase()}</h2>
      <p className="text-white-50 mb-4">
        Selecciona un tema para ver las actividades relacionadas y empezar a practicar de inmediato.
      </p>
      {temas.length === 0 ? (
        <p className="text-white-50">Por el momento no hay temas disponibles para este nivel.</p>
      ) : (
        <div className="d-flex flex-wrap gap-2">
          {temas.map((tema) => (
            <Button key={tema.id} variant="light" onClick={() => elegirTema(tema)}>
              {tema.nombre}
            </Button>
          ))}
        </div>
      )}
    </Container>
  );
};

export default TemasView;
