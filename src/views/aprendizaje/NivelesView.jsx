import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { useLearning } from "../../context/LearningContext";
import { LEARN_ROUTES } from "../../utils/constants";

const NIVELES_DEMO = [
  { id: "a1", nombre: "A1 — Principiante" },
  { id: "a2", nombre: "A2 — Elemental" },
];

const NivelesView = () => {
  const navigate = useNavigate();
  const { setNivelSeleccionado, limpiarAprendizaje } = useLearning();

  const elegirNivel = (nivel) => {
    setNivelSeleccionado(nivel);
    navigate(LEARN_ROUTES.temas(nivel.id));
  };

  return (
    <Container className="py-4">
      <h2 className="text-white fw-bold mb-3">Elige tu nivel</h2>
      <div className="d-flex flex-wrap gap-2">
        {NIVELES_DEMO.map((nivel) => (
          <Button key={nivel.id} variant="warning" onClick={() => elegirNivel(nivel)}>
            {nivel.nombre}
          </Button>
        ))}
      </div>
      <Button
        variant="link"
        className="text-white mt-3 p-0"
        onClick={limpiarAprendizaje}
      >
        Reiniciar selección
      </Button>
    </Container>
  );
};

export default NivelesView;
