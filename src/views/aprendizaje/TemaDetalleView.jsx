import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useLearning } from "../../context/LearningContext";

const ACTIVIDADES_DEMO = [
  { id: "quiz-1", nombre: "Quiz de vocabulario" },
  { id: "match-1", nombre: "Emparejar palabras" },
];

const TemaDetalleView = () => {
  const { levelId, topicId } = useParams();
  const { temaSeleccionado } = useLearning();

  return (
    <Container className="py-4">
      <h2 className="text-white fw-bold mb-2">Actividades disponibles</h2>
      <p className="text-white-50 mb-4">
        Tema: {temaSeleccionado?.nombre ?? topicId} · Nivel {levelId?.toUpperCase()}
      </p>
      <ul className="list-group">
        {ACTIVIDADES_DEMO.map((act) => (
          <li key={act.id} className="list-group-item">
            {act.nombre}
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default TemaDetalleView;
