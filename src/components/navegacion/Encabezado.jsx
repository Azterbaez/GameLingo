import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";

import logo from "../../assets/image/logo.png";
import avatargiraffe from "../../assets/image/Avatargiraffe.png";

import { usePerfil } from "../../context/PerfilContext";
import { supabase } from "../../assets/database/supabaseconfig";

const Encabezado = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 PERFIL GLOBAL (UN SOLO HOOK)
  const { perfil, setPerfil } = usePerfil();

  const manejarToggle = () => setMostrarMenu(!mostrarMenu);

  const manejarNavegacion = (ruta) => {
    navigate(ruta);
    setMostrarMenu(false);
  };

  // 🔥 LOGOUT LIMPIO
  const cerrarSesion = async () => {
    try {
      await supabase.auth.signOut();

      // 🔥 limpiar estado global del usuario
      setPerfil(null);

      localStorage.removeItem("usuario-supabase");

      navigate("/login");
    } catch (err) {
      console.error("Error cerrando sesión:", err.message);
    }
  };

  const esLogin = location.pathname === "/login";

  return (
    <Navbar
  expand="md"
  fixed="top"
  className="shadow-lg"
  style={{
    minHeight: "75px",
    background:
      "linear-gradient(9deg, #1e40af, rgb(245, 194, 98), #1e40af)",
  }}
>
      <Container>

        {/* LOGO + TITULO + PERFIL MINI RPG */}
        <Navbar.Brand
          onClick={() => manejarNavegacion("/inicio")}
          className="fw-bold d-flex align-items-center"
          style={{ cursor: "pointer" }}
        >
          <img
            src={logo}
            width="60"
            height="60"
            className="me-2"
              style={{
    borderRadius: "50%",
    border: "4px solid #e4b313",
   
  }}
          />

          <div className="me-3">
            <h4 className="mb-0" style={{ color: "#F59E0B" }}>
              GameLingo
            </h4>
            <small style={{ color: "#cbd5e1" }}>
              Learn English Playing
            </small>
          </div>

          {/* 🎮 PERFIL MINI */}
          <div className="perfil-mini d-flex align-items-center gap-2">

            <img
              src={perfil?.avatar || avatargiraffe}
              className="avatar-header"
              alt="avatar"
                style={{
                  width: "70px",
    height: "70px",
    borderRadius: "50%",
    border: "4px solid #e4b313",
   
  }}
            />

            <div className="user-info">
              <div style={{ color: "#fff", fontWeight: "600" }}>
                {perfil?.username || "Jugador"}
              </div>

              <small style={{ color: "#e5e7eb" }}>
                Nivel {perfil?.level ?? 1}
              </small>
            </div>

          </div>
        </Navbar.Brand>

        {/* TOGGLE */}
        {!esLogin && (
          <Navbar.Toggle onClick={manejarToggle} />
        )}

        {/* OFFCANVAS MENU */}
        <Navbar.Offcanvas
          placement="end"
          show={mostrarMenu}
          onHide={() => setMostrarMenu(false)}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>GameLingo</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="ms-auto">

              <Nav.Link onClick={() => manejarNavegacion("/inicio")}>
                Inicio
              </Nav.Link>

              <Nav.Link onClick={() => manejarNavegacion("/perfil")}>
                Perfil
              </Nav.Link>

              <hr />
              
{/* SOLO MOVIL */}
<div className="d-block d-md-none">

  <hr />

  <h6 className="fw-bold text-primary">
    Ruta de aprendizaje
  </h6>

  <Nav.Link onClick={() => manejarNavegacion("/learn")}>
    📚 Niveles
  </Nav.Link>

  <Nav.Link onClick={() => manejarNavegacion(`/learn/${levelId}/temas`)}>
    📖 Temas
  </Nav.Link>

  <Nav.Link
    onClick={() =>
      manejarNavegacion(`/learn/${levelId}/${topicId}/actividades`)
    }
  >
    🎮 Actividades
  </Nav.Link>

</div>
              <Nav.Link
                onClick={cerrarSesion}
                style={{ color: "#ef4444", fontWeight: "600" }}
              >
                Cerrar sesión
              </Nav.Link>

              {/* INFO EXTRA */}
              {mostrarMenu && (
                <div className="mt-3 p-3 rounded">
                  <p className="mb-1">
                    {perfil?.username || "Usuario"}
                  </p>

                  <small>
                    Nivel {perfil?.level ?? 1}
                  </small>
                </div>
                
                
              )}

            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>

      </Container>
    </Navbar>
  );
};

export default Encabezado;