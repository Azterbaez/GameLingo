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

import logo from "../assets/image/logo.png";




const Login = () => {
  const navigate = useNavigate();

  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    navigate("/inicio");
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


      <Container fluid className="min-vh-100 d-flex align-items-center">
        <Row className="w-100 align-items-center justify-content-center">
          {/* PANEL IZQUIERDO */}

          <Col lg={6} className="d-none d-lg-block">
            <div className="hero-panel px-5">
              <div className="mb-4">
                <span className="badge bg-light text-primary px-4 py-2 rounded-pill">
                  Plataforma Educativa
                </span>
              </div>
            

              <h1>
                Aprende Inglés
                <br />
                Jugando
              </h1>

              <p className="mt-4 fs-5">
                GameLingo convierte el aprendizaje del inglés en una experiencia
                divertida mediante juegos, niveles, retos y recompensas.
              </p>

              <Row className="mt-5 g-3">
                <Col md={4}>
                  <div className="stat-box text-center">
                    <FaGamepad size={30} />
                    <h5 className="mt-3">Mini Juegos</h5>
                  </div>
                </Col>

                <Col md={4}>
                  <div className="stat-box text-center">
                    <FaTrophy size={30} />
                    <h5 className="mt-3">Logros</h5>
                  </div>
                </Col>

                <Col md={4}>
                  <div className="stat-box text-center">
                    <FaGraduationCap size={30} />
                    <h5 className="mt-3">Aprendizaje</h5>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>

          {/* LOGIN */}

          <Col lg={4} md={8}>
            <Card className="login-card border-0">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="logo-circle mb-3">
                   <img
  src={logo}
  alt="GameLingo"
  className="mx-auto shadow-lg"
  style={{
    width: "85px",
    height: "85px",
    borderRadius: "50%",
    border: "4px solid #e4b313",
    objectFit: "cover"
  }}
/>
                  </div>

                  <h2 className="fw-bold text-azul-oscuro">GameLingo</h2>

                  <p className="text-muted">Aprende inglés jugando</p>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleLogin}>
                  {/* EMAIL */}

                  <Form.Group className="mb-4">
                    <Form.Label>Correo electrónico</Form.Label>

                    <InputGroup>
                      <InputGroup.Text>
                        <FaEnvelope />
                      </InputGroup.Text>

                      <Form.Control
                        type="email"
                        placeholder="correo@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="custom-input"
                      />
                    </InputGroup>
                  </Form.Group>

                  {/* PASSWORD */}

                  <Form.Group className="mb-4">
                    <Form.Label>Contraseña</Form.Label>

                    <InputGroup>
                      <InputGroup.Text>
                        <FaLock />
                      </InputGroup.Text>

                      <Form.Control
                        type={mostrarPassword ? "text" : "password"}
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="custom-input"
                      />

                      <Button
                       className="
w-full
bg-gradient-to-r
from-blue-900
to-blue-700
hover:from-blue-800
hover:to-blue-600
text-white
font-bold
py-3
rounded-xl
transition-all
duration-300
hover:-translate-y-1
shadow-xl
disabled:opacity-70
"
                        onClick={() => setMostrarPassword(!mostrarPassword)}
                      >
                        {mostrarPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  {/* BOTÓN */}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="login-btn w-100 py-3"
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
                  <p className="mb-1">¿No tienes cuenta?</p>

                  <Link
                    to="/register"
                    className="text-decoration-none fw-bold text-naranja"
                  >
                    Crear cuenta
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;