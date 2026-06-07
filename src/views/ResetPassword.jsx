import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import { FaLock, FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { updatePassword, user } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirm, setMostrarConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Validar que llegó con token válido
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");

    if (type !== "recovery") {
      setError("Link de recuperación inválido o expirado");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);

    const result = await updatePassword(password);

    if (!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);

    // Redirigir después de 2 segundos
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  if (success) {
    return (
      <div className="reset-password-page min-vh-100 d-flex align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col lg={4} md={6}>
              <Card className="border-0 shadow-lg">
                <Card.Body className="p-5 text-center">
                  <div
                    className="mb-4"
                    style={{
                      fontSize: "48px",
                      color: "#10d981",
                    }}
                  >
                    <FaCheck />
                  </div>
                  <h2 className="fw-bold mb-3">¡Éxito!</h2>
                  <p className="text-muted mb-4">
                    Tu contraseña ha sido actualizada correctamente.
                  </p>
                  <p className="text-muted small">
                    Serás redirigido al login en unos momentos...
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="reset-password-page">
      <div className="blur blur-1"></div>
      <div className="blur blur-2"></div>
      <div className="blur blur-3"></div>

      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="shape shape-3"></div>
      <div className="shape shape-4"></div>

      <Container fluid className="min-vh-100 d-flex align-items-center">
        <Row className="w-100 justify-content-center">
          <Col lg={4} md={8}>
            <Card className="border-0 shadow-lg">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-azul-oscuro">Restablecer Contraseña</h2>
                  <p className="text-muted">Ingresa tu nueva contraseña</p>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  {/* NUEVA CONTRASEÑA */}
                  <Form.Group className="mb-4">
                    <Form.Label>Nueva Contraseña</Form.Label>

                    <InputGroup>
                      <InputGroup.Text>
                        <FaLock />
                      </InputGroup.Text>

                      <Form.Control
                        type={mostrarPassword ? "text" : "password"}
                        placeholder="Ingresa tu nueva contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        className="custom-input ui-input"
                      />

                      <Button
                        variant="outline-secondary"
                        onClick={() => setMostrarPassword(!mostrarPassword)}
                        disabled={loading}
                      >
                        {mostrarPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  {/* CONFIRMAR CONTRASEÑA */}
                  <Form.Group className="mb-4">
                    <Form.Label>Confirmar Contraseña</Form.Label>

                    <InputGroup>
                      <InputGroup.Text>
                        <FaLock />
                      </InputGroup.Text>

                      <Form.Control
                        type={mostrarConfirm ? "text" : "password"}
                        placeholder="Confirma tu nueva contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={loading}
                        className="custom-input ui-input"
                      />

                      <Button
                        variant="outline-secondary"
                        onClick={() => setMostrarConfirm(!mostrarConfirm)}
                        disabled={loading}
                      >
                        {mostrarConfirm ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  {/* BOTÓN RESTABLECER */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="ui-btn-primary w-100 py-3 fw-bold"
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Actualizando...
                      </>
                    ) : (
                      <>
                        <FaLock className="me-2" />
                        Restablecer Contraseña
                      </>
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResetPassword;
