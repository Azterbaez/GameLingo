import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

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


import { usePerfil } from "../context/PerfilContext";

const Perfil = () => {
  const { perfil, updatePerfil, loading } = usePerfil();

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(avatargiraffe);

  useEffect(() => {
    if (!perfil) return;

    setUsername(perfil.username || "");
    setBio(perfil.bio || "");
    setAvatar(perfil.avatar || avatargiraffe);
  }, [perfil]);

  const handleSave = async () => {
    const ok = await updatePerfil({
      username,
      bio,
      avatar,
    });

    if (ok) {
      alert("✔ Perfil actualizado correctamente");
    } else {
      alert("❌ Error al actualizar el perfil");
    }
  };

  if (loading) {
    return (
      <div className="perfil-page d-flex justify-content-center align-items-center min-vh-100">
        <h3 className="text-white">Cargando perfil...</h3>
      </div>
    );
  }

  return (
    <div className="perfil-page">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="p-4 perfil-card shadow-lg">
          <h2 className="text-center mb-3">Mi Perfil</h2>

          {/* Avatar principal */}
          <div className="text-center mb-3">
            <img
              src={avatar || avatargiraffe}
              className="avatar-preview"
              alt="avatar"
                style={{
    borderRadius: "50%",
    border: "4px solid #e4b313",
  }}
            />
          </div>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </Form.Group>

            <Form.Label>Selecciona tu avatar</Form.Label>

            <div className="avatar-selector">
              {[
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
              ].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`avatar-${i}`}
                  style={{
    borderRadius: "50%",
    border: "4px solid #e4b313",
   
  }}
                  className={`avatar-option ${
                    avatar === img ? "selected" : ""
                  }`}
                  onClick={() => setAvatar(img)}
                />
              ))}
            </div>

            <Button
              type="button"
              className="w-100 mt-3"
              onClick={handleSave}
            >
              Guardar cambios
            </Button>

            <div className="text-center mt-4">
              <Link
                to="/inicio"
                className="fw-bold text-decoration-none"
                style={{ color: "#f59e0b" }}
              >
                Regresar
              </Link>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default Perfil;