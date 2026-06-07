import { useState } from "react";
import { Modal, Form, Button, Alert, Spinner } from "react-bootstrap";
import { FaEnvelope } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const ForgotPasswordModal = ({ show, onHide }) => {
  const { resetPasswordForEmail } = useAuth();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!email) {
      setError("Por favor ingresa tu correo electrónico");
      return;
    }

    setLoading(true);

    const result = await resetPasswordForEmail(email);

    if (!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setEmail("");
    setLoading(false);

    // Cerrar modal después de 2 segundos
    setTimeout(() => {
      onHide();
      setSuccess(false);
    }, 2000);
  };

  const handleClose = () => {
    setError("");
    setSuccess(false);
    setEmail("");
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Recuperar Contraseña</Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        {error && <Alert variant="danger">{error}</Alert>}

        {success && (
          <Alert variant="success">
            ✓ Se ha enviado un correo con instrucciones de recuperación. Revisa tu bandeja de entrada.
          </Alert>
        )}

        {!success && (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="correo@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <Form.Text className="text-muted">
                Ingresa el correo asociado a tu cuenta y te enviaremos un link para restablecer tu contraseña.
              </Form.Text>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button
                variant="secondary"
                onClick={handleClose}
                disabled={loading}
                className="flex-grow-1"
              >
                Cancelar
              </Button>

              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                className="flex-grow-1"
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <FaEnvelope className="me-2" />
                    Enviar
                  </>
                )}
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPasswordModal;
