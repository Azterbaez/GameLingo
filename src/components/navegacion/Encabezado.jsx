import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";

import logo from "../../assets/image/logo.png";
import avatargiraffe from "../../assets/image/Avatargiraffe.png";

import { usePerfil } from "../../context/PerfilContext";
import { supabase } from "../../assets/database/supabaseconfig";
import NotificacionOperacion from "../NotificacionOperacione";
import NombreMovil from "./NombreMovil";
import BarraNavegacionMovil from "./BarraNavegacionMovil";

const Encabezado = ({ modoAprendizaje = false }) => {
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
      setMostrarMenu(false);
      await supabase.auth.signOut();

      // 🔥 limpiar estado global del usuario
      setPerfil(null);

      localStorage.removeItem("usuario-supabase");
      // show notification then navigate to informacion
      setMostrarNoti(true);
      setNotiMensaje("Sesión cerrada correctamente.");
      setNotiTipo("advertencia");

      setTimeout(() => {
        navigate("/informacion", { replace: true });
      }, 900);
    } catch (err) {
      console.error("Error cerrando sesión:", err.message);
    }
  };

  const [mostrarNoti, setMostrarNoti] = useState(false);
  const [notiMensaje, setNotiMensaje] = useState("");
  const [notiTipo, setNotiTipo] = useState("exito");

  const esLogin = location.pathname === "/login";

  return (
    <>
    <Navbar
      expand="md"
      fixed="top"
      className={`shadow-sm encabezado-principal ${modoAprendizaje ? "navbar--aprendizaje" : ""}`}
    >
      <Container>

        {modoAprendizaje ? (
          <>
            <Navbar.Brand
              onClick={() => manejarNavegacion("/inicio")}
              className="navbar-brand-compact fw-bold d-flex align-items-center"
            >
              <img src={logo} alt="GameLingo" className="navbar-brand-compact__logo" />
              <span className="navbar-brand-compact__title">GameLingo</span>
            </Navbar.Brand>
            <NombreMovil className="ms-auto me-1 navbar-aprendizaje-perfil--inline" />
            <div className="navbar-aprendizaje-perfil d-none d-md-flex align-items-center gap-2 ms-auto me-2">
              <img
                src={perfil?.avatar || avatargiraffe}
                alt=""
                className="navbar-aprendizaje-perfil__avatar"
              />
              <span className="navbar-aprendizaje-perfil__name">
                {perfil?.username || "Jugador"}
              </span>
            </div>
          </>
        ) : (
          <Navbar.Brand
            onClick={() => manejarNavegacion("/inicio")}
            className="fw-bold d-flex align-items-center navbar-brand-full"
          >
            <img src={logo} width="56" height="56" className="me-2 navbar-brand-full__logo" alt="" />
            <div className="me-2">
              <h4 className="mb-0 text-naranja">GameLingo</h4>
              <small className="text-white-50">Learn English Playing</small>
            </div>
            <div className="perfil-mini d-flex align-items-center gap-2">
              <img
                src={perfil?.avatar || avatargiraffe}
                className="avatar-header"
                alt="avatar"
                width="44"
                height="44"
              />
              <div className="user-info d-none d-md-block">
                <div className="username">{perfil?.username || "Jugador"}</div>
                <small className="level">Nivel {perfil?.level ?? 1}</small>
              </div>
            </div>
          </Navbar.Brand>
        )}

        {/* TOGGLE */}
        {!esLogin && (
          <Navbar.Toggle
            onClick={manejarToggle}
            className={modoAprendizaje ? "navbar-toggler--compact" : ""}
          />
        )}

        {/* OFFCANVAS MENU */}
        <Navbar.Offcanvas
          placement="end"
          show={mostrarMenu}
          onHide={() => setMostrarMenu(false)}
          className="menu-lateral"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>GameLingo</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="ms-auto">

              <Nav.Link onClick={() => manejarNavegacion("/inicio")}>
                Inicio
              </Nav.Link>

              <Nav.Link onClick={() => manejarNavegacion("/aprender/niveles")}>
                Aprender
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

  <Nav.Link onClick={() => manejarNavegacion("/aprender/niveles")}>
    Niveles
  </Nav.Link>

  <Nav.Link onClick={() => manejarNavegacion("/aprender")}>
    Aprender inglés
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
    {!esLogin && <BarraNavegacionMovil />}

    <NotificacionOperacion
      mostrar={mostrarNoti}
      mensaje={notiMensaje}
      tipo={notiTipo}
      onCerrar={() => setMostrarNoti(false)}
    />
    </>
  );
};

export default Encabezado;