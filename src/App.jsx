import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./views/Login";
import Register from "./views/Register";
import Inicio from "./views/Inicio";
import Perfil from "./views/Perfil";
import { PerfilProvider } from "./context/PerfilContext";
import RutaProtegida from "./components/rutas/RutasProtegida";
import { UserProvider } from "./context/UserContext";
import Encabezado from "./components/navegacion/Encabezado";



function Layout() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/perfil" element={<Perfil />} />

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
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <PerfilProvider>
          <Router>
            <Layout />
          </Router>
        </PerfilProvider>
      </UserProvider>
    </AuthProvider>
  );
}




export default App;