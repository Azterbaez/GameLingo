import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";
import { ProgresoProvider } from "./context/ProgresoContext";

import Login from "./views/Login";
import Register from "./views/Register";
import ResetPassword from "./views/ResetPassword";
import Informacion from "./views/Informacion";
import Inicio from "./views/Inicio";
import Perfil from "./views/Perfil";
import { PerfilProvider } from "./context/PerfilContext";
import RutaProtegida from "./components/rutas/RutasProtegida";
import { UserProvider } from "./context/UserContext";
import { LearningProvider } from "./context/LearningContext";
import AppLayout from "./components/layout/AppLayout";
import PaginaConEncabezado from "./components/layout/PaginaConEncabezado";
import AnimatedRoute from "./components/animations/AnimatedRoute";
import TemaDetalleView from "./views/aprendizaje/TemaDetalleView";
import EjercicioView from "./views/aprendizaje/EjercicioView";
import CursoView from "./views/CursoView";
import CursoNivelView from "./views/CursoNivelView";
import CursoSubnivelView from "./views/CursoSubnivelView";

function Layout() {
  return (
    <Routes>
      <Route path="/" element={<AnimatedRoute><Informacion /></AnimatedRoute>} />
      <Route path="/login" element={<AnimatedRoute><Login /></AnimatedRoute>} />
      <Route path="/register" element={<AnimatedRoute><Register /></AnimatedRoute>} />
      <Route path="/reset-password" element={<AnimatedRoute><ResetPassword /></AnimatedRoute>} />
      <Route path="/informacion" element={<AnimatedRoute><Informacion /></AnimatedRoute>} />

      <Route
        path="/perfil"
        element={
          <RutaProtegida>
            <PaginaConEncabezado>
              <Perfil />
            </PaginaConEncabezado>
          </RutaProtegida>
        }
      />

      <Route
        path="/inicio"
        element={
          <RutaProtegida>
            <PaginaConEncabezado>
              <Inicio />
            </PaginaConEncabezado>
          </RutaProtegida>
        }
      />

      <Route path="/aprender/*" element={<Navigate to="/curso" replace />} />
      <Route
        path="/curso"
        element={
          <RutaProtegida>
            <LearningProvider>
              <AppLayout />
            </LearningProvider>
          </RutaProtegida>
        }
      >
        <Route index element={<CursoView />} />
        <Route path=":levelId" element={<CursoNivelView />} />
        <Route path=":levelId/:subnivel" element={<CursoSubnivelView />} />
        <Route
          path=":levelId/:subnivel/temas/:topicId/actividades"
          element={<TemaDetalleView />}
        />
        <Route
          path=":levelId/:subnivel/temas/:topicId/jugar/:exerciseId"
          element={<EjercicioView />}
        />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ProgresoProvider>
          <UserProvider>
            <PerfilProvider>
              <Router>
                <Layout />
              </Router>
              <footer className="app-footer">© 2026 GameLingo</footer>
            </PerfilProvider>
          </UserProvider>
        </ProgresoProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
