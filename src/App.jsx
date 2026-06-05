import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";
import PaginaMeta from "./components/meta/PaginaMeta";

import Login from "./views/Login";
import Register from "./views/Register";
import Informacion from "./views/Informacion";
import Inicio from "./views/Inicio";
import Perfil from "./views/Perfil";
import { PerfilProvider } from "./context/PerfilContext";
import RutaProtegida from "./components/rutas/RutasProtegida";
import { UserProvider } from "./context/UserContext";
import Encabezado from "./components/navegacion/Encabezado";
import { LearningProvider } from "./context/LearningContext";
import AppLayout from "./components/layout/AppLayout";
import AprenderView from "./views/AprenderView";
import NivelesView from "./views/aprendizaje/NivelesView";
import TemasView from "./views/aprendizaje/TemasView";
import TemaDetalleView from "./views/aprendizaje/TemaDetalleView";
import EjercicioView from "./views/aprendizaje/EjercicioView";



function Layout() {
  return (
    <Routes>
      <Route path="/" element={<Informacion />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/informacion" element={<Informacion />} />

      <Route
        path="/perfil"
        element={
          <RutaProtegida>
            <>
              <Encabezado />
              <Perfil />
            </>
          </RutaProtegida>
        }
      />

      <Route
        path="/inicio"
        element={
          <RutaProtegida>
            <>
              <Encabezado />
              <Inicio />
            
            </>
          </RutaProtegida>
        }
      />

      <Route
        path="/aprender"
        element={
          <RutaProtegida>
            <LearningProvider>
              <AppLayout />
            </LearningProvider>
          </RutaProtegida>
        }
      >
        <Route element={<AprenderView />}>
          <Route index element={<NivelesView />} />
          <Route path="niveles" element={<NivelesView />} />
          <Route path="niveles/:levelId/temas" element={<TemasView />} />
          <Route
            path="niveles/:levelId/temas/:topicId/actividades"
            element={<TemaDetalleView />}
          />
          <Route
            path="niveles/:levelId/temas/:topicId/jugar/:exerciseId"
            element={<EjercicioView />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <UserProvider>
          <PerfilProvider>
            <Router>
              <Layout />
            </Router>
          </PerfilProvider>
        </UserProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}




export default App;