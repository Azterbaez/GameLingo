import { Outlet } from "react-router-dom";
import Encabezado from "../navegacion/Encabezado";
import SubheaderNiveles from "../navegacion/SubheaderNiveles";

const AppLayout = () => {
  return (
    <>
      <Encabezado />
      <SubheaderNiveles />
      <main style={{ paddingTop: "150px" }}>
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
