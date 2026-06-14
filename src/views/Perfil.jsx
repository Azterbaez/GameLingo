import { useState, useEffect } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NotificacionOperacion from "../components/NotificacionOperacione";
import PaginaMeta from "../components/meta/PaginaMeta";
import "./Perfil.css";

import avatargiraffe from "../assets/image/Avatargiraffe.png";
import avatarkoala from "../assets/image/Avatarkoala.png";
import avatarlion from "../assets/image/Avatarlion.png";
import avatarmonkey from "../assets/image/Avatarmonkey.png";
import avatarowl from "../assets/image/Avatarowl.png";
import avatarshield from "../assets/image/Avatarshield.png";
import avatarzorra from "../assets/image/avatarzorra.png";
import avatarF1 from "../assets/image/avatarF1.png";
import avatarF2 from "../assets/image/avatarF2.png";
import avatarF3 from "../assets/image/avatarF3.png";
import avatarF4 from "../assets/image/avatarF4.png";
import avatarF5 from "../assets/image/avatarF5.png";
import avatarM1 from "../assets/image/avatarM1.png";
import avatarM2 from "../assets/image/avatarM2.png";
import avatarM3 from "../assets/image/avatarM3.png";
import avatarM4 from "../assets/image/avatarM4.png";
import avatarM5 from "../assets/image/avatarM5.png";
import adolescente from "../assets/image/adolescente.png";
import agente1 from "../assets/image/agente1.png";
import agente2 from "../assets/image/agente2.png";
import agente3 from "../assets/image/agente3.png";
import agente4 from "../assets/image/agente4.png";
import agente5 from "../assets/image/agente5.png";
import agente6 from "../assets/image/agente6.png";
import agente7 from "../assets/image/agente7.png";
import estudiante from "../assets/image/estudiante.png";
import estudiante2 from "../assets/image/estudiante2.png";
import estudiante3 from "../assets/image/estudiante3.png";

import { usePerfil } from "../context/PerfilContext";

const AVATARES = [
  avatargiraffe,
  avatarkoala,
  avatarlion,
  avatarmonkey,
  avatarowl,
  avatarshield,
  avatarzorra,
  avatarF1,
  avatarF2,
  avatarF3,
  avatarF4,
  avatarF5,
  avatarM1,
  avatarM2,
  avatarM3,
  avatarM4,
  avatarM5,
  adolescente,
  agente1,
  agente2,
  agente3,
  agente4,
  agente5,
  agente6,
  agente7,
  estudiante,
  estudiante2,
  estudiante3,
];

const Perfil = () => {
  const { perfil, updatePerfil, loading } = usePerfil();

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(avatargiraffe);
  const [mostrarNoti, setMostrarNoti] = useState(false);
  const [notiMensaje, setNotiMensaje] = useState("");
  const [notiTipo, setNotiTipo] = useState("exito");

  useEffect(() => {
    if (!perfil) return;

    const timer = setTimeout(() => {
      setUsername(perfil.username || "");
      setBio(perfil.bio || "");
      setAvatar(perfil.avatar || avatargiraffe);
    });

    return () => clearTimeout(timer);
  }, [perfil]);

  const handleSave = async () => {
    const ok = await updatePerfil({
      username,
      bio,
      avatar,
    });

    if (ok) {
      setNotiMensaje("Perfil actualizado correctamente.");
      setNotiTipo("exito");
      setMostrarNoti(true);
    } else {
      setNotiMensaje("Error al actualizar el perfil. Inténtalo de nuevo.");
      setNotiTipo("error");
      setMostrarNoti(true);
    }
  };

  if (loading) {
    return (
      <div className="perfil-page d-flex justify-content-center align-items-center min-vh-100">
        <h3 className="perfil-loading">Cargando perfil...</h3>
      </div>
    );
  }

  return (
    <div className="perfil-page pagina-con-nav-movil">
      <PaginaMeta titulo="Mi perfil" />
      <Container className="d-flex justify-content-center align-items-center min-vh-100 py-5">
        <Card className="perfil-card shadow-lg border-0 content-reveal">
          <div className="perfil-hero">
            <div className="perfil-avatar-wrap">
              <img
                src={avatar || avatargiraffe}
                alt="Avatar seleccionado"
                className="perfil-avatar-principal"
              />
            </div>
            <div className="perfil-hero-copy">
              <span className="perfil-eyebrow">Cuenta de aprendizaje</span>
              <h2>Mi perfil</h2>
              <p>
                Personaliza tu perfil, elige un avatar y mantén tu cuenta lista para seguir aprendiendo.
              </p>
            </div>
          </div>

          <Form className="perfil-form">
            <Form.Group className="mb-3">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="ui-input"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Biografía</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Describe tus intereses o metas de aprendizaje"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="ui-input perfil-textarea"
              />
            </Form.Group>

            <div className="perfil-actions">
              <Button type="button" className="perfil-save-btn" onClick={handleSave}>
                Guardar cambios
              </Button>
              <Link to="/inicio" className="perfil-back-link">
                Volver al inicio
              </Link>
            </div>

            <div className="perfil-avatar-section">
              <div>
                <Form.Label className="perfil-section-label">
                  Selecciona tu avatar
                </Form.Label>
                <p className="perfil-section-help">
                  Elige el personaje que quieres mostrar en tu cuenta.
                </p>
              </div>

              <div className="avatar-selector-grid">
                {AVATARES.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`avatar-item-btn ${avatar === img ? "selected" : ""}`}
                    onClick={() => setAvatar(img)}
                    aria-label={`Seleccionar avatar ${i + 1}`}
                  >
                    <img src={img} alt="" className="avatar-item" />
                  </button>
                ))}
              </div>
            </div>
          </Form>
        </Card>
      </Container>

      <NotificacionOperacion
        mostrar={mostrarNoti}
        mensaje={notiMensaje}
        tipo={notiTipo}
        onCerrar={() => setMostrarNoti(false)}
      />
    </div>
  );
};

export default Perfil;
