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
          <h1 className="display-8 text-center">Game Lingo</h1>
          <p className="lead text-center text-muted">
            Esta plataforma te ayuda a aprender el ingles jugando  e interactuando con el idioma,
            encontraras ejercicios, juegos y herramientas pensadas para que logres un 
            avanza paso apaso a tu ritmo y logres tus metas.
          </p>
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="info-card h-100 shadow-sm" tabIndex="0">
            <Card.Body>
              <Card.Title>¿Por qué usar esta página?</Card.Title>
              <Card.Text>
                Aprender de forma estructurada y entretenida y clara para mejorar
                tu retención y dominio del idioma para un progreso y metas claras.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="info-card h-100 shadow-sm" tabIndex="0">
            <Card.Body>
              <Card.Title>¿Sabías que?</Card.Title>
              <Card.Text>
                En estas web Puedes encontrar contenido organizado por niveles, temas como tambien ejercicios que
                se adaptaran a tus habilidades  y progreso de estudio.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="info-card h-100 shadow-sm" tabIndex="0">
            <Card.Body>
              <Card.Title>!Que esperas¡</Card.Title>
              <Card.Text>
                Inicia sesión o regístrate para comenzar este increible viaje al fabuloso mundo del idioma y sus frontera.
                </Card.Text>
                
                <Card.Text>
                Recuerda registrarte para acceder a todas las funcionalidades.
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