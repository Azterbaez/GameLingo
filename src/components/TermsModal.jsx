import { Modal, Button } from "react-bootstrap";

const TermsModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Términos y condiciones</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Antes de usar GameLingo, es importante que conozcas las condiciones de acceso y registro.</p>
        <h6>1. Registro y acceso</h6>
        <p>
          Para crear una cuenta necesitas un correo electrónico válido, una contraseña de al menos 6 caracteres y un nombre de usuario.
          Al registrarte, aceptas que los datos provistos son correctos y que conservarás el acceso exclusivo a tu cuenta.
        </p>
        <h6>2. Uso de la cuenta</h6>
        <p>
          Tu cuenta es personal. No compartas tu contraseña ni permitas que otra persona ingrese con tus credenciales.
          El acceso al contenido y a tu progreso está ligado a tu usuario, por lo que es responsabilidad tuya proteger tu información.
        </p>
        <h6>3. Inicio de sesión</h6>
        <p>
          Al iniciar sesión aceptas que el sistema valide tu correo y contraseña. Si olvidas tu contraseña, utiliza el flujo de recuperación correspondiente.
          El acceso solo debe hacerse desde un dispositivo autorizado y seguro.
        </p>
        <h6>4. Privacidad y datos</h6>
        <p>
          Guardamos tu nombre de usuario, correo y progreso de aprendizaje para ofrecerte una experiencia personalizada.
          Estos datos no se compartirán con terceros sin tu consentimiento, excepto cuando lo exija la ley.
        </p>
        <h6>5. Responsabilidad y comportamiento</h6>
        <p>
          Debes usar la plataforma de forma responsable y respetar las normas de convivencia digital. El contenido generado en tu cuenta es tu responsabilidad.
        </p>
        <h6>6. Aceptación antes del registro</h6>
        <p>
          En la creación de una nueva cuenta, debes aceptar estos términos para poder registrarte. Si no los aceptas, no podrás completar el registro.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TermsModal;
