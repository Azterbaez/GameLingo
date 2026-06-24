import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  InputGroup,
  Spinner
} from "react-bootstrap";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGamepad,
  FaTrophy,
  FaGraduationCap
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import logo from "../assets/image/logo.webp";
import NotificacionOperacion from "../components/NotificacionOperacione";
import TermsModal from "../components/TermsModal";
import ForgotPasswordModal from "../components/ForgotPasswordModal";




const Login = () => {
  const navigate = useNavigate();

  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mostrarNoti, setMostrarNoti] = useState(false);
  const [notiMensaje, setNotiMensaje] = useState("");
  const [notiTipo, setNotiTipo] = useState("exito");
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const [mostrarPassword, setMostrarPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const result = await signIn(email, password);

    if (!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    // mostrar notificación y navegar
    setLoading(false);
    setNotiMensaje("Has iniciado sesión correctamente.");
    setNotiTipo("exito");
    setMostrarNoti(true);
    setTimeout(() => navigate("/inicio"), 900);
  };

  return (
    <div className="login-page">
   <div className="blur blur-1"></div>
<div className="blur blur-2"></div>
<div className="blur blur-3"></div>

<div className="shape shape-1"></div>
<div className="shape shape-2"></div>
<div className="shape shape-3"></div>
<div className="shape shape-4"></div>


      <Container fluid className="login-shell min-vh-100 d-flex align-items-center">
        <Row className="login-row w-100 align-items-center justify-content-center">
          {/* PANEL IZQUIERDO */}

          <Col lg={6} className="d-none d-lg-block">
            <div className="hero-panel px-5 content-reveal" style={{ "--reveal-delay": "0.2s" }}>
              <div className="mb-4">
                <span className="badge bg-light text-primary px-4 py-2 rounded-pill">
                  Plataforma Educativa
                </span>
              </div>
            

              <h1 className="text-white">
                Accede a tu cuenta
              </h1>

              <p className="mt-4 fs-5 text-white-50">
                Continúa tu aprendizaje con ejercicios personalizados, retos motivadores
                y seguimiento de avances en una experiencia moderna y eficiente.
              </p>

              <Row className="mt-5 g-3">
                <Col md={4}>
                  <div className="stat-box text-center content-reveal" style={{ "--reveal-delay": "0.45s" }}>
                    <FaGamepad size={30} className="text-white" />
                    <h5 className="mt-3 text-white">Mini Juegos</h5>
                  </div>
                </Col>

                <Col md={4}>
                  <div className="stat-box text-center content-reveal" style={{ "--reveal-delay": "0.55s" }}>
                    <FaTrophy size={30} className="text-white" />
                    <h5 className="mt-3 text-white">Logros</h5>
                  </div>
                </Col>

                <Col md={4}>
                  <div className="stat-box text-center content-reveal" style={{ "--reveal-delay": "0.65s" }}>
                    <FaGraduationCap size={30} className="text-white" />
                    <h5 className="mt-3 text-white">Aprendizaje</h5>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>

          {/* LOGIN */}

          <Col lg={4} md={8} sm={10} xs={12} className="login-form-col">
            <Card className="login-card login-form-card border-0 content-reveal" style={{ "--reveal-delay": "0.35s" }}>
              <Card.Body className="login-card-body p-5">
                <div className="text-center mb-4">
                  <div className="logo-circle mb-3">
                   <img
  src={logo}
  alt="GameLingo"
  className="mx-auto shadow-lg"
  style={{
    width: "70px",
    height: "70px",
    borderRadius: "70%",
    border: "7px solid rgba(8, 22, 209, 1)",
    objectFit: "cover"
  }}
/>
                  </div>

                  <h2 className="fw-bold text-white">GameLingo</h2>

                  <p className="text-white-50">Inicia sesión para continuar con tu progreso.</p>
                  <p className="text-white-50 small">
                    <span
                      className="text-brand-orange"
                      style={{ cursor: "pointer", textDecoration: "underline", color: "var(--brand-orange)" }}
                      onClick={() => setShowTermsModal(true)}
                    >
                      Leer términos y condiciones
                    </span>
                  </p>
                </div>

                {error && <Alert variant="danger" className="rounded-4 border-0 shadow-sm">{error}</Alert>}

                <Form onSubmit={handleLogin}>
                  {/* EMAIL */}

                  <Form.Group className="mb-4">
                    <Form.Label className="text-white">Correo electrónico</Form.Label>

                    <InputGroup>
                      <InputGroup.Text>
                        <FaEnvelope />
                      </InputGroup.Text>

                      <Form.Control
                        type="email"
                        placeholder="correo@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="custom-input ui-input"
                      />
                    </InputGroup>
                  </Form.Group>

                  {/* PASSWORD */}

                  <Form.Group className="mb-4">
                    <Form.Label className="text-white">Contraseña</Form.Label>

                    <InputGroup>
                      <InputGroup.Text>
                        <FaLock />
                      </InputGroup.Text>

                      <Form.Control
                        type={mostrarPassword ? "text" : "password"}
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="custom-input ui-input"
                      />

                      <Button
                        variant="outline-light"
                        className="border-start-0"
                        style={{ 
                          borderTopRightRadius: '12px', 
                          borderBottomRightRadius: '12px',
                          backgroundColor: 'var(--glass-bg)' 
                        }}
                        onClick={() => setMostrarPassword(!mostrarPassword)}
                      >
                        {mostrarPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  {/* OLVIDÉ MI CONTRASEÑA */}
                  <div className="mb-4 text-end">
                    <span
                      className="text-white-50"
                      style={{ cursor: "pointer", fontSize: "0.9rem", textDecoration: "underline" }}
                      onClick={() => setShowForgotPasswordModal(true)}
                    >
                      ¿Olvidé mi contraseña?
                    </span>
                  </div>

                  {/* BOTÓN */}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="login-btn ui-btn-primary w-100 py-3"
                  >
                    {loading ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                        />
                        Ingresando...
                      </>
                    ) : (
                      "Iniciar sesión"
                    )}
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <p className="mb-1 text-white">¿Aún no eres miembro?</p>

                  <Link
                    to="/register"
                    className="text-decoration-none fw-bold text-naranja"
                  >
                    Crear cuenta ahora
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
        <NotificacionOperacion
          mostrar={mostrarNoti}
          mensaje={notiMensaje}
          tipo={notiTipo}
          onCerrar={() => setMostrarNoti(false)}
        />
        <TermsModal show={showTermsModal} onHide={() => setShowTermsModal(false)} />
        <ForgotPasswordModal show={showForgotPasswordModal} onHide={() => setShowForgotPasswordModal(false)} />
    </div>
  );
};

export default Login;
