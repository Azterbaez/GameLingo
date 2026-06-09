import Encabezado from "../navegacion/Encabezado";
import AnimatedRoute from "../animations/AnimatedRoute";

const PaginaConEncabezado = ({ children }) => (
  <>
    <Encabezado />
    <AnimatedRoute>{children}</AnimatedRoute>
  </>
);

export default PaginaConEncabezado;
