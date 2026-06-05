import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LEARN_ROUTES } from "../utils/constants";

const Inicio = () => {
  const navigate = useNavigate();

  return (
    <div className="inicio-page">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="card p-5 text-center shadow-lg bienvenida-card">
          <h1 style={{ color: "#2563EB", fontWeight: "700" }}>
            Bienvenido a GameLingo
          </h1>

          <p className="mt-3" style={{ color: "#6B7280" }}>
            Continúa tu trayecto de aprendizaje con ejercicios interactivos y retos diseñados
            para acelerar tu progreso en inglés.
          </p>

          <Button
            variant="primary"
            className="mt-4"
            onClick={() => navigate(LEARN_ROUTES.niveles)}
          >
            Explorar niveles
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Inicio;