import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Informacion = () => {
  const navigate = useNavigate();

  return (
    <div className="informacion-page">
      <div className="informacion-bg-shape shape-book shape-book-1" />
      <div className="informacion-bg-shape shape-book shape-book-2" />
      <div className="informacion-bg-shape shape-book shape-book-3" />
      <Container className="py-5 position-relative informacion-content">
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={10} lg={8}>
          <h1 className="display-8 text-center text-azul-oscuro fw-bold">Game Lingo</h1>
          <p className="lead text-center text-azul-oscuro fw-bold">
            Domina el inglés con una experiencia de aprendizaje profesional y atractiva.
            Aquí encontrarás contenidos, desafíos y ejercicios pensados para que avances
            con claridad y confianza.
          </p>
          <p className="text-center text-azul-oscuro opacity-75 fw-bold">
            Diseñado para alumnos que quieren resultados reales, paso a paso y a su propio ritmo.
          </p>
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="info-card h-100 shadow-sm" tabIndex="0">
            <Card.Body>
              <Card.Title>Enfoque profesional</Card.Title>
              <Card.Text>
                Aprende con una metodología clara y estructurada que te ayuda a interiorizar
                conceptos y mejorar tu fluidez de forma sostenida.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="info-card h-100 shadow-sm" tabIndex="0">
            <Card.Body>
              <Card.Title>Aprende con claridad</Card.Title>
              <Card.Text>
                Descubre contenidos organizados por niveles y temas, con ejercicios que se adaptan
                a tu ritmo de avance y a tus necesidades reales.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="info-card h-100 shadow-sm" tabIndex="0">
            <Card.Body>
              <Card.Title>Tu progreso asegurado</Card.Title>
              <Card.Text>
                Regístrate para guardar tu avance, desbloquear todas las herramientas y
                continuar desde donde lo dejaste en cualquier momento.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Button
              variant="primary"
              size="lg"
              className="w-100"
              onClick={() => navigate("/login")}
            >
              Iniciar sesión
            </Button>
            <Button
              variant="outline-primary"
              size="lg"
              className="w-100"
              onClick={() => navigate("/register")}
            >
              Registrarse
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Informacion;