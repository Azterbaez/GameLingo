import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { NIVELES } from '../data/cursosIngles';

/**
 * Landing Page principal del proyecto Azter.
 * Utiliza los estilos definidos en App.css para mantener la coherencia visual.
 */
const LandingPage = () => {
  return (
    <div className="login-page d-flex align-items-center position-relative overflow-hidden" style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}>
      {/* Elementos decorativos de fondo (usando tus clases de App.css) */}
      <div className="blur blur-1"></div>
      <div className="blur blur-2"></div>
      <div className="blur blur-3"></div>
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="shape shape-3"></div>

      <Container className="informacion-content">
        <Row className="align-items-center g-5">
          {/* Panel Principal - Hero Section */}
          <Col lg={7} className="hero-panel text-start animated-view page-reveal enter">
            <h1 className="mb-4 fw-extra-bold">
              Aprender inglés nunca fue <span className="text-naranja">tan divertido</span>
            </h1>
            <p className="lead mb-5 fs-5" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '90%' }}>
              Únete a una experiencia de aprendizaje interactiva diseñada para todas las edades. 
              Desde saludos básicos hasta conversaciones fluidas, nosotros te acompañamos paso a paso.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <Button 
                as={Link} 
                to="/register" 
                className="login-btn px-5 py-3 fs-5 shadow-lg text-decoration-none"
              >
                Empezar Gratis
              </Button>
              <Button 
                as={Link} 
                to="/informacion" 
                variant="outline-light" 
                className="px-5 py-3 fs-5 text-decoration-none" 
                style={{ borderRadius: '15px', borderWidth: '2px' }}
              >
                Ver Metodología
              </Button>
            </div>

            {/* Estadísticas / Features */}
            <Row className="mt-5 g-4">
              <Col md={4}>
                <div className="stat-box text-center h-100">
                  <h3 className="text-naranja fw-bold mb-1">A1-A2</h3>
                  <small className="opacity-75">Niveles Oficiales</small>
                </div>
              </Col>
              <Col md={4}>
                <div className="stat-box text-center h-100">
                  <h3 className="text-naranja fw-bold mb-1">+50</h3>
                  <small className="opacity-75">Lecciones Activas</small>
                </div>
              </Col>
              <Col md={4}>
                <div className="stat-box text-center h-100">
                  <h3 className="text-naranja fw-bold mb-1">100%</h3>
                  <small className="opacity-75">Gamificado</small>
                </div>
              </Col>
            </Row>
          </Col>

          {/* Tarjetas de Niveles */}
          <Col lg={5} className="animated-view page-reveal enter dir-forward">
            <h2 className="text-white mb-4 h4 fw-light">Niveles disponibles:</h2>
            {NIVELES.map((nivel, index) => (
              <Card 
                key={nivel.id} 
                className="info-card mb-4 bg-white bg-opacity-10 border-0 text-white card-reveal"
                style={{ '--reveal-delay': `${index * 150}ms`, backdropFilter: 'blur(10px)' }}
              >
                <Card.Body className="d-flex align-items-center p-4">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center me-4"
                    style={{ width: '60px', height: '60px', backgroundColor: nivel.color, fontSize: '1.5rem' }}
                  >
                    <i className={`bi ${nivel.icono}`}></i>
                  </div>
                  <div>
                    <h3 className="h5 mb-1 fw-bold text-naranja">{nivel.nombre}</h3>
                    <p className="small mb-0 opacity-75">{nivel.descripcion}</p>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;