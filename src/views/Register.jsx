import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/image/logo.png";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  InputGroup
} from "react-bootstrap";

const Register = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);

    const result = await signUp(
      email,
      password,
      username
    );

    if (!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    setSuccess(
      "🎉 Cuenta creada correctamente. Revisa tu correo electrónico y confirma tu cuenta antes de iniciar sesión. Si no encuentras el mensaje, revisa la carpeta de spam."
    );

    setLoading(false);

    setTimeout(() => {
      navigate("/login");
    }, 5000);
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

      <Container
        fluid
        className="min-vh-100 d-flex align-items-center justify-content-center px-4"
      >
        <Row className="w-100 justify-content-center align-items-center g-5">
          {/* PANEL IZQUIERDO */}

          <Col lg={6} className="d-none d-lg-block">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-dot"></span>
                Aprende Jugando
              </div>

              <h1 className="hero-title">
                Game
                <br />
                Lingo
              </h1>

              <p className="hero-description">
                Aprende inglés mediante desafíos, juegos interactivos, niveles y
                recompensas diseñadas para hacer divertido tu aprendizaje.
              </p>

              <div className="hero-stats">
                <div className="stat-card">
                  <h2>+100</h2>
                  <p>Lecciones</p>
                </div>

                <div className="stat-card">
                  <h2>24/7</h2>
                  <p>Disponible</p>
                </div>

                <div className="stat-card">
                  <h2>🎮</h2>
                  <p>Gamificación</p>
                </div>
              </div>
            </div>
          </Col>

          {/* REGISTER */}

          <Col md={10} lg={4}>
            <Card className="login-card border-0">
              <Card.Body className="p-3">
                <div className="text-center mb-4">
                  <div className=" logo-circle mb-2">
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

                    <div className="logo-circle">
                      <i className="bi bi-controller"></i>
                    </div>
                  </div>

                  <h2 className="fw-bold mb-2">Crear Cuenta</h2>

                  <p className="text-muted">Únete a GameLingo</p>
                </div>

                {error && (
                  <Alert variant="danger" className="rounded-4 border-0">
                    {error}
                  </Alert>
                )}

                {success && (
                  <Alert variant="success" className="rounded-4 border-0">
                    {success}
                  </Alert>
                )}

                <Form onSubmit={handleRegister}>
                  {/* USUARIO */}

                  <Form.Group className="mb-3">
                    <Form.Label>Nombre de usuario</Form.Label>

                    <InputGroup>
                      <InputGroup.Text className="input-icon-box">
                        <i className="bi bi-person-fill"></i>
                      </InputGroup.Text>

                      <Form.Control
                        type="text"
                        placeholder="Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="custom-input"
                        required
                      />
                    </InputGroup>
                  </Form.Group>

                  {/* EMAIL */}

                  <Form.Group className="mb-3">
                    <Form.Label>Correo electrónico</Form.Label>

                    <InputGroup>
                      <InputGroup.Text className="input-icon-box">
                        <i className="bi bi-envelope-fill"></i>
                      </InputGroup.Text>

                      <Form.Control
                        type="email"
                        placeholder="correo@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="custom-input"
                        required
                      />
                    </InputGroup>
                  </Form.Group>

                  {/* PASSWORD */}

                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>

                    <InputGroup>
                      <InputGroup.Text className="input-icon-box">
                        <i className="bi bi-lock-fill"></i>
                      </InputGroup.Text>

                      <Form.Control
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="custom-input"
                        required
                      />
                    </InputGroup>
                  </Form.Group>

                  {/* CONFIRMAR */}

                  <Form.Group className="mb-4">
                    <Form.Label>Confirmar contraseña</Form.Label>

                    <InputGroup>
                      <InputGroup.Text className="input-icon-box">
                        <i className="bi bi-shield-lock-fill"></i>
                      </InputGroup.Text>

                      <Form.Control
                        type="password"
                        placeholder="********"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="custom-input"
                        required
                      />
                    </InputGroup>
                  </Form.Group>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="login-btn w-100 py-2 fw-bold rounded-1"
                  >
                    {loading ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                        />
                        Creando cuenta...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-person-plus-fill me-2"></i>
                        Crear Cuenta
                      </>
                    )}
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <p className="mb-0">
                    ¿Ya tienes una cuenta?{" "}
                    <Link
                      to="/login"
                      className="fw-bold text-decoration-none"
                      style={{ color: "#f59e0b" }}
                    >
                      Iniciar sesión
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;